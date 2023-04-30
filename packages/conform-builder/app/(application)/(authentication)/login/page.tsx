import { Command } from "lucide-react";
import Link from "next/link";

import { LoginForm } from "@/components/forms/login-form";

import styles from "./page.module.scss";

export default function LoginPage() {
  return (
    <main className={styles.login__container}>
      <header className={styles.header}>
        <Command className={styles.icon} size={32} />
        <h2 className={styles.title__main}>Welcome back</h2>
        <h3 className={styles.title__sub}>
          Enter your username to sign in to conform.
        </h3>
      </header>
      <section className={styles.form__container}>
        <LoginForm />
      </section>
      <hr className={styles.separator} />
      <p>
        and <Link href="/">register</Link> if you {`don't`} have an account yet.
      </p>
    </main>
  );
}
