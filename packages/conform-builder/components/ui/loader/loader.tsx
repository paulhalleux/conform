import clsx from "clsx";
import React from "react";

import styles from "./loader.module.scss";

export type LoaderProps = {
  size?: "sm" | "md" | "lg";
  orientation?: "vertical" | "horizontal";
  color?: string;
  className?: string;
  label?: string;
};

export function Loader({
  size = "md",
  className,
  label,
  color = "currentColor",
  orientation = "horizontal",
}: LoaderProps) {
  let pxSize = 16;
  if (size === "md") {
    pxSize = 24;
  }
  if (size === "lg") {
    pxSize = 32;
  }

  return (
    <div
      className={clsx(
        styles.loader,
        styles[`loader--${orientation}`],
        className
      )}
    >
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={`${pxSize}px`}
        height={`${pxSize}px`}
        viewBox="0 0 122 122"
        style={
          { enableBackground: "new 0 0 50 50", color } as React.CSSProperties
        }
        xmlSpace="preserve"
      >
        <path
          d="M122 61C122 94.6894 94.6894 122 61 122C27.3106 122 0 94.6894 0 61C0 27.3106 27.3106 0 61 0C94.6894 0 122 27.3106 122 61ZM10.364 61C10.364 88.9655 33.0345 111.636 61 111.636C88.9655 111.636 111.636 88.9655 111.636 61C111.636 33.0345 88.9655 10.364 61 10.364C33.0345 10.364 10.364 33.0345 10.364 61Z"
          fill="currentColor"
          opacity={0.05}
        />
        <path
          fill="currentColor"
          d="M122 61C122 44.8218 115.573 29.3062 104.134 17.8665C92.6938 6.42677 77.1782 1.22142e-06 61 0C44.8218 -1.22142e-06 29.3062 6.42676 17.8665 17.8665C6.42677 29.3062 2.44284e-06 44.8218 0 61L10.364 61C10.364 47.5705 15.6989 34.6911 25.195 25.195C34.6911 15.6989 47.5705 10.364 61 10.364C74.4295 10.364 87.3089 15.6989 96.805 25.195C106.301 34.6911 111.636 47.5705 111.636 61H122Z"
        />
      </svg>
      {label}
    </div>
  );
}
