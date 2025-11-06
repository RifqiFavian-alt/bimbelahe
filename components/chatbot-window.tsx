"use client";

import { useForwardRef } from "@/hooks/use-forward-ref";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ForwardedRef, forwardRef, useState } from "react";

export const Chatbot = forwardRef(function Chatbot(_props, refDialog: ForwardedRef<HTMLDialogElement>) {
  const dialogElement = useForwardRef<HTMLDialogElement>(refDialog);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  console.log(messages);
  const [input, setInput] = useState("");

  return (
    <dialog ref={dialogElement} className="bg-white border-black border-2 p-5">
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, index) => (part.type === "text" ? <span key={index}>{part.text}</span> : null))}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput("");
          }
        }}
      >
        <input value={input} onChange={(e) => setInput(e.target.value)} disabled={status !== "ready"} placeholder="Say something..." />
        <button type="submit" disabled={status !== "ready"}>
          Submit
        </button>
      </form>
    </dialog>
  );
});
