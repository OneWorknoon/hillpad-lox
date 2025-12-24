import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import aiImage from '../../assets/images/hillpadai.jpeg';
const HillpadAIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the chatbot is open and the click is outside the chatbot
      if (
        isOpen && 
        chatbotRef.current && 
        !chatbotRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Add click event listener to the document
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-20 left-[80%] sm:left-[94%] sm:right-6 z-50">
      {/* Chatbot Trigger Button */}
      {!isOpen && (
        <button 
          onClick={toggleChatbot}
          className="bg-green text-white p-5 rounded-full shadow-lg hover:bg-orange transition-colors duration-300 flex items-center justify-center"
          aria-label="Open AI Chatbot"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chatbot Popup */}
      {isOpen && (
        <div 
          ref={chatbotRef}
          className="bg-white rounded-xl left-[-80%] sm:left-[-400%] relative shadow-2xl border border-orange w-80 h-[500px] flex flex-col"
        >
          {/* Popup Header */}
          <div className="bg-orange text-white p-4 rounded-t-xl flex justify-between items-center">
            <h2 className="text-lg font-semibold">Hillpad AI Assistant</h2>
            <button 
              onClick={toggleChatbot}
              className="hover:bg-orange rounded-full p-1"
              aria-label="Close AI Chatbot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Popup Content */}
          <div className="flex-grow flex items-center justify-center p-4 text-center">
            <div>
              <img 
                src={aiImage}
                alt="Coming Soon" 
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold text-orange mb-2">
                AI Chatbot Coming Soon!
              </h3>
              <p className="text-grey">
                We're working on an exciting AI assistant to help you find the perfect online courses.
              </p>
            </div>
          </div>

          {/* Popup Footer */}
          <div className="bg-black p-4 rounded-b-xl text-center">
            <p className="text-sm text-white">
              Stay tuned for more updates from Hillpad
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HillpadAIChatbot;