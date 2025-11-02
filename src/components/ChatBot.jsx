import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import { endemicSpeciesByRegion } from '../data/biodiversityData';
import OpenAI from 'openai';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '🤖 Hello! I\'m your AI-powered Japan Biodiversity assistant!\n\nI can help you with:\n📊 Percentage calculations\n🔍 Regional comparisons\n🏆 Species rankings\n📈 Statistical analysis\n🌿 General biodiversity questions\n\nAsk me anything!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechSynthesisRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('🎤 Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Text-to-Speech functionality
  const speakText = (text, messageIndex) => {
    // Stop any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if (speakingMessageIndex === messageIndex) {
        setSpeakingMessageIndex(null);
        return;
      }
    }

    // Clean the text (remove emojis and special formatting)
    const cleanText = text
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Remove emojis
      .replace(/\n\n/g, '. ')
      .replace(/\n/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Configure voice settings
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';

    // Try to use a natural-sounding voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice =>
      voice.name.includes('Samantha') ||
      voice.name.includes('Google') ||
      voice.name.includes('Female') ||
      voice.lang.startsWith('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setSpeakingMessageIndex(messageIndex);
    };

    utterance.onend = () => {
      setSpeakingMessageIndex(null);
    };

    utterance.onerror = () => {
      setSpeakingMessageIndex(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Load voices when available
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Load voices
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    // Cleanup: stop speech when component unmounts
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Prepare biodiversity data context for AI
  const prepareBiodiversityContext = () => {
    let context = "Japan Biodiversity Data:\n\n";

    // Regional endemic species data
    context += "Endemic Species by Region:\n";
    endemicSpeciesByRegion.forEach(region => {
      context += `${region.region}: Mammals=${region.mammals}, Birds=${region.birds}, Reptiles=${region.reptiles}, Amphibians=${region.amphibians}\n`;
    });

    // Calculate totals
    const totals = {
      mammals: endemicSpeciesByRegion.reduce((sum, r) => sum + r.mammals, 0),
      birds: endemicSpeciesByRegion.reduce((sum, r) => sum + r.birds, 0),
      reptiles: endemicSpeciesByRegion.reduce((sum, r) => sum + r.reptiles, 0),
      amphibians: endemicSpeciesByRegion.reduce((sum, r) => sum + r.amphibians, 0)
    };

    context += `\nTotal across Japan: Mammals=${totals.mammals}, Birds=${totals.birds}, Reptiles=${totals.reptiles}, Amphibians=${totals.amphibians}\n`;

    // Additional facts
    context += `\nKey Facts:
- Total documented species in Japan: 6,852
- Endemic species (unique to Japan): 456
- National Parks: 34
- Major biodiversity hotspots: 8 (including Shiretoko, Yakushima, Ogasawara, Okinawa Yanbaru)
- Threatened species: 343 total (37 mammals, 52 birds, 28 reptiles, 19 amphibians, 64 fish, 143 plants)
- Notable species: Japanese Macaque, Red-crowned Crane (Endangered), Iriomote Cat (Critically Endangered), Japanese Giant Salamander (Near Threatened)
- Conservation funding has increased from ¥45M (2010) to ¥98M (2024)
- Forest coverage: 67% of Japan's land area
- Climate zones: Subarctic (Hokkaido) to Subtropical (Okinawa)
`;

    return context;
  };

  // Call Hugging Face Inference Providers API (New Nov 2025)
  const callAIAPI = async (userQuestion) => {
    const context = prepareBiodiversityContext();

    try {
      console.log('🤖 Calling Hugging Face AI API...');

      // Initialize OpenAI client with Hugging Face endpoint
      const client = new OpenAI({
        baseURL: "https://router.huggingface.co/v1",
        apiKey: import.meta.env.VITE_HUGGINGFACE_API_KEY || "",
        dangerouslyAllowBrowser: true // Allow browser usage
      });

      const chatCompletion = await client.chat.completions.create({
        model: "openai/gpt-oss-120b:groq",
        messages: [
          {
            role: "system",
            content: `You are an expert biodiversity data analyst and ecologist. Your role is to:

1. ANALYZE the data deeply and identify patterns, trends, and relationships
2. DRAW CONCLUSIONS based on the evidence in the data
3. PROVIDE INSIGHTS that go beyond just stating numbers
4. EXPLAIN the ecological or conservation significance of findings
5. COMPARE regions, species, and metrics to reveal meaningful patterns
6. SUGGEST what the data implies about biodiversity health and conservation priorities

${context}

When answering:
- Always start with the specific data/calculation requested
- Then add "This suggests/indicates/reveals..." with your analytical conclusion
- Make connections between different data points
- Explain what patterns mean for conservation
- Use comparative language (higher/lower, better/worse, critical/stable)
- Be specific with numbers AND their implications

Example good response:
"Kanto has 11 amphibians out of 83 total (13.25%). This is relatively low compared to Okinawa (18 species, 21.7%). This suggests Kanto's urban development may have reduced amphibian habitats, making wetland conservation critical in this region."

Be insightful, analytical, and draw meaningful ecological conclusions!`
          },
          {
            role: "user",
            content: userQuestion
          }
        ],
        temperature: 0.8,
        max_tokens: 350
      });

      console.log('✅ AI Response received!');

      // Get response content or reasoning
      const responseText = chatCompletion.choices[0].message.content ||
                          chatCompletion.choices[0].message.reasoning ||
                          "I couldn't generate a response.";

      return '✨ AI Response:\n\n' + responseText.trim();

    } catch (error) {
      console.error('🚨 AI API Error:', error.message);
      console.log('🔄 Switching to local calculations...');

      // Fallback to local calculation if API fails
      return getFallbackResponse(userQuestion);
    }
  };

  // Fallback response system (when API is unavailable or rate-limited)
  const getFallbackResponse = (question) => {
    const lowerQ = question.toLowerCase();

    // Percentage calculations
    if (lowerQ.includes('percentage') || lowerQ.includes('percent') || lowerQ.includes('%')) {
      const region = extractRegion(question);
      const category = extractCategory(question);

      if (region && category) {
        const regionData = endemicSpeciesByRegion.find(r => r.region.toLowerCase() === region);
        if (regionData) {
          const total = endemicSpeciesByRegion.reduce((sum, r) => sum + r[category], 0);
          const percentage = ((regionData[category] / total) * 100).toFixed(2);
          return `🔢 Based on the data: ${regionData.region} has ${regionData[category]} ${category} out of ${total} total ${category} in Japan, which is ${percentage}%. \n\n(Note: AI API temporarily unavailable, using local calculations)`;
        }
      }
    }

    // Comparison questions
    if (lowerQ.includes('compare') || lowerQ.includes('vs') || lowerQ.includes('versus')) {
      const category = extractCategory(question);
      if (category) {
        const regions = endemicSpeciesByRegion.slice(0, 3);
        let response = `📊 Here's a comparison of ${category}:\n\n`;
        regions.forEach(r => {
          response += `${r.region}: ${r[category]} ${category}\n`;
        });
        response += '\n(Note: AI API temporarily unavailable, showing sample data)';
        return response;
      }
    }

    // Which region questions
    if (lowerQ.includes('which region') || lowerQ.includes('most') || lowerQ.includes('highest')) {
      const category = extractCategory(question);
      if (category) {
        const sorted = [...endemicSpeciesByRegion].sort((a, b) => b[category] - a[category]);
        return `🏆 ${sorted[0].region} has the most ${category} with ${sorted[0][category]} species!\n\nTop 3:\n1. ${sorted[0].region}: ${sorted[0][category]}\n2. ${sorted[1].region}: ${sorted[1][category]}\n3. ${sorted[2].region}: ${sorted[2][category]}\n\n(Note: AI API temporarily unavailable, using local data)`;
      }
    }

    // Default general info
    return `🤖 I'm having trouble connecting to the AI service right now, but I can still help with:\n\n• Percentage calculations (e.g., "What percentage of mammals in Kanto?")\n• Regional comparisons (e.g., "Compare birds in Hokkaido vs Kyushu")\n• Rankings (e.g., "Which region has most amphibians?")\n\nJapan has 6,852 documented species across 34 National Parks, with 456 endemic species unique to Japan. Ask me anything specific!`;
  };

  const extractRegion = (question) => {
    const lowerQ = question.toLowerCase();
    const regions = ['hokkaido', 'tohoku', 'kanto', 'chubu', 'kansai', 'chugoku', 'shikoku', 'kyushu', 'okinawa'];
    return regions.find(region => lowerQ.includes(region));
  };

  const extractCategory = (question) => {
    const lowerQ = question.toLowerCase();
    if (lowerQ.includes('mammal')) return 'mammals';
    if (lowerQ.includes('bird')) return 'birds';
    if (lowerQ.includes('reptile')) return 'reptiles';
    if (lowerQ.includes('amphibian')) return 'amphibians';
    return null;
  };

  const quickQuestions = [
    'What does the amphibian distribution tell us about regional conservation?',
    'Which regions need the most urgent conservation attention and why?',
    'What patterns do you see in biodiversity across climate zones?',
    'How does conservation funding correlate with biodiversity outcomes?',
    'What conclusions can we draw from comparing Okinawa and Hokkaido?'
  ];

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Try AI API first
      const aiResponse = await callAIAPI(currentInput);

      const botResponse = {
        type: 'bot',
        text: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting response:', error);
      const fallbackResponse = {
        type: 'bot',
        text: getFallbackResponse(currentInput),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        className={`chat-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-content">
              <span className="chat-icon">🤖</span>
              <div>
                <h3>AI Bio Assistant</h3>
                <span className="chat-status">🔴 Online - AI Powered</span>
              </div>
            </div>
            <button
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type}`}
              >
                {message.type === 'bot' && (
                  <div className="message-avatar">🤖</div>
                )}
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-footer">
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    {message.type === 'bot' && (
                      <button
                        className={`speak-button ${speakingMessageIndex === index ? 'speaking' : ''}`}
                        onClick={() => speakText(message.text, index)}
                        title={speakingMessageIndex === index ? 'Stop speaking' : 'Listen to this message'}
                      >
                        {speakingMessageIndex === index ? '🔇' : '🔊'}
                      </button>
                    )}
                  </div>
                </div>
                {message.type === 'user' && (
                  <div className="message-avatar user">👤</div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="quick-questions">
              <p className="quick-title">✨ Try asking me:</p>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-question-btn"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input-container">
            <button
              className={`voice-button ${isListening ? 'listening' : ''}`}
              onClick={toggleVoiceInput}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? '🔴' : '🎤'}
            </button>
            <input
              type="text"
              className="chat-input"
              placeholder={isListening ? 'Listening...' : 'Ask me anything about biodiversity...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="send-button"
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
