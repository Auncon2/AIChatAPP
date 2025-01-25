"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

type Message = {
  text: string;
  isUser: boolean;
};
const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");

      // Simulate a bot reply
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Hello! How can I assist you?", isUser: false },
        ]);
      }, 1000);
    }
  };
  return (
    <div className="w-[800px] mx-auto bg-gray-100 shadow-lg rounded-lg p-4">
      {/* Chat Messages */}
      <div className="h-[calc(100vh-30vh)] overflow-y-auto mb-4 border-b border-gray-300">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg break-words ${
              msg.isUser
                ? "bg-gradient-to-r from-[#018c98] via-[#01abbb] to-[#01d1e4] text-white self-end ml-12"
                : "bg-gray-300 text-gray-800 self-start mr-12"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <Textarea
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default Chat;
