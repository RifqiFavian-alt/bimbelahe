import { scheduleCronJob } from "@/lib/cron";

if (process.env.NODE_ENV === "production") {
  scheduleCronJob(); // Aktifkan cron job hanya di production
}

export default function Home() {
  return <div></div>;
}
