export function shouldPinSections() {
  if (typeof window === "undefined") return true;
  return window.innerWidth >= 768;
}
