import { Suspense } from "react";
import Payments from "./Payments";

export default function Page() {
  return (
    <Suspense>
      <Payments />
    </Suspense>
  );
}
