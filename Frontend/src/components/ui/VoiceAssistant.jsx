import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Send,
  MessageCircle,
  Brain,
  Heart,
  Baby,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Settings,
  Sparkles,
  Zap,
  Lightbulb,
  BookOpen,
  MapPin,
  Dumbbell
} from 'lucide-react';

const VoiceAssistant = () => {
  const { user } = useAuth();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceType, setVoiceType] = useState('female');
  const [speed, setSpeed] = useState(1);
  
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);

  // Mock Gemini AI responses for demonstration
  const mockGeminiResponses = {
    "how far along am i": "Based on your profile, you're currently 24 weeks pregnant. You're in your second trimester, which is often called the 'honeymoon phase' of pregnancy. Your baby is about the size of a cantaloupe and weighs around 1.3 pounds.",
    "what should i eat": "For a healthy pregnancy, focus on: 1) Lean proteins like chicken, fish, and legumes, 2) Whole grains for energy, 3) Plenty of fruits and vegetables, 4) Dairy for calcium, 5) Healthy fats from nuts and avocados. Avoid raw fish, unpasteurized dairy, and limit caffeine.",
    "exercise tips": "Safe exercises for your stage include: 1) Walking - 30 minutes daily, 2) Prenatal yoga - gentle stretching and breathing, 3) Swimming - low impact cardio, 4) Pelvic floor exercises. Avoid high-impact activities, contact sports, and exercises that involve lying on your back after 16 weeks.",
    "symptoms to watch": "Contact your doctor immediately if you experience: 1) Severe abdominal pain, 2) Heavy bleeding, 3) Severe headaches with vision changes, 4) Sudden swelling in hands/face, 5) Decreased fetal movement. These could indicate serious complications.",
    "labor signs": "Early labor signs include: 1) Regular contractions that get stronger and closer together, 2) Lower back pain, 3) Water breaking, 4) Bloody show, 5) Nesting instinct. Call your doctor when contractions are 5 minutes apart for an hour.",
    "default": "I'm here to help with your pregnancy journey! You can ask me about nutrition, exercise, symptoms, appointments, or any pregnancy-related questions. How can I assist you today?"
  };

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setTranscript(transcript);
        handleVoiceCommand(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleVoiceCommand = async (command) => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find matching response
    let response = mockGeminiResponses.default;
    for (const [key, value] of Object.entries(mockGeminiResponses)) {
      if (command.includes(key)) {
        response = value;
        break;
      }
    }

    setAiResponse(response);
    setConversation(prev => [...prev, 
      { type: 'user', content: command, timestamp: new Date() },
      { type: 'ai', content: response, timestamp: new Date() }
    ]);

    // Speak the response
    if (!isMuted) {
      speakText(response);
    }

    setIsLoading(false);
  };

  const speakText = (text) => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel(); // Stop any current speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speed;
      utterance.pitch = voiceType === 'female' ? 1.2 : 0.8;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      synthesisRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const quickCommands = [
    { command: "How far along am I?", icon: Calendar },
    { command: "What should I eat?", icon: Heart },
    { command: "Exercise tips", icon: Dumbbell },
    { command: "Symptoms to watch", icon: AlertCircle },
    { command: "Labor signs", icon: Baby },
    { command: "Appointment reminder", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Mic className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Voice Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hands-free pregnancy guidance powered by AI. Just speak naturally and get instant answers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Voice Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              {/* Voice Control Center */}
              <div className="text-center mb-8">
                <motion.div
                  animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
                  className="relative inline-block"
                >
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 ${
                      isListening 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg animate-pulse' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    }`}
                  >
                    {isListening ? <MicOff /> : <Mic />}
                  </button>
                  
                  {/* Animated waves when listening */}
                  {isListening && (
                    <div className="absolute inset-0 -m-4">
                      <div className="w-40 h-40 border-4 border-purple-300 rounded-full animate-ping opacity-75"></div>
                      <div className="absolute inset-0 w-40 h-40 border-4 border-pink-300 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  )}
                </motion.div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {isListening ? 'Listening...' : 'Tap to speak'}
                  </h3>
                  <p className="text-gray-600">
                    {isListening ? 'Speak your question now' : 'Ask about nutrition, exercise, symptoms, or anything pregnancy-related'}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                      isMuted 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    {isMuted ? 'Unmute' : 'Mute'}
                  </button>
                  
                  <button
                    onClick={() => synthesisRef.current?.cancel()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <Pause className="w-4 h-4" />
                    Stop
                  </button>
                </div>
              </div>

              {/* Current Transcript */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-purple-50 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">You said:</span>
                  </div>
                  <p className="text-gray-900">{transcript}</p>
                </motion.div>
              )}

              {/* AI Response */}
              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">AI Assistant:</span>
                  </div>
                  <p className="text-gray-900">{aiResponse}</p>
                </motion.div>
              )}

              {/* Loading State */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <span className="text-gray-600">Processing your question...</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Commands */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Commands</h3>
              <div className="space-y-3">
                {quickCommands.map((cmd, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setTranscript(cmd.command);
                      handleVoiceCommand(cmd.command.toLowerCase());
                    }}
                    className="flex items-center gap-3 w-full p-3 text-left rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <cmd.icon className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-700">{cmd.command}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Voice Type</label>
                  <select
                    value={voiceType}
                    onChange={(e) => setVoiceType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Speech Speed</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Slow</span>
                    <span>Normal</span>
                    <span>Fast</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation History */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Conversations</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {conversation.slice(-6).map((msg, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      {msg.type === 'user' ? (
                        <User className="w-3 h-3 text-purple-600" />
                      ) : (
                        <Brain className="w-3 h-3 text-purple-600" />
                      )}
                      <span className="text-xs text-gray-500">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {msg.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Instant Responses</h3>
                <p className="text-sm text-white/80">Get immediate answers to your pregnancy questions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Natural Speech</h3>
                <p className="text-sm text-white/80">Speak naturally and get human-like responses</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-sm text-white/80">Advanced AI understands context and provides personalized advice</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceAssistant; 