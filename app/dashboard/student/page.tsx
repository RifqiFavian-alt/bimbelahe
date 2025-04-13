import { Suspense } from "react";
import Students from "./Students";

export default function Page() {
  return (
    <Suspense>
      <Students />
    </Suspense>
  );
}
