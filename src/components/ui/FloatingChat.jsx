import { Mic, Minimize2, Send, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import medilogo from "../../assests/MediBuddy.jpg";
import { Context } from "../../components/MediBuddy/Main/context/context";
import { useFloatingChat } from "./FloatingChatContext";

const FloatingChat = () => {
  const {
    isOpen,
    isMinimized,
    toggleChat,
    minimizeChat,
    expandChat,
    shouldClearState,
    setShouldClearState,
    closeChat,
  } = useFloatingChat();
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    newChat,
  } = useContext(Context);

  // Clear chat state when chat is closed
  useEffect(() => {
    if (shouldClearState) {
      newChat(); // Clear the MediBuddy chat state
      setShouldClearState(false); // Reset the flag
    }
  }, [shouldClearState, newChat, setShouldClearState]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSent();
    }
  };

  const handleToggleChat = () => {
    toggleChat();
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Notification dots */}
          {hasNewMessage && (
            <>
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </>
          )}

          {/* Main floating button */}
          <button
            onClick={handleToggleChat}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 overflow-hidden"
          >
            <img
              src={medilogo}
              alt="MediBuddy"
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ${
            isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
          }`}
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={medilogo}
                  alt="MediBuddy"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs text-blue-100">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!isMinimized && (
                  <button
                    onClick={minimizeChat}
                    className="text-white hover:text-blue-200 transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={closeChat}
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  {!showResult ? (
                    <div className="space-y-4">
                      {/* Welcome message */}
                      <div className="flex items-start space-x-3">
                        <img
                          src={medilogo}
                          alt="MediBuddy"
                          className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                        />
                        <div className="bg-gray-100 rounded-lg p-3 shadow-sm max-w-xs">
                          <p className="text-sm text-gray-700">
                            👋 Hi! I'm an AI-powered assistant who can help you
                            with ideas, advice and questions.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* User message */}
                      <div className="flex justify-end">
                        <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                          <p className="text-sm">{recentPrompt}</p>
                        </div>
                      </div>

                      {/* AI response */}
                      <div className="flex items-start space-x-3">
                        <img
                          src={medilogo}
                          alt="MediBuddy"
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <div className="bg-gray-100 rounded-lg p-3 shadow-sm max-w-xs">
                          {loading ? (
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          ) : (
                            <p
                              className="text-sm text-gray-700"
                              dangerouslySetInnerHTML={{ __html: resultData }}
                            ></p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="How can I help?"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={() => onSent()}
                      disabled={!input}
                      className="w-8 h-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-lg flex items-center justify-center text-white transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 bg-gray-600 hover:bg-gray-700 rounded-lg flex items-center justify-center text-white transition-colors">
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Minimized state */}
            {isMinimized && (
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={medilogo}
                    alt="MediBuddy"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    AI Assistant
                  </span>
                </div>
                <button
                  onClick={expandChat}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
