"use client";

import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const STORAGE_KEY = "vault-unlocked";

export function useKonamiCode(onUnlock: () => void) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      onUnlock();
    }
  }, [onUnlock]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI[index];

      if (key === expected) {
        const next = index + 1;
        if (next === KONAMI.length) {
          sessionStorage.setItem(STORAGE_KEY, "true");
          onUnlock();
          setIndex(0);
        } else {
          setIndex(next);
        }
      } else {
        setIndex(key === KONAMI[0] ? 1 : 0);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, onUnlock]);
}

export function isVaultUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) === "true";
}
