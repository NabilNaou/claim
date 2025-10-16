import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div
        className={`container ${styles.nav}`}
        role="navigation"
        aria-label="Hoofd"
      >
        <Link className={styles.brand} href="/">
          ClaimFlow
        </Link>
        <Link className={styles.link} href="/" aria-current="page">
          Home
        </Link>
        <Link className={styles.link} href="/claim/1">
          Claim indienen
        </Link>
      </div>
    </header>
  );
}
