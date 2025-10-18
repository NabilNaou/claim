import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";

export const metadata: Metadata = {
  title: "ClaimFlow",
  description: "Claim wizard demo",
  openGraph: {
    title: "ClaimFlow, snelle claim wizard",
    description: "Schadeafhandeling demo",
    type: "website",
    locale: "nl_NL",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <a href="#main" className="skip">
          Ga naar hoofdinhoud
        </a>
        <Header />
        <main id="main" className="container stack">
          {children}
        </main>
      </body>
    </html>
  );
}
