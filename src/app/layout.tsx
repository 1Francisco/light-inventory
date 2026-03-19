import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventario Ligero",
  description: "Micro-SaaS para gestión de inventario rápida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans bg-slate-50 text-slate-800 pb-24">
        <main className="max-w-md mx-auto bg-slate-50 min-h-screen relative shadow-sm">
          {children}
        </main>
      </body>
    </html>
  );
}
