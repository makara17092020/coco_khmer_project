import "./globals.css";
import type { ReactNode } from "react";
import ClientLayout from "./components/ClientLayout"; // 👈 NEW component you'll create

export const metadata = {
  title: "Coco Khmer",
  description: "Your website description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
