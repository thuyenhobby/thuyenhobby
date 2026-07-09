"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
};

export function CanvasRoom() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const reducedMotionRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;

    const createParticles = (width: number, height: number) => {
      particlesRef.current = Array.from({ length: 34 }, (_, index) => ({
        x: (index * 89) % width,
        y: (index * 53) % height,
        size: 0.8 + (index % 3) * 0.45,
        speed: 0.12 + (index % 5) * 0.035,
        alpha: 0.12 + (index % 4) * 0.035,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles(rect.width, rect.height);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const parallaxX = pointerRef.current.x * 10;
      const parallaxY = pointerRef.current.y * 8;

      context.clearRect(0, 0, width, height);

      const bg = context.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#111827");
      bg.addColorStop(0.45, "#07111f");
      bg.addColorStop(1, "#020617");
      context.fillStyle = bg;
      context.fillRect(0, 0, width, height);

      const wall = context.createLinearGradient(0, 0, 0, height * 0.72);
      wall.addColorStop(0, "rgba(96,165,250,0.14)");
      wall.addColorStop(1, "rgba(15,23,42,0.12)");
      context.fillStyle = wall;
      context.fillRect(28 + parallaxX * 0.2, 24 + parallaxY * 0.1, width - 56, height * 0.58);

      context.strokeStyle = "rgba(148,163,184,0.18)";
      context.lineWidth = 1;
      context.strokeRect(28, 24, width - 56, height * 0.58);

      const floorTop = height * 0.58;
      context.beginPath();
      context.moveTo(28, floorTop);
      context.lineTo(width - 28, floorTop);
      context.lineTo(width - 76, height - 28);
      context.lineTo(76, height - 28);
      context.closePath();
      context.fillStyle = "rgba(15,23,42,0.72)";
      context.fill();
      context.strokeStyle = "rgba(96,165,250,0.14)";
      context.stroke();

      context.strokeStyle = "rgba(148,163,184,0.12)";
      for (let i = 0; i < 9; i += 1) {
        const t = i / 8;
        const x1 = 76 + (width * 0.35 - 76) * t;
        const x2 = width - 76 - (width * 0.35 - 76) * t;
        context.beginPath();
        context.moveTo(x1, height - 28);
        context.lineTo(width / 2, floorTop);
        context.lineTo(x2, height - 28);
        context.stroke();
      }

      for (let i = 1; i < 7; i += 1) {
        const y = floorTop + ((height - 40 - floorTop) * i) / 7;
        context.beginPath();
        context.moveTo(56 + i * 5, y);
        context.lineTo(width - 56 - i * 5, y);
        context.stroke();
      }

      const windowX = width * 0.12 + parallaxX * 0.35;
      const windowY = height * 0.12 + parallaxY * 0.25;
      context.fillStyle = "rgba(96,165,250,0.16)";
      context.fillRect(windowX, windowY, width * 0.18, height * 0.2);
      context.strokeStyle = "rgba(147,197,253,0.32)";
      context.strokeRect(windowX, windowY, width * 0.18, height * 0.2);
      context.beginPath();
      context.moveTo(windowX + width * 0.09, windowY);
      context.lineTo(windowX + width * 0.09, windowY + height * 0.2);
      context.moveTo(windowX, windowY + height * 0.1);
      context.lineTo(windowX + width * 0.18, windowY + height * 0.1);
      context.stroke();

      const monitorGlow = context.createRadialGradient(width * 0.48, height * 0.43, 8, width * 0.48, height * 0.43, width * 0.22);
      monitorGlow.addColorStop(0, "rgba(96,165,250,0.34)");
      monitorGlow.addColorStop(1, "rgba(96,165,250,0)");
      context.fillStyle = monitorGlow;
      context.fillRect(0, 0, width, height);

      const warmLight = context.createRadialGradient(width * 0.74, height * 0.25, 10, width * 0.74, height * 0.25, width * 0.3);
      warmLight.addColorStop(0, "rgba(251,191,36,0.2)");
      warmLight.addColorStop(1, "rgba(251,191,36,0)");
      context.fillStyle = warmLight;
      context.fillRect(0, 0, width, height);

      // Chest silhouette: resources zone.
      const chestX = width * 0.14 + parallaxX * 0.3;
      const chestY = height * 0.6;
      const chestW = width * 0.18;
      const chestH = height * 0.16;
      context.fillStyle = "rgba(120,53,15,0.46)";
      context.fillRect(chestX, chestY, chestW, chestH);
      context.fillStyle = "rgba(251,191,36,0.16)";
      context.fillRect(chestX, chestY, chestW, chestH * 0.34);
      context.strokeStyle = "rgba(251,191,36,0.28)";
      context.strokeRect(chestX, chestY, chestW, chestH);
      context.beginPath();
      context.moveTo(chestX, chestY + chestH * 0.42);
      context.lineTo(chestX + chestW, chestY + chestH * 0.42);
      context.moveTo(chestX + chestW * 0.5, chestY);
      context.lineTo(chestX + chestW * 0.5, chestY + chestH);
      context.stroke();

      // Bookshelf silhouette: writing zone.
      const shelfX = width * 0.7 + parallaxX * 0.25;
      const shelfY = height * 0.2;
      const shelfW = width * 0.18;
      const shelfH = height * 0.34;
      context.fillStyle = "rgba(20,83,45,0.34)";
      context.fillRect(shelfX, shelfY, shelfW, shelfH);
      context.strokeStyle = "rgba(110,231,183,0.22)";
      context.strokeRect(shelfX, shelfY, shelfW, shelfH);
      for (let i = 1; i < 4; i += 1) {
        const shelfLineY = shelfY + (shelfH * i) / 4;
        context.beginPath();
        context.moveTo(shelfX, shelfLineY);
        context.lineTo(shelfX + shelfW, shelfLineY);
        context.stroke();
      }
      for (let i = 0; i < 8; i += 1) {
        context.fillStyle = i % 2 === 0 ? "rgba(96,165,250,0.28)" : "rgba(251,191,36,0.22)";
        context.fillRect(shelfX + 12 + i * 12, shelfY + shelfH * 0.08, 7, shelfH * 0.22);
      }

      // Tool desk / monitor silhouette.
      const deskX = width * 0.48;
      const deskY = height * 0.66;
      context.fillStyle = "rgba(30,41,59,0.82)";
      context.fillRect(deskX, deskY, width * 0.28, height * 0.04);
      context.fillRect(deskX + width * 0.02, deskY + height * 0.04, width * 0.018, height * 0.14);
      context.fillRect(deskX + width * 0.24, deskY + height * 0.04, width * 0.018, height * 0.14);
      context.fillStyle = "rgba(59,130,246,0.22)";
      context.fillRect(deskX + width * 0.07, deskY - height * 0.15, width * 0.12, height * 0.1);
      context.strokeStyle = "rgba(147,197,253,0.35)";
      context.strokeRect(deskX + width * 0.07, deskY - height * 0.15, width * 0.12, height * 0.1);

      // Room core rug.
      context.fillStyle = "rgba(96,165,250,0.08)";
      context.beginPath();
      context.ellipse(width * 0.5, height * 0.6, width * 0.13, height * 0.055, 0, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "rgba(96,165,250,0.2)";
      context.stroke();

      context.fillStyle = "rgba(0,0,0,0.22)";
      context.beginPath();
      context.ellipse(width * 0.48, height * 0.73, width * 0.3, height * 0.055, 0, 0, Math.PI * 2);
      context.fill();

      if (!reducedMotionRef.current) {
        context.fillStyle = "rgba(226,232,240,0.45)";
        particlesRef.current.forEach((particle) => {
          particle.y -= particle.speed;
          if (particle.y < 0) particle.y = height;
          context.globalAlpha = particle.alpha;
          context.beginPath();
          context.arc(particle.x + parallaxX * 0.15, particle.y, particle.size, 0, Math.PI * 2);
          context.fill();
        });
        context.globalAlpha = 1;
      }

      const vignette = context.createRadialGradient(width / 2, height / 2, width * 0.2, width / 2, height / 2, width * 0.75);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.42)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      if (!reducedMotionRef.current) {
        frameRef.current = window.requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      };
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotionRef.current) draw();
    });
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
