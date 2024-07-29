'use client'

import { Button, Input } from "antd";
import { useState } from "react";

interface Message {
    content: string,
    role: string

  }

export default function CareerConsult() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  

  const sendMessage = async () => {
    // Add user message to the chat
    const msg = [...messages, { content: input, role: "user" }];
    setMessages(msg);
    setInput("");

    // Call OpenAI API to get the bot's response
    const response = await getOpenAIResponse(msg);
    setMessages([
      ...msg,
      { content: response, role: "assistant" },
    ]);
  };
  const getOpenAIResponse = async (userInput: any) => {
    // Make API request to OpenAI
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: userInput }),
    });

    const data = await response.json();
    console.log(data, 'data')
    return data.output;
  };

  return (
    <div
      id="chat-container"
      className="overflow-y-auto p-10 rounded-md max-w-3xl mx-auto"
    >
      <div>
        {messages.map((message: any, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.role === "assistant" ? "text-blue-600" : "text-green-600"
            }`}
          >
            <span className="font-bold">{`${message.role}: `}</span>
            {message.role === "assistant" && <span>{message.content}</span>}
            {message.role !== "assistant" && message.content}
          </div>
        ))}
      </div>
      <div className="pt-5 flex items-center">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
}