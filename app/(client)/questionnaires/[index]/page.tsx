"use client";
import { useEffect, useState } from "react";
import { ProgressBar } from "@/components/progress-bar";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import axios from "axios";

type Question = {
  topic: string;
  question: string;
};

type User = {
  name: string;
  email: string;
};

const questions = [
  {
    topic: "Kualitas pembelajaran materi",
    question: "Bagaimana pendapat kamu tentang kualitas materi yang disampaikan selama bimbingan?",
  },
  {
    topic: "Kualitas pengajar",
    question: "Seberapa puas kamu dengan cara pengajar menyampaikan materi?",
  },
  {
    topic: "Fasilitas yang diberikan",
    question: "Bagaimana kamu menilai fasilitas dan kenyamanan belajar di AHE?",
  },
  {
    topic: "Jadwal dan durasi bimbingan",
    question: "Apakah jadwal dan durasi bimbingan sudah sesuai dengan kebutuhan kamu?",
  },
  {
    topic: "Ceritakan pengalamanmu belajar di AHE",
    question: "Tuliskan kesan, kritik, atau saranmu di sini yang dapat membantu kami meningkatkan layanan kami ya!",
  },
];

const answerOptions = ["Sangat Baik", "Baik", "Cukup", "Kurang", "Sangat Kurang"];
const activeClassname = "after:content-[''] after:w-[5px] after:h-8 after:bg-[#433678] after:absolute after:top-1 after:left-1 relative";

const RadioAnswer = ({ value, selected, onChange }: { value: string; selected: boolean; onChange: (val: string) => void }) => (
  <label className={`flex justify-between items-center text-sm h-11 border-2 px-4 ps-8 py-2 rounded-md border-[#B2A0DA] cursor-pointer transition-all text-[#433878] ${selected && activeClassname}`}>
    <input type="radio" name="answer" value={value} onChange={() => onChange(value)} checked={selected} className="sr-only" />
    {value}
    <div className="w-5 h-5 border-2 rounded-full border-[#B2A0DA] flex items-center justify-center">
      <div className={`${selected ? "w-3 h-3 bg-[#433878] rounded-full" : "hidden"}`}></div>
    </div>
  </label>
);

function Questions() {
  const { index } = useParams<{ index: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [user, setUser] = useState<User>();
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const currentIndex = index ? parseInt(index) - 1 : 0;
  const currentQuestion: Question = questions[currentIndex];

  const handlePrevButton = () => {
    if (currentIndex > 0) {
      router.push(`/questionnaires/${currentIndex}?name=${user?.name}&email=${user?.email}`);
    }
  };

  const handleNextButton = async () => {
    if (!selectedAnswer) {
      setWarning("Silahkan pilih jawaban terlebih dahulu");
      return;
    }

    const stored = sessionStorage.getItem("answers");
    const prevAnswers: string[] = stored ? JSON.parse(stored) : [];

    prevAnswers[currentIndex] = selectedAnswer;
    sessionStorage.setItem("answers", JSON.stringify(prevAnswers));

    if (currentIndex < questions.length - 1) {
      router.push(`/questionnaires/${currentIndex + 2}?name=${user?.name}&email=${user?.email}`);
    } else {
      try {
        const { data } = await api.post("/api/questionnaires/create", {
          name: user?.name,
          email: user?.email,
          question1: prevAnswers[0],
          question2: prevAnswers[1],
          question3: prevAnswers[2],
          question4: prevAnswers[3],
          review: prevAnswers[4],
        });
        if (!data.success) throw new Error(data.message);
        router.push("/questionnaires/finish");
      } catch (error) {
        if (axios.isAxiosError(error)) console.error(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
      }
    }
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const name = searchParams.get("name");
      const email = searchParams.get("email");

      if (!name || !email) {
        router.push("/questionnaires");
      } else {
        const newUser = { name, email };
        setUser(newUser);
        sessionStorage.setItem("user", JSON.stringify(newUser));
      }
    }

    const storedAnswers = sessionStorage.getItem("answers");
    const parsedAnswers: string[] = storedAnswers ? JSON.parse(storedAnswers) : [];
    setSelectedAnswer(parsedAnswers[currentIndex] || "");

    setWarning("");
  }, [currentIndex, searchParams, router]);

  return (
    <div className="questionnaires__container w-full h-full px-5 md:px-20 lg:px-24 pt-20 pb-40">
      <div className="flex justify-between items-end flex-wrap md:flex-nowrap gap-y-3">
        <div>
          <h1 className="text-3xl font-bold text-[#433878]">Kuesioner</h1>
          <p className="text-base text-[#433878]">Tingkatkan layanan kami dengan pendapat anda!</p>
        </div>
        <div className="w-full sm:w-4/12 lg:w-3/12 flex flex-col gap-y-1">
          <span className="text-sm text-[#433878]">Session {`${currentIndex + 1}/${questions.length}`}</span>
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>
      </div>

      <div className="mt-10 flex flex-col w-full lg:w-6/12 mx-auto py-16 border-b-2 border-[#B2A0DA]">
        <span className="text-base text-[#7E60BF]">PERTANYAAN {currentIndex + 1}</span>
        <h2 className="text-base font-bold text-[#433878]">{currentQuestion.topic}</h2>
        <p className="text-base text-[#433878]">{currentQuestion.question}</p>
      </div>

      <div className="flex flex-col w-full lg:w-6/12 mx-auto py-5 gap-y-3">
        {currentIndex === questions.length - 1 ? (
          <input
            className="w-full focus:outline-none text-sm bg-[#F4F1FA] px-4 py-2 rounded-md"
            type="text"
            placeholder="Ketik jawaban Anda disini"
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
        ) : (
          answerOptions.map((option) => <RadioAnswer key={option} value={option} selected={selectedAnswer === option} onChange={setSelectedAnswer} />)
        )}
      </div>

      <div className="questionnaires__navigation  w-full lg:w-6/12 mx-auto flex justify-center gap-x-16 pt-16">
        <button onClick={handlePrevButton} className="questionnaires__navigation__prev flex items-center gap-x-2 border-2 border-[#B2A0DA] ps-2 pe-8 py-1 rounded-3xl">
          <div className="w-9 h-9 rounded-full bg-[#7E60BF] flex items-center justify-center">
            <IoArrowBack className="text-xl text-white" />
          </div>
          <span className="text-[#433878]">Sebelumnya</span>
        </button>
        <button onClick={handleNextButton} className="questionnaires__navigation__next flex flex-row-reverse items-center gap-x-2 border-2 border-[#B2A0DA] ps-8 pe-2 py-1 rounded-3xl">
          <div className="w-9 h-9 rounded-full bg-[#7E60BF] flex items-center justify-center">
            <IoArrowBack className="text-xl text-white rotate-180" />
          </div>
          <span className="text-[#433878]">{currentIndex === questions.length - 1 ? "Selesai" : "Selanjutnya"}</span>
        </button>
      </div>
      <span className="text-sm text-red-500 text-center">{warning}</span>
    </div>
  );
}

export default Questions;
