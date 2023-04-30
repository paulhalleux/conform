"use client";

import { useEffect, useRef, useState } from "react";

import { Loader } from "@/components/ui";
import { LoaderProps } from "@/components/ui/loader/loader";

import styles from "./loader.module.scss";

export function PageLoader(props: LoaderProps) {
  const timeout = useRef<NodeJS.Timeout>();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setShowLoader(true);
    }, 200);

    return () => clearTimeout(timeout.current);
  }, []);

  if (!showLoader) {
    return null;
  }

  return (
    <div className={styles["loader--full"]}>
      <Loader {...props} />
    </div>
  );
}
