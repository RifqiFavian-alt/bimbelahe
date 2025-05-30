import React from "react";
import { Navbar } from "@/components/client-navbar";
import { Footer } from "@/components/footer";

function ClientLayout({ children }: { children: React.ReactNode }) {
  console.log("client layout");
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default ClientLayout;
