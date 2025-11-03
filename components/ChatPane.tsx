"use client";

import React, { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  fromMe?: boolean;
  text: string;
  createdAt?: string;
};

export default function ChatPane({ partnerName }: { partnerName: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  // Initialize with welcome message on client only
  useEffect(() => {
    setMessages([
      {
        id: "1",
        fromMe: false,
        text: `Hi — thanks for connecting. Would you be able to accept referrals for adults aged 18+?`,
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [messages]);

  function send() {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        fromMe: true,
        text: text.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setText("");
  }

  return (
    <div className="chat-root">
      <div className="chat-header">Conversation with {partnerName}</div>
      <div className="chat-body" ref={listRef}>
        {messages.map((m) => (
          <div key={m.id} className={`bubble ${m.fromMe ? "me" : "them"}`}>
            <div className="text">{m.text}</div>
            <div className="ts">
              {new Date(m.createdAt || "").toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a message..."
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
