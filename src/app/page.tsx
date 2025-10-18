import Link from "next/link";

export default function Home() {
  return (
    <section className="stack">
      <h1>ClaimFlow</h1>
      <p>Start de demo, klik op het onderstaande stuk tekst</p>
      <p>
        <Link href="/claim/1">{">> Naar de claim-wizard!"}</Link>
      </p>
    </section>
  );
}
