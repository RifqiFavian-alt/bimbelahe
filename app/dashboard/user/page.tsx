import { Suspense } from "react";
import Users from "./Users";

export default function Page() {
  return (
    <Suspense>
      <Users />
    </Suspense>
  );
}
