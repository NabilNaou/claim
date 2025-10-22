"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const path = usePathname();
  return (
    <header className={styles.header}>
      <nav className="container" aria-label="Hoofd">
        <ul className={styles.nav}>
          <li className={styles.brand}>
            <Link href="/">ClaimFlow</Link>
          </li>
          <li>
            <Link
              className={styles.link}
              href="/"
              aria-current={path === "/" ? "page" : undefined}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={styles.link}
              href="/claim/1"
              aria-current={path.startsWith("/claim") ? "page" : undefined}
            >
              Claim indienen
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
