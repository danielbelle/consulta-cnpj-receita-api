import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import DarkMode from "@/components/dark-mode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Consula CNPJ - Receita Federal",
  keywords: [
    "CNPJ",
    "Consulta CNPJ",
    "Receita Federal",
    "Pesquisa CNPJ",
    "CNPJ Brasil",
    "CNPJ Online",
    "Verificação CNPJ",
    "CNPJ Fácil",
    "CNPJ Rápido",
  ],
  description:
    "Consulte o CNPJ de forma rápida e fácil com nosso pesquisador. Insira o CNPJ desejado e obtenha informações diretamente da Receita Federal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <DarkMode />
        </ThemeProvider>
      </body>
    </html>
  );
}
