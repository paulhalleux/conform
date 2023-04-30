import clsx from "clsx";
import { PropsWithChildren } from "react";

import { Loader } from "@/components/ui";

import styles from "./button.module.scss";

type ButtonProps = PropsWithChildren<{
  type: "submit" | "button" | "reset";
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}>;

export function Button({
  onClick,
  disabled,
  variant = "primary",
  className,
  type = "button",
  children,
  loading,
  size = "medium",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        className
      )}
    >
      <span
        className={clsx({
          [styles["content-hidden"]]: loading,
        })}
      >
        {children}
      </span>
      {loading && (
        <div className={styles.loader__container}>
          <Loader size="sm" color="white" />
        </div>
      )}
    </button>
  );
}
