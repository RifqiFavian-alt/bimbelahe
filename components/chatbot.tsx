"use client";
import { useForwardRef } from "@/hooks/use-forward-ref";
import { api } from "@/lib/api";
import axios from "axios";
import { useEffect, useState, forwardRef, ForwardedRef } from "react";
import { IoClose, IoSparkles } from "react-icons/io5";
import { RiDeleteBin6Fill, RiSendPlane2Fill } from "react-icons/ri";
import ReactMarkdown from "react-markdown";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
function cleanBoxedText(input: string): string {
  return input.replace(/^\\boxed\{\s*/, "").replace(/\s*\}$/, "");
}

const Chatbot = forwardRef(function Chatbot(_props, refDialog: ForwardedRef<HTMLDialogElement>) {
  const dialogElement = useForwardRef<HTMLDialogElement>(refDialog);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Halo! Ada yang bisa saya bantu?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ahe-chat-history");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) {
        setMessages(parsed);
      }
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
      if (axios.isAxiosError(error)) setError(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem("ahe-chat-history");
  };

  return (
    <dialog ref={dialogElement}>
      <div className="chat-container w-full z-100 sm:w-1/2 h-[600px] sm:right-5 sm:bottom-20 sm:fixed lg:w-4/12 bg-[#F4F1FA] rounded-md py-6 px-10 gap-y-6 flex flex-col">
        <IoClose onClick={() => dialogElement?.current?.close()} className="absolute top-5 cursor-pointer right-5 text-xl bg-[#B2A0DA] bg-opacity-40 rounded-full p-1 text-[#433878]" />
        <div className="header flex flex-col items-center gap-y-1">
          <span className="text-[#433878] font-bold text-2xl flex justify-center items-center gap-x-2">
            <svg width="25" height="31" viewBox="0 0 25 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.3692 18.5833C21.8247 18.5833 22.2758 18.673 22.6967 18.8473C23.1175 19.0216 23.4999 19.2771 23.822 19.5992C24.1441 19.9213 24.3996 20.3037 24.5739 20.7246C24.7483 21.1454 24.838 21.5965 24.838 22.052V23.4472C24.838 24.2803 24.6579 25.1035 24.3101 25.8606C23.9623 26.6176 23.4551 27.2905 22.823 27.8333C20.4088 29.9053 16.9554 30.9181 12.5 30.9181C8.0446 30.9181 4.59435 29.9053 2.18473 27.8348C1.55344 27.2919 1.04685 26.6191 0.69962 25.8624C0.352387 25.1057 0.172701 24.2829 0.172852 23.4503V22.052C0.172852 21.132 0.538308 20.2497 1.18882 19.5992C1.83934 18.9487 2.72163 18.5833 3.6416 18.5833H21.3692Z"
                fill="url(#paint0_radial_328_52)"
              />
              <path
                d="M21.3692 18.5833C21.8247 18.5833 22.2758 18.673 22.6967 18.8473C23.1175 19.0216 23.4999 19.2771 23.822 19.5992C24.1441 19.9213 24.3996 20.3037 24.5739 20.7246C24.7483 21.1454 24.838 21.5965 24.838 22.052V23.4472C24.838 24.2803 24.6579 25.1035 24.3101 25.8606C23.9623 26.6176 23.4551 27.2905 22.823 27.8333C20.4088 29.9053 16.9554 30.9181 12.5 30.9181C8.0446 30.9181 4.59435 29.9053 2.18473 27.8348C1.55344 27.2919 1.04685 26.6191 0.69962 25.8624C0.352387 25.1057 0.172701 24.2829 0.172852 23.4503V22.052C0.172852 21.132 0.538308 20.2497 1.18882 19.5992C1.83934 18.9487 2.72163 18.5833 3.6416 18.5833H21.3692Z"
                fill="url(#paint1_linear_328_52)"
              />
              <path
                d="M12.5 0.854126L12.3428 0.864918C12.066 0.902917 11.8123 1.03987 11.6286 1.25044C11.445 1.46102 11.3438 1.73097 11.3438 2.01038L11.333 4.70829H13.6455L13.6563 2.01038L13.6455 1.85313C13.6075 1.57631 13.4706 1.32263 13.26 1.13898C13.0494 0.955325 12.7795 0.854138 12.5 0.854126Z"
                fill="url(#paint2_linear_328_52)"
              />
              <path
                d="M21.75 6.63538C21.75 5.71541 21.3845 4.83312 20.734 4.1826C20.0835 3.53208 19.2012 3.16663 18.2812 3.16663H6.71875C5.79878 3.16663 4.91649 3.53208 4.26597 4.1826C3.61546 4.83312 3.25 5.71541 3.25 6.63538V12.0312C3.25 12.9512 3.61546 13.8335 4.26597 14.484C4.91649 15.1345 5.79878 15.5 6.71875 15.5H18.2812C19.2012 15.5 20.0835 15.1345 20.734 14.484C21.3845 13.8335 21.75 12.9512 21.75 12.0312V6.63538Z"
                fill="url(#paint3_radial_328_52)"
              />
              <path
                d="M15.9562 7.02079C15.6986 7.0135 15.4422 7.05794 15.2022 7.15147C14.9621 7.245 14.7432 7.38572 14.5584 7.56531C14.3737 7.74491 14.2268 7.95973 14.1266 8.19707C14.0263 8.43441 13.9746 8.68945 13.9746 8.9471C13.9746 9.20476 14.0263 9.4598 14.1266 9.69714C14.2268 9.93448 14.3737 10.1493 14.5584 10.3289C14.7432 10.5085 14.9621 10.6492 15.2022 10.7427C15.4422 10.8363 15.6986 10.8807 15.9562 10.8734C16.4576 10.8592 16.9338 10.6501 17.2835 10.2903C17.6332 9.93064 17.8288 9.44876 17.8288 8.9471C17.8288 8.44545 17.6332 7.96356 17.2835 7.60386C16.9338 7.24415 16.4576 7.03498 15.9562 7.02079Z"
                fill="url(#paint4_linear_328_52)"
              />
              <path
                d="M9.03139 7.02079C8.77384 7.0135 8.51744 7.05794 8.27736 7.15147C8.03728 7.245 7.81839 7.38572 7.63364 7.56531C7.44889 7.74491 7.30204 7.95973 7.20175 8.19707C7.10147 8.43441 7.0498 8.68945 7.0498 8.9471C7.0498 9.20476 7.10147 9.4598 7.20175 9.69714C7.30204 9.93448 7.44889 10.1493 7.63364 10.3289C7.81839 10.5085 8.03728 10.6492 8.27736 10.7427C8.51744 10.8363 8.77384 10.8807 9.03139 10.8734C9.53284 10.8592 10.009 10.6501 10.3587 10.2903C10.7083 9.93064 10.904 9.44876 10.904 8.9471C10.904 8.44545 10.7083 7.96356 10.3587 7.60386C10.009 7.24415 9.53284 7.03498 9.03139 7.02079Z"
                fill="url(#paint5_linear_328_52)"
              />
              <defs>
                <radialGradient id="paint0_radial_328_52" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-5.52052 14.7877) rotate(30.4076) scale(34.3062 54.6444)">
                  <stop stopColor="#F08AF4" />
                  <stop offset="0.535" stopColor="#9C6CFE" />
                  <stop offset="1" stopColor="#4E44DB" />
                </radialGradient>
                <linearGradient id="paint1_linear_328_52" x1="12.5046" y1="17.114" x2="18.0855" y2="37.9666" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#885EDB" stopOpacity="0" />
                  <stop offset="1" stopColor="#E362F8" />
                </linearGradient>
                <linearGradient id="paint2_linear_328_52" x1="11.2806" y1="0.0832926" x2="14.017" y2="2.96775" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8B52F4" />
                  <stop offset="1" stopColor="#3D35B1" />
                </linearGradient>
                <radialGradient id="paint3_radial_328_52" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-3.225 -2.11975) rotate(37.6946) scale(30.8321 58.2451)">
                  <stop stopColor="#F08AF4" />
                  <stop offset="0.535" stopColor="#9C6CFE" />
                  <stop offset="1" stopColor="#4E44DB" />
                </radialGradient>
                <linearGradient id="paint4_linear_328_52" x1="14.9433" y1="7.16879" x2="17.8632" y2="12.2085" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDFDFD" />
                  <stop offset="1" stopColor="#F9DCFA" />
                </linearGradient>
                <linearGradient id="paint5_linear_328_52" x1="8.01697" y1="7.16879" x2="10.9369" y2="12.2085" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDFDFD" />
                  <stop offset="1" stopColor="#F9DCFA" />
                </linearGradient>
              </defs>
            </svg>
            AHE Bot
          </span>
          <span className="text-sm text-[#433878]">Ada pertanyaan? tanyakan saja!</span>
        </div>

        <div className="messages overflow-auto flex flex-col flex-auto px-2 py-5 gap-y-7 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#433878] [&::-webkit-scrollbar-thumb]:rounded-full">
          {messages.map((msg, i) =>
            msg.role === "user" ? (
              <div key={i} className={`message-${msg.role} w-5/6 self-end justify-self-end flex flex-col gap-y-1`}>
                <div className="bg-[#E6E0F3] text-sm text-[#433878] rounded-3xl px-6 py-4">{msg.content}</div>
                <span className="text-end text-sm text-[#B2A0DA]">User</span>
              </div>
            ) : (
              <div key={i} className={`message-${msg.role}`}>
                <div className="w-5/6 text-sm bg-[#e6e0f3] text-[#433878] rounded-3xl px-6 py-4">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <span className="text-end text-sm text-[#B2A0DA]">Assistant</span>
              </div>
            )
          )}
          {isLoading && <div className="message assistant text-sm text-[#B2A0DA]">Memproses...</div>}
        </div>
        <span className="text-sm text-[#E94343] text-center w-full">{error}</span>
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
              disabled={isLoading}
            />
          </div>
          <button type="submit" disabled={isLoading} className="chatbot__send-button">
            <RiSendPlane2Fill className="text-[#433878] text-2xl" />
          </button>
        </form>
      </div>
    </dialog>
  );
});

export { Chatbot };
