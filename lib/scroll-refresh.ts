import { ScrollTrigger } from "@/lib/gsap";

let scheduled = false;

export function scheduleScrollRefresh() {
  if (scheduled || typeof window === "undefined") return;
  scheduled = true;
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    scheduled = false;
  });
}
