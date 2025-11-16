import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import ClientDashboardLayout from "./client-layout";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  let role: string | null = null;

  if (token) {
    const decoded = jwt.decode(token) as { role?: string } | null;
    role = decoded?.role ?? null;
  }

  return <ClientDashboardLayout role={role}>{children}</ClientDashboardLayout>;
}
