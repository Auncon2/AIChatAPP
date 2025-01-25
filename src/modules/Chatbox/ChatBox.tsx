"use client";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import Navbar from "../Navbar/Navbar";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type Message = {
  text: string;
  isUser: boolean;
};

const ChatBox = () => {
  const session = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  console.log("session chatbox", session);
  const handleSend = async () => {
    if (input.trim() !== "") {
      const userMessage: Message = { text: input, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            // model: "gpt-3.5-turbo",
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              ...messages.map((msg) => ({
                role: msg.isUser ? "user" : "assistant",
                content: msg.text,
              })),
              { role: "user", content: input },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
          }
        );

        const AIReply: Message = {
          text: response.data.choices[0].message.content,
          isUser: false,
        };

        setMessages((prev) => [...prev, AIReply]);
        setIsError(false);
      } catch (error: any) {
        console.error("Error response:", error);
        setIsError(true);
        setMessages((prev) => [
          ...prev,
          { text: error?.response?.data?.error?.message, isUser: false },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center p-4 ">
        <div className="max-w-full md:max-w-[750px] mt-11 mb-48 ">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex items-end ${
                msg.isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!msg.isUser && (
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 break-words ${
                  msg.isUser
                    ? "ml-36 bg-gradient-to-r from-[#018c98] via-[#01abbb] to-[#01d1e4] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                    : isError
                    ? "mr-36 bg-red-200 text-red-700 border border-red-600 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
                    : "mr-36 bg-gray-300 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
                } whitespace-pre-wrap w-fit max-w-[300px] md:max-w-[600px]`}
              >
                <p>{msg.text}</p>
              </div>
              {msg.isUser && (
                <Avatar className="w-6 h-6 ml-2">
                  <AvatarImage
                    src={`${session?.data && session?.data?.user?.image}`}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <Image
              src="/piclumen-marquee-04.webp"
              alt="typing"
              width={10}
              height={10}
              className="rounded-full cursor-pointer"
            />
          )}
          <div className="fixed bottom-0 left-0 w-full bg-white text-center p-4">
            <div className="relative flex items-center max-w-full md:max-w-[750px] mx-auto">
              <Textarea
                placeholder="Type your message..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                rows={1}
                className="pr-[50px] overflow-hidden flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading}
                className="absolute bg-[#01abbb] right-2 bottom-2 h-[32px] w-[32px] p-0 text-sm"
              >
                {isLoading ? (
                  <Image
                    src="/loading.gif"
                    alt="loading"
                    width={20}
                    height={20}
                    className="rounded-full cursor-pointer"
                  />
                ) : (
                  <IoSend />
                )}
              </Button>
            </div>
            <span className="text-xs text-gray-600 mt-2">
              AIChatBox can make mistakes. Check important info.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
