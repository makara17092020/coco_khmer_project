import "./globals.css";
import type { ReactNode } from "react";

import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";

export const metadata = {
  title: "Coco Khmer",
  description: "Your website description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
