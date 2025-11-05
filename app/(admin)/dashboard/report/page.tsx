import { Suspense } from "react";
import Reports from "./Reports";

export default function Page() {
  return (
    <Suspense>
      <Reports />
    </Suspense>
  );
}
