import "./globals.css";

export const metadata = {
  title: "ClaimFlow",
  description: "Claimwizard built using Next/React - demo & practice.",
  keywords: ["claimflow", "next.js", "typescript", "frontend", "react"],
  authors: [{ name: "Nabil Naou", url: "https://github.com/nabilnaou" }],

  // Favicon. TODO: Find alternative to generated favicon.io
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/android-chrome-192x192.png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",

  // General social media cards (slack, discord etc)
  openGraph: {
    title: "ClaimFlow — ClaimWizard",
    description: "ClaimFlow Demo & Practice.",
    siteName: "ClaimFlow",
    locale: "nl_NL",
    type: "website",
  },

  // Twitter cards
  twitter: {
    title: "ClaimFlow — Klantvriendelijke Claimwizard",
    description: "Claim wizard",
    creator: "@nabilnaou",
  },
};

// WCAG: First tab allows screenreaders to skip to the main content, if disabled person desires.
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

        <main id="main" tabIndex={-1} className="container stack">
          {children}
        </main>
      </body>
    </html>
  );
}
