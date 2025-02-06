import cron from "node-cron";

const CRON_API_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/cron/generate-payments";

export function scheduleCronJob() {
  cron.schedule("0 0 1 1 *", async () => {
    console.log("Running cron job: Generating payments for the new year...");

    try {
      const response = await fetch(CRON_API_URL, { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        console.log("Cron job succeeded:", data.message);
      } else {
        console.error("Cron job failed:", data.message);
      }
    } catch (error) {
      console.error("Error running cron job:", error);
    }
  });
}
