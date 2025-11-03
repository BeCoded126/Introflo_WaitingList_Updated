"use client";

import React, { useState, useEffect } from "react";
import Card, { Facility } from "./Card";
import styles from "../styles/SwipeDeck.module.css";

type Props = {
  items?: Facility[];
  onMatch?: (f: Facility) => void;
  onSkip?: (f: Facility) => void;
};

export default function SwipeDeck({ items = [], onMatch, onSkip }: Props) {
  const [stack, setStack] = useState<Facility[]>([]);

  // Initialize stack only on client
  useEffect(() => {
    setStack(items);
  }, [items]);

  function handleMatch() {
    const [top, ...rest] = stack;
    if (top) {
      onMatch?.(top);
      setStack(rest);
    }
  }

  function handleSkip() {
    const [top, ...rest] = stack;
    if (top) {
      onSkip?.(top);
      setStack(rest);
    }
  }

  const top = stack[0];

  return (
    <div className={styles["swipe-deck"]}>
      {top ? (
        <div className={styles.stack}>
          <div className={styles["top-card"]}>
            <Card facility={top} />
          </div>
          <div className={styles.controls}>
            <button
              className={`${styles.btn} ${styles.skip}`}
              onClick={handleSkip}
            >
              Nope
            </button>
            <button
              className={`${styles.btn} ${styles.match}`}
              onClick={handleMatch}
            >
              Match
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          No more matches — try widening your filters.
        </div>
      )}
    </div>
  );
}
