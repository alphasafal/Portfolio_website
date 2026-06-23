"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { spring } from "@/lib/motion";

type Props = {
  messages: readonly string[];
  intervalMs?: number;
  className?: string;
};

export function RotatingText({ messages, intervalMs = 4500, className }: Props) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || messages.length <= 1) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [messages.length, intervalMs, reduced]);

  return (
    <span className={`relative inline-block min-h-[1.4em] ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={messages[index]}
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ ...spring, duration: 0.45 }}
          className="inline-block"
        >
          {messages[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
