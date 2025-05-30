import { scheduleCronJob } from "@/lib/cron";
import { Home } from "./Home";
import { Suspense } from "react";
if (process.env.NODE_ENV === "production") {
  scheduleCronJob();
}

export default function Page() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
