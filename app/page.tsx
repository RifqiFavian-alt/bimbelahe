import { scheduleCronJob } from "@/lib/cron";
import { Chatbot } from "@/components/chatbot";

if (process.env.NODE_ENV === "production") {
  scheduleCronJob(); // Aktifkan cron job hanya di production
}

export default function Home() {
  return (
    <>
      <Chatbot />
    </>
  );
}
