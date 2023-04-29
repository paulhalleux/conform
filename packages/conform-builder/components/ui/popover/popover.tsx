"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

import { useClickOutside } from "@/hooks/use-click-outside";
import { PositionToAnimationMap } from "@/utils/animations";
import { Position } from "@/utils/positions";

import styles from "./popover.module.scss";

type PopoverProps = {
  trigger: ReactNode;
  position?: Position;
  className?: string;
  children: ReactNode | ((onClose: () => void) => ReactNode);
};

export function Popover({
  children,
  className,
  position = "bottom-left",
  trigger,
}: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [shown, setShown] = useState<boolean>(false);

  useClickOutside(popoverRef, () => setShown(false));

  return (
    <div className={clsx(styles.popover, className)} ref={popoverRef}>
      <button
        className={styles.popover__trigger}
        onClick={() => setShown((v) => !v)}
      >
        {trigger}
      </button>
      <AnimatePresence>
        {shown && (
          <motion.div
            ref={containerRef}
            variants={PositionToAnimationMap[position]}
            initial="initial"
            animate="animate"
            exit="exit"
            className={clsx(
              styles.popover__container,
              styles[`popover--pos-${position}`]
            )}
          >
            {typeof children === "function"
              ? children(() => setShown(false))
              : children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
