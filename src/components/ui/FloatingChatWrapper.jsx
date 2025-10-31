import React from "react";
import ContextProvider from "../MediBuddy/Main/context/context";
import FloatingChat from "./FloatingChat";
import { FloatingChatProvider } from "./FloatingChatContext";

const FloatingChatWrapper = () => {
  return (
    <FloatingChatProvider>
      <ContextProvider>
        <FloatingChat />
      </ContextProvider>
    </FloatingChatProvider>
  );
};

export default FloatingChatWrapper;
