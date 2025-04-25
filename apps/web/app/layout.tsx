import type { Metadata } from "next";
import "./globals.css";
import { Barlow } from "next/font/google";

const roboto = Barlow({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Gerenciador de tarefas",
  description: "Gerencie suas tarefas de forma intuitiva e rápida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
