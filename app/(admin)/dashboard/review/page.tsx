import { Suspense } from "react";
import Reviews from "./Reviews";

export default function Page() {
  return (
    <Suspense>
      <Reviews />
    </Suspense>
  );
}
