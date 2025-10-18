import "./globals.css";

export const metadata = {
  title: "ClaimFlow",
  description: "Claim wizard demo",
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
