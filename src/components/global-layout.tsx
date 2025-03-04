import styles from "@/styles/global-layout.module.css";
import Link from "next/link";

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={"/"}>👕 Shopping Mall 👔</Link>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Copyright 2025 By Kim. </footer>
    </div>
  );
}
