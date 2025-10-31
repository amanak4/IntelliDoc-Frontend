import React, { createContext, useContext, useState } from "react";

const FloatingChatContext = createContext();

export const useFloatingChat = () => {
  const context = useContext(FloatingChatContext);
  if (!context) {
    throw new Error(
      "useFloatingChat must be used within a FloatingChatProvider"
    );
  }
  return context;
};

export const FloatingChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [shouldClearState, setShouldClearState] = useState(false);

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setShouldClearState(false);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setShouldClearState(true); // Flag to clear state when chat is closed
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const expandChat = () => {
    setIsMinimized(false);
  };

  const toggleChat = () => {
    if (isOpen) {
      closeChat(); // Use closeChat to trigger state clearing
    } else {
      openChat();
    }
  };

  return (
    <FloatingChatContext.Provider
      value={{
        isOpen,
        isMinimized,
        shouldClearState,
        openChat,
        closeChat,
        minimizeChat,
        expandChat,
        toggleChat,
        setShouldClearState,
      }}
    >
      {children}
    </FloatingChatContext.Provider>
  );
};
