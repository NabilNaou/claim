import styles from "./Stepper.module.css";

export default function Stepper({
  step,
  total = 5,
}: {
  step: number;
  total?: number;
}) {
  return (
    <div className={styles.wrapper} aria-label="Voortgang">
      <ol className={styles.list}>
        {Array.from({ length: total }).map((_, i) => {
          const n = i + 1;
          const isCurrent = n === step;
          return (
            <li
              key={n}
              className={`${styles.item} ${isCurrent ? styles.current : ""}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              Stap {n}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
