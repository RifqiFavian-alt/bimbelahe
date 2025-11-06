"use client";

import { useForwardRef } from "@/hooks/use-forward-ref";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { IoClose, IoSparkles } from "react-icons/io5";
import { RiDeleteBin6Fill, RiSendPlane2Fill } from "react-icons/ri";
import ReactMarkdown from "react-markdown";

export const Chatbot = forwardRef(function Chatbot(_props, refDialog: ForwardedRef<HTMLDialogElement>) {
  const dialogElement = useForwardRef<HTMLDialogElement>(refDialog);

  // === 🔹 Streaming Chat Hook ===
  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const [input, setInput] = useState("");

  // === 🔹 Load History dari LocalStorage ===
  useEffect(() => {
    const stored = localStorage.getItem("ahe-chat-history");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      } catch (err) {
        console.error("Gagal parse history:", err);
      }
    }
  }, [setMessages]);

  // === 🔹 Simpan Riwayat ke LocalStorage ===
  useEffect(() => {
    localStorage.setItem("ahe-chat-history", JSON.stringify(messages));
  }, [messages]);

  // === 🔹 Hapus Riwayat ===
  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem("ahe-chat-history");
  };

  // === 🔹 Submit Pesan ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status !== "ready") return;

    const message = input;
    setInput("");

    try {
      await sendMessage({ text: message });
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  return (
    <dialog ref={dialogElement}>
      <div className="chat-container w-full z-100 sm:w-1/2 h-[600px] sm:right-5 sm:bottom-20 sm:fixed lg:w-4/12 bg-[#F4F1FA] rounded-md py-6 px-10 gap-y-6 flex flex-col">
        <IoClose onClick={() => dialogElement?.current?.close()} className="absolute top-5 cursor-pointer right-5 text-xl bg-[#B2A0DA] bg-opacity-40 rounded-full p-1 text-[#433878]" />

        {/* === Header === */}
        <div className="header flex flex-col items-center gap-y-1">
          <span className="text-[#433878] font-bold text-2xl flex justify-center items-center gap-x-2">
            <span className="text-[#433878] font-bold text-2xl flex justify-center items-center gap-x-2">AHE Bot</span>
          </span>
          <span className="text-sm text-[#433878]">Ada pertanyaan? tanyakan saja!</span>
        </div>

        {/* === Chat Messages === */}
        <div className="messages overflow-auto flex flex-col flex-auto px-2 py-5 gap-y-7 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#433878] [&::-webkit-scrollbar-thumb]:rounded-full">
          {messages.map((msg) => {
            const text = msg.parts.map((part) => (part.type === "text" ? part.text : "")).join(" ");

            return msg.role === "user" ? (
              <div key={msg.id} className="message-user w-5/6 self-end flex flex-col gap-y-1">
                <div className="bg-[#E6E0F3] text-sm text-[#433878] rounded-3xl px-6 py-4">{text}</div>
                <span className="text-end text-sm text-[#B2A0DA]">User</span>
              </div>
            ) : (
              <div key={msg.id} className="message-assistant">
                <div className="w-5/6 text-sm bg-[#e6e0f3] text-[#433878] rounded-3xl px-6 py-4">
                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>
                <span className="text-end text-sm text-[#B2A0DA]">Assistant</span>
              </div>
            );
          })}
          {status === "submitted" && <div className="message assistant text-sm text-[#B2A0DA]">Mengetik...</div>}
        </div>

        {/* === Input === */}
        <form className="flex items-center gap-x-6 justify-between" onSubmit={handleSubmit}>
          <button type="button" onClick={clearHistory} title="Hapus Riwayat">
            <RiDeleteBin6Fill className="text-[#433878] text-xl hover:text-[#E94343]" />
          </button>

          <div className="flex-auto h-10 rounded-xl bg-[#E6E0F3] flex items-center px-4 gap-x-3">
            <IoSparkles className="text-[#433878]" />
            <input
              className="chatbot__input bg-transparent outline-none text-sm text-[#433878] placeholder:text-[#847CA9] placeholder:text-sm w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan sesuatu tentang AHE..."
              disabled={status === "submitted"}
            />
          </div>

          <button type="submit" disabled={status === "submitted"}>
            <RiSendPlane2Fill className="text-[#433878] text-2xl" />
          </button>
        </form>
      </div>
    </dialog>
  );
});
