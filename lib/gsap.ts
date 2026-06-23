import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function registerGsap() {
  // Kept for compatibility — plugins register at module load.
}

export { gsap, ScrollTrigger, useGSAP };
