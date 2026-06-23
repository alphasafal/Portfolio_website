"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "@/lib/scroll";
import { spring } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const ACCENT = 0x8b7cff;
const ACCENT_CYAN = 0x5eead4;
const SILVER = 0xb8c0d0;
const PEARL = 0xe8ecf4;

type UfoParts = {
  root: THREE.Group;
  dome: THREE.Mesh;
  lights: THREE.Mesh[];
  beam: THREE.Mesh;
  glow: THREE.PointLight;
};

function mat(
  color: number,
  opts: Partial<THREE.MeshPhysicalMaterialParameters> = {}
) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.65,
    roughness: 0.28,
    clearcoat: 0.45,
    clearcoatRoughness: 0.12,
    ...opts,
  });
}

function buildUfo(): UfoParts {
  const root = new THREE.Group();

  const hull = mat(SILVER, { metalness: 0.85, roughness: 0.18, clearcoat: 0.85 });
  const pearl = mat(PEARL, { metalness: 0.5, roughness: 0.35, clearcoat: 0.6 });
  const glowMat = (color: number, intensity = 1.8) =>
    mat(color, { emissive: color, emissiveIntensity: intensity, roughness: 0.1 });

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.55, 32),
    new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.14 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.01;
  root.add(shadow);

  const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.68, 0.14, 36), hull);
  disc.position.y = 0.42;
  root.add(disc);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.64, 0.035, 12, 40), hull);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.36;
  root.add(rim);

  const under = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
    pearl
  );
  under.position.y = 0.36;
  under.rotation.x = Math.PI;
  root.add(under);

  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.34, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2),
    mat(0xdce6ff, {
      metalness: 0.3,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.88,
      transmission: 0.35,
      thickness: 0.4,
    })
  );
  dome.position.y = 0.52;
  root.add(dome);

  const cockpit = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    glowMat(ACCENT_CYAN, 0.6)
  );
  cockpit.position.y = 0.58;
  root.add(cockpit);

  const lights: THREE.Mesh[] = [];
  const lightCount = 10;
  for (let i = 0; i < lightCount; i++) {
    const angle = (i / lightCount) * Math.PI * 2;
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 12, 12),
      glowMat(i % 2 === 0 ? ACCENT : ACCENT_CYAN, 2)
    );
    bulb.position.set(Math.cos(angle) * 0.64, 0.38, Math.sin(angle) * 0.64);
    root.add(bulb);
    lights.push(bulb);
  }

  const beam = new THREE.Mesh(
    new THREE.ConeGeometry(0.22, 0.55, 20, 1, true),
    new THREE.MeshBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  beam.position.y = 0.1;
  root.add(beam);

  const glow = new THREE.PointLight(ACCENT, 0.9, 3);
  glow.position.set(0, 0.25, 0);
  root.add(glow);

  root.position.y = 0.08;
  root.scale.setScalar(0.95);
  return { root, dome, lights, beam, glow };
}

export function ScrollRobot() {
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const partsRef = useRef<UfoParts | null>(null);
  const scrollProgress = useRef(0);
  const velocityRef = useRef(0);
  const [pinned, setPinned] = useState(false);
  const [nearby, setNearby] = useState(false);

  const showMessage = pinned || nearby;

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const shell = shellRef.current;
      if (!shell || pinned) return;

      const rect = shell.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const threshold = Math.max(rect.width, rect.height) * 0.75 + 70;
      setNearby(dist < threshold);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setPinned(false);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [pinned]);

  useEffect(() => {
    if (!pinned) return;

    function onClickOutside(e: MouseEvent) {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) {
        setPinned(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [pinned]);

  function handleContact() {
    setPinned(false);
    setNearby(false);
    scrollToSection("contact");
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const shell = shellRef.current;
    if (!canvas || !shell) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      shell.style.display = "none";
      return;
    }

    const size = 150;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size, false);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 20);
    camera.position.set(0, 0.62, 2.6);
    camera.lookAt(0, 0.45, 0);

    scene.add(new THREE.HemisphereLight(0xe8eeff, 0x12122a, 0.6));
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(2, 5, 2);
    scene.add(key);

    const fill = new THREE.DirectionalLight(ACCENT, 0.4);
    fill.position.set(-2, 2, 1);
    scene.add(fill);

    const rim = new THREE.PointLight(ACCENT_CYAN, 0.9, 6);
    rim.position.set(0, 1.5, -1);
    scene.add(rim);

    const parts = buildUfo();
    partsRef.current = parts;
    scene.add(parts.root);

    let raf = 0;
    const tick = () => {
      const t = performance.now() * 0.001;
      const p = partsRef.current;
      if (p) {
        const velocity = velocityRef.current;
        velocityRef.current *= 0.85;

        p.root.position.y = 0.08 + Math.sin(t * 3) * 0.04 + Math.abs(velocity) * 0.06;
        p.root.rotation.z = Math.sin(t * 2) * 0.06 + velocity * 1.8;
        p.root.rotation.x = Math.sin(t * 1.5) * 0.04 + velocity * 1.2;

        p.dome.rotation.y = t * 0.35;

        p.lights.forEach((bulb, i) => {
          const pulse = Math.sin(t * 4 + i * 0.7) * 0.5 + 0.5;
          (bulb.material as THREE.MeshPhysicalMaterial).emissiveIntensity =
            1.2 + pulse * 2;
          bulb.scale.setScalar(0.85 + pulse * 0.3);
        });

        const beamPulse = 0.15 + Math.sin(t * 5) * 0.08;
        (p.beam.material as THREE.MeshBasicMaterial).opacity = beamPulse;
        p.beam.scale.y = 0.9 + Math.sin(t * 4) * 0.15;

        p.glow.intensity = 0.6 + Math.sin(t * 3.5) * 0.25;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const updatePosition = (progress: number) => {
      velocityRef.current = progress - scrollProgress.current;
      scrollProgress.current = progress;
      const pad = 12;
      const maxX = window.innerWidth - size - pad * 2;
      shell.style.transform = `translate3d(${pad + progress * maxX}px, 0, 0)`;
      if (partsRef.current) {
        partsRef.current.root.rotation.y = THREE.MathUtils.lerp(0.35, -0.35, progress);
      }
    };

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => updatePosition(self.progress),
    });

    updatePosition(st.progress);

    const onResize = () => updatePosition(st.progress);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
    };
  }, []);

  return (
    <div
      ref={shellRef}
      className="scroll-robot group fixed bottom-8 left-0 z-30 cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label="UFO companion — click for a message"
      onClick={() => setPinned((p) => !p)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setPinned((p) => !p);
        }
      }}
    >
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={spring}
            className="ufo-popup glass absolute bottom-full left-1/2 mb-3 w-[min(260px,80vw)] -translate-x-1/2 rounded-2xl p-4 text-center shadow-xl shadow-accent/20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPinned(false)}
              className="absolute top-2 right-2 text-muted hover:text-foreground transition"
              aria-label="Close message"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="text-sm font-medium text-foreground pr-4">
              You should contact Safal!
            </p>
            <p className="mt-1.5 text-xs text-muted">
              Building AI systems for manufacturing — let&apos;s talk.
            </p>
            <Button size="sm" className="mt-3 w-full" onClick={handleContact}>
              Get In Touch
            </Button>
            <span className="ufo-popup-tail" aria-hidden />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`scroll-robot-glow transition-opacity ${showMessage ? "opacity-100" : "opacity-70"}`} />
      <canvas
        ref={canvasRef}
        width={150}
        height={150}
        className={`relative h-[150px] w-[150px] transition-transform duration-300 ${showMessage ? "scale-105" : "group-hover:scale-[1.02]"}`}
      />
    </div>
  );
}
