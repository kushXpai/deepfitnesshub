// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Deep Fitness Hub",
  description: "Find the perfect trainer for your fitness journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}