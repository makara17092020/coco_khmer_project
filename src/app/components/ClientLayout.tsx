"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Pages where you want to hide Navbar and Footer
  const hiddenPaths = ["/login", "/register"];
  const shouldHideLayout =
    hiddenPaths.includes(pathname) || pathname.startsWith("/admin/login");

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!shouldHideLayout && <Footer />}
    </div>
  );
}
