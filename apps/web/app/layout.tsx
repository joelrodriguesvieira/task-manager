import type { Metadata } from "next";
import "./globals.css";

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
