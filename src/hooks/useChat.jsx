import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { openAiService } from "../services";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [session, setSession] = useState(null);
  const sendMessageMutation = useMutation({
    mutationFn: (message) => openAiService.sendChatMessage(message, session),
    onMutate: async (data) => {
      const userMessage = {
        id: Date.now().toString(),
        content: data,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
    },
    onSuccess: (response) => {
      // Add bot response
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    },
    onError: () => {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "عذراً، واجهت خطأ. يرجى المحاولة مرة أخرى.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    },
  });
  const Start = useMutation({
    mutationFn: () => openAiService.startSession(),
    onSuccess: (response) => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response.startUpMessage.replace("التعليمة", "التعليمية"),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      setSession(response.sessionId);
    },
  });
  const Delete = useMutation({
    mutationFn: () => openAiService.deleteSession(session),
    onSuccess: () => setSession(null),
  });
  const sendMessage = (prompt) => {
    if (prompt.trim()) {
      sendMessageMutation.mutate(prompt);
    }
  };

  const clearMessages = async () => {
    setMessages([]);
    await Delete.mutateAsync();
    await Start.mutateAsync();
  };

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages,
    isLoading:
      sendMessageMutation.isPending || Start.isPending || Delete.isPending,
    Delete,
    Start,
  };
};
export default useChat;
