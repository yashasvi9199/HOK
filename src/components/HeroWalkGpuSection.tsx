import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, RotateCcw, Sparkles, MessageCircle } from 'lucide-react';
import { BRAND_LOGO_URL } from '../assets/Logo';
import { AtelierButton } from './AtelierButton';

interface HeroWalkGpuSectionProps {
  onExploreCards?: () => void;
  onOpenWhatsApp?: () => void;
  isMobile?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export const HeroWalkGpuSection: React.FC<HeroWalkGpuSectionProps> = ({
  onExploreCards,
  onOpenWhatsApp,
  isMobile = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealPercent, setRevealPercent] = useState<number>(0);
  const [walkCompleted, setWalkCompleted] = useState<boolean>(false);
  const walkStartRef = useRef<number>(performance.now());
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0.5,
    y: 0.5,
    active: false,
  });

  const WALK_DURATION_MS = 5200; // 5.2 seconds graceful couture walk left-to-right

  const replayWalk = useCallback(() => {
    walkStartRef.current = performance.now();
    setWalkCompleted(false);
    setRevealPercent(0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 720);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const palette = ['#ece7d5', '#a33533', '#806055', '#d4b483', '#ffffff'];
    const particles: Particle[] = [];

    const spawnWakeParticle = (originX: number, originY: number, burst = false) => {
      const color = palette[Math.floor(Math.random() * palette.length)];
      particles.push({
        x: originX + (Math.random() - 0.5) * (burst ? 45 : 22),
        y: originY + (Math.random() - 0.5) * (burst ? 240 : 180),
        vx: -1.2 - Math.random() * 2.8,
        vy: (Math.random() - 0.5) * 1.6 - 0.3,
        size: 1.5 + Math.random() * (burst ? 5.5 : 3.8),
        alpha: 0.1,
        maxAlpha: 0.55 + Math.random() * 0.45,
        color,
        life: 0,
        maxLife: 45 + Math.random() * 75,
      });
    };

    // Seed ambient light particles
    for (let i = 0; i < (isMobile ? 65 : 130); i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.2 - Math.random() * 0.5,
        size: 1 + Math.random() * 2.8,
        alpha: 0.2,
        maxAlpha: 0.35 + Math.random() * 0.4,
        color: palette[i % palette.length],
        life: Math.random() * 100,
        maxLife: 120 + Math.random() * 100,
      });
    }

    // Draw articulated high-fashion lady walking silhouette from left to right
    const drawCoutureLadyWalker = (
      ctx: CanvasRenderingContext2D,
      walkerX: number,
      floorY: number,
      scale: number,
      timeSec: number
    ) => {
      ctx.save();
      ctx.translate(walkerX, floorY);
      ctx.scale(scale, scale);

      // Graceful runway stride cycle (frequency ~ 2.1 Hz)
      const stride = timeSec * 7.2;
      const hipSway = Math.sin(stride * 2) * 3.5;
      const legAngleA = Math.sin(stride) * 0.46;
      const legAngleB = Math.sin(stride + Math.PI) * 0.46;
      const kneeBendA = Math.max(0, -Math.cos(stride) * 0.42);
      const kneeBendB = Math.max(0, -Math.cos(stride + Math.PI) * 0.42);
      const armSwingA = Math.sin(stride + Math.PI) * 0.32;
      const armSwingB = Math.sin(stride) * 0.28;

      // 1. Volumetric Golden & Cinder Aura behind the walking lady
      const auraGrad = ctx.createRadialGradient(-20, -145, 10, -20, -145, 185);
      auraGrad.addColorStop(0, 'rgba(236, 231, 213, 0.55)');
      auraGrad.addColorStop(0.4, 'rgba(163, 53, 51, 0.32)');
      auraGrad.addColorStop(0.75, 'rgba(128, 96, 85, 0.14)');
      auraGrad.addColorStop(1, 'rgba(48, 41, 42, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(-20, -145, 185, 0, Math.PI * 2);
      ctx.fill();

      // 2. Flowing Couture Silk Cape / Train billowing behind her (to the left)
      ctx.save();
      const wave1 = Math.sin(timeSec * 5.5) * 16;
      const wave2 = Math.cos(timeSec * 4.2) * 22;
      const trainGrad = ctx.createLinearGradient(-190, -190, 15, -40);
      trainGrad.addColorStop(0, 'rgba(163, 53, 51, 0.0)');
      trainGrad.addColorStop(0.35, 'rgba(163, 53, 51, 0.68)');
      trainGrad.addColorStop(0.75, 'rgba(48, 41, 42, 0.92)');
      trainGrad.addColorStop(1, '#30292a');

      ctx.fillStyle = trainGrad;
      ctx.beginPath();
      ctx.moveTo(2, -198 + hipSway); // Shoulder attachment
      ctx.bezierCurveTo(
        -55,
        -195 + wave1,
        -125,
        -150 + wave2,
        -195,
        -65 + wave1 * 1.3
      );
      ctx.bezierCurveTo(
        -135,
        -35 + wave2,
        -60,
        -45 + wave1,
        -4,
        -95 + hipSway
      );
      ctx.closePath();
      ctx.fill();

      // Luminous silk rim highlight on couture cape
      ctx.strokeStyle = 'rgba(236, 231, 213, 0.78)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(2, -198 + hipSway);
      ctx.bezierCurveTo(-55, -195 + wave1, -125, -150 + wave2, -195, -65 + wave1 * 1.3);
      ctx.stroke();
      ctx.restore();

      // Helper to draw an articulated fashion leg with stiletto heel
      const drawLeg = (hipAngle: number, kneeAngle: number, isBackLeg: boolean) => {
        ctx.save();
        ctx.translate(0, -112 + hipSway);
        ctx.rotate(hipAngle);

        // Thigh
        ctx.fillStyle = isBackLeg ? '#231d1e' : '#30292a';
        ctx.strokeStyle = 'rgba(236, 231, 213, 0.6)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-7, 0);
        ctx.quadraticCurveTo(8, 26, 4, 54);
        ctx.lineTo(-4, 54);
        ctx.quadraticCurveTo(-8, 26, -7, 0);
        ctx.fill();
        if (!isBackLeg) ctx.stroke();

        // Calf & Ankle
        ctx.translate(0, 52);
        ctx.rotate(kneeAngle);
        ctx.beginPath();
        ctx.moveTo(-4.5, 0);
        ctx.quadraticCurveTo(4.5, 24, 2.5, 50);
        ctx.lineTo(-2.5, 50);
        ctx.quadraticCurveTo(-5, 24, -4.5, 0);
        ctx.fill();
        if (!isBackLeg) ctx.stroke();

        // High-Fashion Stiletto Heel
        ctx.translate(0, 50);
        ctx.fillStyle = '#a33533';
        ctx.beginPath();
        ctx.moveTo(-3, 0);
        ctx.lineTo(-3, 9);
        ctx.lineTo(-1.5, 9);
        ctx.lineTo(-1, 3);
        ctx.lineTo(14, 9);
        ctx.lineTo(7, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      };

      // Back Leg
      drawLeg(legAngleB, kneeBendB, true);

      // Back Arm
      ctx.save();
      ctx.translate(2, -192 + hipSway);
      ctx.rotate(armSwingA);
      ctx.strokeStyle = '#231d1e';
      ctx.lineWidth = 5.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(8, 34);
      ctx.lineTo(18, 62);
      ctx.stroke();
      ctx.restore();

      // Sculpted Couture Torso & High-Slit Gown Bodice
      ctx.save();
      ctx.translate(0, hipSway);
      const gownGrad = ctx.createLinearGradient(-20, -205, 25, -85);
      gownGrad.addColorStop(0, '#ece7d5');
      gownGrad.addColorStop(0.25, '#a33533');
      gownGrad.addColorStop(1, '#30292a');
      ctx.fillStyle = gownGrad;

      ctx.beginPath();
      ctx.moveTo(-7, -202); // Back shoulder
      ctx.lineTo(11, -198); // Front shoulder
      ctx.quadraticCurveTo(18, -175, 7, -152); // Bust to narrow waist
      ctx.quadraticCurveTo(22, -128, 26, -75); // Front draped skirt slit
      ctx.quadraticCurveTo(0, -82, -18, -68); // Flowing hem
      ctx.quadraticCurveTo(-15, -125, -6, -152); // Back hip to waist
      ctx.closePath();
      ctx.fill();

      // Gold belt accent at waist
      ctx.fillStyle = '#ece7d5';
      ctx.fillRect(-6, -154, 14, 3.5);
      ctx.restore();

      // Front Leg
      drawLeg(legAngleA, kneeBendA, false);

      // Front Arm (graceful couture pose)
      ctx.save();
      ctx.translate(4, -192 + hipSway);
      ctx.rotate(armSwingB);
      ctx.strokeStyle = '#ece7d5';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-6, 34);
      ctx.lineTo(6, 62);
      ctx.stroke();
      ctx.restore();

      // Neck, Poised Head & Wide-Brim Couture Atelier Hat
      ctx.save();
      ctx.translate(2, -202 + hipSway);
      // Swan neck
      ctx.fillStyle = '#ece7d5';
      ctx.fillRect(-2.5, -16, 6, 16);
      // Sculpted head profile facing right
      ctx.beginPath();
      ctx.ellipse(2, -25, 9.5, 12, 0.12, 0, Math.PI * 2);
      ctx.fill();

      // High-fashion wide-brim editorial hat in Obsidian Veil & Cindered Red
      ctx.fillStyle = '#30292a';
      ctx.strokeStyle = '#ece7d5';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(1, -34, 34, 6.5, -0.14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Hat crown & cindered red silk ribbon
      ctx.fillStyle = '#a33533';
      ctx.beginPath();
      ctx.arc(0, -36, 10, Math.PI, 0);
      ctx.fill();
      ctx.restore();

      // Runway ground reflection shimmer
      const reflGrad = ctx.createRadialGradient(0, 8, 2, 0, 8, 52);
      reflGrad.addColorStop(0, 'rgba(236, 231, 213, 0.45)');
      reflGrad.addColorStop(1, 'rgba(236, 231, 213, 0)');
      ctx.fillStyle = reflGrad;
      ctx.beginPath();
      ctx.ellipse(0, 8, 52, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = (now: number) => {
      const elapsed = now - walkStartRef.current;
      const rawProgress = Math.min(1, elapsed / WALK_DURATION_MS);
      // Smooth ease-in-out stride progression
      const easedProgress =
        rawProgress < 0.5
          ? 2 * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      const currentPct = Math.min(100, Math.round(easedProgress * 100));
      setRevealPercent(currentPct);
      if (rawProgress >= 1) {
        setWalkCompleted(true);
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Atmospheric GPU Shader Backdrop Waves
      const timeSec = now * 0.001;
      ctx.save();
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const waveGrad = ctx.createLinearGradient(0, 0, width, height);
        waveGrad.addColorStop(0, 'rgba(48, 41, 42, 0.35)');
        waveGrad.addColorStop(0.5, i === 1 ? 'rgba(163, 53, 51, 0.16)' : 'rgba(128, 96, 85, 0.22)');
        waveGrad.addColorStop(1, 'rgba(236, 231, 213, 0.08)');
        ctx.fillStyle = waveGrad;

        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 40) {
          const y =
            height * (0.45 + i * 0.14) +
            Math.sin(x * 0.004 + timeSec * (1.1 + i * 0.4)) * 38 +
            Math.cos(x * 0.009 - timeSec * 0.8) * 20;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Walker current X position (walks from -60px on left to width + 140px on right)
      const walkerX = -60 + easedProgress * (width + 200);
      const floorY = height * (isMobile ? 0.86 : 0.84);

      // Spawn GPU wake particles along the lady's path while she walks
      if (rawProgress < 1) {
        for (let k = 0; k < (isMobile ? 2 : 4); k++) {
          spawnWakeParticle(walkerX - 18, floorY - 120);
        }
      }

      // Interactive pointer trail particles
      if (pointerRef.current.active && Math.random() > 0.35) {
        spawnWakeParticle(pointerRef.current.x * width, pointerRef.current.y * height);
      }

      // 2. Render & Update GPU Particles with Additive Glow
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;

        const lifeRatio = p.life / p.maxLife;
        const currentAlpha =
          lifeRatio < 0.2
            ? (lifeRatio / 0.2) * p.maxAlpha
            : (1 - (lifeRatio - 0.2) / 0.8) * p.maxAlpha;

        if (p.life >= p.maxLife) {
          if (particles.length > (isMobile ? 75 : 150)) {
            particles.splice(i, 1);
            continue;
          } else {
            p.x = Math.random() * width;
            p.y = height + 10;
            p.life = 0;
          }
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 3. Vertical Light Curtain at the Lady's Stride Threshold
      if (rawProgress < 0.99) {
        ctx.save();
        const beamGrad = ctx.createLinearGradient(walkerX - 110, 0, walkerX + 30, 0);
        beamGrad.addColorStop(0, 'rgba(236, 231, 213, 0)');
        beamGrad.addColorStop(0.7, 'rgba(163, 53, 51, 0.25)');
        beamGrad.addColorStop(0.92, 'rgba(236, 231, 213, 0.65)');
        beamGrad.addColorStop(1, 'rgba(236, 231, 213, 0)');
        ctx.fillStyle = beamGrad;
        ctx.fillRect(walkerX - 110, 0, 140, height);
        ctx.restore();
      }

      // 4. Draw the High-Fashion Lady Walking Left to Right
      if (rawProgress < 1) {
        drawCoutureLadyWalker(
          ctx,
          walkerX,
          floorY,
          isMobile ? 0.95 : 1.22,
          timeSec
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Clip-path unveils the brand logo, brand name, and hero section behind the walking lady
  const clipRightInset = Math.max(0, 100 - revealPercent);

  return (
    <section
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
          active: true,
        };
      }}
      onMouseLeave={() => {
        pointerRef.current.active = false;
      }}
      className="relative min-h-[88vh] w-full overflow-hidden bg-[#30292a] text-[#ece7d5] flex items-center justify-center border-b border-[#ece7d5]/15 select-none"
    >
      {/* Background Weathered Steel & Obsidian Atmospheric Mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(131, 125, 117, 0.42) 0%, rgba(128, 96, 85, 0.28) 45%, rgba(48, 41, 42, 0.96) 100%)',
        }}
      />

      {/* Pre-Reveal Subtle Stage Prompt (visible before the lady walks across) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-20">
        <span className="font-serif italic text-xl md:text-2xl tracking-[0.3em] text-[#ece7d5]/50 uppercase">
          The Atelier Runway Unfolds...
        </span>
      </div>

      {/* Revealed Brand Section & Logo (Appears progressively behind the walking lady!) */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-12 py-16 md:py-24 w-full transition-[clip-path] duration-75 ease-linear"
        style={{
          clipPath: `inset(0 ${clipRightInset}% 0 0)`,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Name & Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 text-xs font-sans tracking-[0.26em] uppercase text-[#ece7d5]/85">
              <span>Digital Art Studio</span>
              <span aria-hidden="true" className="text-[#a33533]">·</span>
              <span>Fashion Illustration</span>
              <span aria-hidden="true" className="text-[#a33533]">·</span>
              <span>Procreate Academy</span>
            </div>

            <h1
              className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal text-[#ece7d5] leading-[1.06] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              House of Kalakaar{' '}
              <span className="block italic font-light text-[#a33533] mt-2">
                by Vrinda Haldia
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#ece7d5]/85 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Where high-fashion runway silhouettes, tactile oil-pastel textures, and digital couture converge. Experience an intimate artistic monograph crafted with authentic stroke physics and timeless Indian heritage.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <AtelierButton
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 text-[#ece7d5]" />}
                onClick={onExploreCards}
                className="bg-[#a33533] text-[#ece7d5] border-[#a33533] hover:bg-[#806055] hover:border-[#ece7d5]/40"
              >
                Explore Atelier Chapters
              </AtelierButton>

              <AtelierButton
                variant="outline"
                size="lg"
                icon={<MessageCircle className="w-4 h-4 text-[#ece7d5]" />}
                onClick={onOpenWhatsApp}
                className="border-[#ece7d5]/35 text-[#ece7d5] hover:bg-[#ece7d5] hover:text-[#30292a]"
              >
                Direct Studio WhatsApp
              </AtelierButton>

              <button
                type="button"
                onClick={replayWalk}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-sans tracking-wider uppercase text-[#ece7d5]/80 hover:text-[#ece7d5] border border-[#ece7d5]/20 hover:border-[#a33533] bg-[#30292a]/60 backdrop-blur-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
                title="Replay Couture Walk & GPU Reveal"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#a33533]" />
                <span>Replay Walk</span>
              </button>
            </div>
          </div>

          {/* Right Column: Prominent Uploaded Brand Logo Crest with GPU Halo */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{
                scale: revealPercent > 45 ? 1 : 0.9,
                opacity: revealPercent > 35 ? 1 : 0.2,
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 sm:p-8 rounded-full bg-gradient-to-b from-[#ece7d5]/15 via-[#806055]/20 to-[#30292a]/80 border border-[#ece7d5]/25 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-md group"
            >
              {/* Rotating ornamental ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-[#ece7d5]/30 pointer-events-none" />

              <img
                src={BRAND_LOGO_URL}
                alt="House of Kalakaar by Vrinda Haldia Official Brand Logo"
                className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="mt-5 flex items-center gap-3 text-xs font-sans text-[#ece7d5]/75 tracking-widest uppercase">
              <span>Jaipur</span>
              <span aria-hidden="true">·</span>
              <span>New Delhi</span>
              <span aria-hidden="true">·</span>
              <span>2,500+ Artists Mentored</span>
            </div>
          </div>
        </div>
      </div>

      {/* Foreground GPU Canvas for the Walking Lady Silhouette & Particle Wake */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Subtle Bottom Runway Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#30292a] z-30">
        <div
          className="h-full bg-gradient-to-r from-[#806055] via-[#a33533] to-[#ece7d5] transition-all duration-75"
          style={{ width: `${revealPercent}%` }}
        />
      </div>
    </section>
  );
};
