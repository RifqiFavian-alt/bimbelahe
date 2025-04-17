"use client";
import { api } from "@/lib/api";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
function cleanBoxedText(input: string): string {
  return input.replace(/^\\boxed\{\s*/, "").replace(/\s*\}$/, "");
}
function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ahe-chat-history");
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ahe-chat-history", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: input }];

    setMessages(newMessages);
    setInput("");

    try {
      const { data } = await api.post("/api/chat", { messages: newMessages });
      const cleanedMessage = cleanBoxedText(data?.choices[0].message.content || "");
      setMessages([...newMessages, { role: "assistant", content: cleanedMessage }]);
    } catch (error) {
      if (axios.isAxiosError(error)) console.error(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem("ahe-chat-history");
  };

  return (
    <div className="chat-container">
      <div className="header">
        <h2>AHE Chat</h2>
        <button onClick={clearHistory} className="clear-btn">
          Hapus Riwayat
        </button>
      </div>

      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message`}>
            <strong>{msg.role === "user" ? "Anda: " : "AHE: "}</strong>
            {msg.role === "assistant" ? <ReactMarkdown>{msg.content}</ReactMarkdown> : msg.content}
          </div>
        ))}
        {isLoading && <div className="message assistant">Memproses...</div>}
      </div>

      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tanyakan sesuatu tentang AHE..." disabled={isLoading} />
        <button type="submit" disabled={isLoading}>
          Kirim
        </button>
      </form>
    </div>
  );
}

export { Chatbot };
