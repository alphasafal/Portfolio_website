"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type HeroTagHighlightContextValue = {
  activeTags: string[];
  setActiveTags: (tags: string[]) => void;
  highlight: (tags: string[]) => void;
  clearHighlight: () => void;
};

const HeroTagHighlightContext = createContext<HeroTagHighlightContextValue | null>(null);

export function HeroTagHighlightProvider({ children }: { children: React.ReactNode }) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const highlight = useCallback((tags: string[]) => setActiveTags(tags), []);
  const clearHighlight = useCallback(() => setActiveTags([]), []);

  const value = useMemo(
    () => ({ activeTags, setActiveTags, highlight, clearHighlight }),
    [activeTags, highlight, clearHighlight]
  );

  return (
    <HeroTagHighlightContext.Provider value={value}>{children}</HeroTagHighlightContext.Provider>
  );
}

export function useHeroTagHighlight() {
  const ctx = useContext(HeroTagHighlightContext);
  if (!ctx) {
    throw new Error("useHeroTagHighlight must be used within HeroTagHighlightProvider");
  }
  return ctx;
}

export function useHeroTagHighlightOptional() {
  return useContext(HeroTagHighlightContext);
}
