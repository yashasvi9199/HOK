import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import anatomyData from '../data/anatomy.json';
import { LiveColorPaletteOverlay } from './LiveColorPaletteOverlay';

const CANVAS_W = 640;
const CANVAS_H = 840;

export const ArtworkLayerDeconstructor: React.FC = () => {
  // Default to Stage 8 so the full multi-layered couture piece is shown on load
  const [activeStage, setActiveStage] = useState<number>(8);
  const [layerVisibility, setLayerVisibility] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
  });

  const masterCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageBuffersRef = useRef<Record<number, HTMLCanvasElement>>({});

  // Pre-render all 8 registered 2D layers onto offscreen canvases once
  useEffect(() => {
    const buffers: Record<number, HTMLCanvasElement> = {};
    for (let i = 1; i <= 8; i++) {
      const c = document.createElement('canvas');
      c.width = CANVAS_W;
      c.height = CANVAS_H;
      buffers[i] = c;
    }

    // Shared geometric anchor coordinates (strictly centered at X = 320)
    const CX = 320;
    const panelXTop = [278, 290, 302, 314, 326, 338, 350, 362];
    const panelXBot = [135, 188, 240, 293, 347, 400, 452, 505];
    const waistY = 292;
    const hemY = 776;

    // =========================================================================
    // STAGE 1: 01. The 9-Head Runway Croquis (Archival Parchment + Grid + Axis)
    // =========================================================================
    {
      const ctx = buffers[1].getContext('2d')!;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Warm archival parchment ground
      const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
      bgGrad.addColorStop(0, '#ece7d5');
      bgGrad.addColorStop(0.5, '#e5dec9');
      bgGrad.addColorStop(1, '#dbd2bc');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Fine linen paper tooth texture
      ctx.fillStyle = 'rgba(128, 96, 85, 0.06)';
      for (let y = 0; y < CANVAS_H; y += 4) {
        ctx.fillRect(0, y, CANVAS_W, 1);
      }
      for (let x = 0; x < CANVAS_W; x += 6) {
        ctx.fillRect(x, 0, 1, CANVAS_H);
      }

      // 9-Head Horizontal Calibration Ruler Lines
      ctx.strokeStyle = 'rgba(128, 96, 85, 0.28)';
      ctx.lineWidth = 1;
      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(48, 41, 42, 0.45)';
      for (let h = 1; h <= 9; h++) {
        const y = 65 + h * 80;
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(36, y);
        ctx.lineTo(CANVAS_W - 36, y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillText(`H0${h}`, 40, y - 5);
      }

      // Vertical Plumb Line Axis (X = 320)
      ctx.strokeStyle = 'rgba(163, 53, 51, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.setLineDash([6, 4]);
      ctx.moveTo(CX, 30);
      ctx.lineTo(CX, CANVAS_H - 30);
      ctx.stroke();
      ctx.setLineDash([]);

      // Graphite Mannequin Construction Lines
      ctx.strokeStyle = 'rgba(48, 41, 42, 0.55)';
      ctx.lineWidth = 1.6;

      // Head oval & tilt crosshairs
      ctx.beginPath();
      ctx.ellipse(CX, 112, 23, 30, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(CX - 25, 112);
      ctx.lineTo(CX + 25, 112);
      ctx.stroke();

      // Shoulder & Hip Contrapposto Balance Beams
      ctx.strokeStyle = 'rgba(163, 53, 51, 0.5)';
      ctx.beginPath();
      ctx.moveTo(256, 184);
      ctx.lineTo(384, 178); // Slight high-fashion shoulder cant
      ctx.moveTo(276, 290);
      ctx.lineTo(364, 295); // Counter-tilted hip axis
      ctx.stroke();

      // Ribcage & Pelvis construction cages
      ctx.strokeStyle = 'rgba(48, 41, 42, 0.45)';
      ctx.beginPath();
      ctx.ellipse(CX, 224, 38, 42, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(CX, 318, 42, 28, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Gesture Skirt Cone & Arm Axes
      ctx.beginPath();
      ctx.moveTo(278, waistY);
      ctx.lineTo(135, hemY);
      ctx.lineTo(505, hemY);
      ctx.lineTo(362, waistY);
      ctx.closePath();
      ctx.stroke();
    }

    // =========================================================================
    // STAGE 2: 02. Anatomical Ink Contour & Gesture (Calligraphic Linework)
    // =========================================================================
    {
      const ctx = buffers[2].getContext('2d')!;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.strokeStyle = '#30292a';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Regal Chignon Hair Silhouette & Crown
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(CX, 95, 28, Math.PI * 0.85, Math.PI * 2.15);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(CX, 72, 20, 11, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Sculpted Jawline & Neck Column
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(CX - 22, 106);
      ctx.quadraticCurveTo(CX - 20, 134, CX, 142);
      ctx.quadraticCurveTo(CX + 20, 134, CX + 22, 106);
      ctx.stroke();

      // Neck & Clavicle Lines
      ctx.beginPath();
      ctx.moveTo(CX - 11, 140);
      ctx.lineTo(CX - 14, 176);
      ctx.moveTo(CX + 11, 140);
      ctx.lineTo(CX + 14, 176);
      ctx.moveTo(268, 182);
      ctx.quadraticCurveTo(CX, 194, 372, 180);
      ctx.stroke();

      // Graceful Arms (Left hand on hip, Right arm holding dupatta)
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      // Left outer arm
      ctx.moveTo(264, 182);
      ctx.lineTo(234, 244);
      ctx.lineTo(274, 288);
      // Right outer arm
      ctx.moveTo(376, 180);
      ctx.lineTo(408, 242);
      ctx.lineTo(368, 290);
      ctx.stroke();

      // Sweetheart Couture Choli Bodice Contour
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(266, 182);
      ctx.lineTo(280, 268);
      ctx.quadraticCurveTo(CX, 280, 360, 268);
      ctx.lineTo(374, 180);
      ctx.stroke();

      // Kalidar Lehenga 8 Panel Seam Lines & Scalloped Hem
      ctx.lineWidth = 2.2;
      for (let i = 0; i < panelXTop.length; i++) {
        ctx.beginPath();
        ctx.moveTo(panelXTop[i], waistY);
        const ctrlX = (panelXTop[i] + panelXBot[i]) * 0.5 + (i - 3.5) * 6;
        ctx.quadraticCurveTo(ctrlX, (waistY + hemY) * 0.52, panelXBot[i], hemY);
        ctx.stroke();

        if (i < panelXTop.length - 1) {
          ctx.beginPath();
          ctx.moveTo(panelXBot[i], hemY);
          ctx.quadraticCurveTo(
            (panelXBot[i] + panelXBot[i + 1]) * 0.5,
            hemY + 18,
            panelXBot[i + 1],
            hemY
          );
          ctx.stroke();
        }
      }

      // Sweeping Dupatta Drape Lines
      ctx.strokeStyle = 'rgba(48, 41, 42, 0.75)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(374, 180);
      ctx.bezierCurveTo(340, 240, 250, 310, 175, 470);
      ctx.moveTo(404, 235);
      ctx.bezierCurveTo(360, 310, 275, 380, 195, 550);
      ctx.stroke();
    }

    // =========================================================================
    // STAGE 3: 03. Gouache Underpainting & Skin Planes (Warm Undertones)
    // =========================================================================
    {
      const ctx = buffers[3].getContext('2d')!;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Warm skin gouache wash (Face, Neck, Midriff, Arms)
      const skinGrad = ctx.createRadialGradient(CX - 5, 110, 6, CX, 120, 48);
      skinGrad.addColorStop(0, '#dfb895');
      skinGrad.addColorStop(0.6, '#b88564');
      skinGrad.addColorStop(1, '#8c5d44');

      ctx.fillStyle = skinGrad;
      ctx.beginPath();
      ctx.ellipse(CX, 112, 22, 29, 0, 0, Math.PI * 2);
      ctx.fill();

      // Neck & Décolletage warm wash
      ctx.fillStyle = '#b48263';
      ctx.beginPath();
      ctx.moveTo(CX - 12, 138);
      ctx.lineTo(CX + 12, 138);
      ctx.lineTo(356, 182);
      ctx.lineTo(CX, 212);
      ctx.lineTo(284, 182);
      ctx.closePath();
      ctx.fill();

      // Midriff warm plane between choli and lehenga waist
      ctx.fillStyle = '#a87557';
      ctx.fillRect(280, 266, 80, 28);

      // Left & Right Arms warm gouache fill
      ctx.strokeStyle = '#b48263';
      ctx.lineWidth = 13;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(266, 186);
      ctx.lineTo(238, 244);
      ctx.lineTo(276, 286);
      ctx.moveTo(374, 184);
      ctx.lineTo(404, 242);
      ctx.lineTo(366, 288);
      ctx.stroke();

      // Warm Drystone Clay & Raw Ochre Underpainting across Lehenga Skirt
      const underGrad = ctx.createLinearGradient(CX, waistY, CX, hemY);
      underGrad.addColorStop(0, 'rgba(128, 96, 85, 0.72)');
      underGrad.addColorStop(0.5, 'rgba(184, 139, 106, 0.65)');
      underGrad.addColorStop(1, 'rgba(128, 96, 85, 0.85)');
      ctx.fillStyle = underGrad;
      ctx.beginPath();
      ctx.moveTo(panelXTop[0], waistY);
      ctx.lineTo(panelXBot[0], hemY);
      ctx.quadraticCurveTo(CX, hemY + 24, panelXBot[7], hemY);
      ctx.lineTo(panelXTop[7], waistY);
      ctx.closePath();
      ctx.fill();
    }

    // =========================================================================
    // STAGE 4: 04. Silk Habotai & Crimson Base Wash (Garment Pigment Flats)
    // =========================================================================
    {
      const ctx = buffers[4].getContext('2d')!;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Choli Bodice in Deep Cindered Red (#a33533)
      const choliGrad = ctx.createLinearGradient(266, 180, 374, 272);
      choliGrad.addColorStop(0, '#8d2725');
      choliGrad.addColorStop(0.5, '#a33533');
      choliGrad.addColorStop(1, '#6e1d1c');
      ctx.fillStyle = choliGrad;
      ctx.beginPath();
      ctx.moveTo(266, 182);
      ctx.lineTo(288, 182);
      ctx.quadraticCurveTo(CX, 214, 352, 182);
      ctx.lineTo(374, 180);
      ctx.lineTo(360, 268);
      ctx.quadraticCurveTo(CX, 278, 280, 268);
      ctx.closePath();
      ctx.fill();

      // 7 Kalidar Panels in alternating rich Cindered Red & Royal Burgundy Silk
      for (let i = 0; i < panelXTop.length - 1; i++) {
        const pGrad = ctx.createLinearGradient(
          panelXTop[i],
          waistY,
          panelXBot[i + 1],
          hemY
        );
        const isEven = i % 2 === 0;
        pGrad.addColorStop(0, isEven ? '#9b2d2b' : '#7f2220');
        pGrad.addColorStop(0.65, isEven ? '#a33533' : '#8b2624');
        pGrad.addColorStop(1, '#581515');

        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.moveTo(panelXTop[i], waistY);
        ctx.lineTo(panelXBot[i], hemY);
        ctx.quadraticCurveTo(
          (panelXBot[i] + panelXBot[i + 1]) * 0.5,
          hemY + 18,
          panelXBot[i + 1],
          hemY
        );
        ctx.lineTo(panelXTop[i + 1], waistY);
        ctx.closePath();
        ctx.fill();
      }

      // Waistband (Neffa) Base Block
      ctx.fillStyle = '#5c1918';
      ctx.fillRect(277, waistY - 6, 86, 12);

      // Translucent Weathered Steel & Smoke Whisper Organza Dupatta Wash
      const dupGrad = ctx.createLinearGradient(380, 180, 175, 540);
      dupGrad.addColorStop(0, 'rgba(236, 231, 213, 0.42)');
      dupGrad.addColorStop(0.5, 'rgba(131, 125, 117, 0.38)');
      dupGrad.addColorStop(1, 'rgba(163, 53, 51, 0.32)');
      ctx.fillStyle = dupGrad;
      ctx.beginPath();
      ctx.moveTo(354, 180);
      ctx.lineTo(382, 180);
      ctx.bezierCurveTo(365, 295, 285, 395, 200, 565);
      ctx.lineTo(165, 495);
      ctx.bezierCurveTo(245, 330, 320, 245, 354, 180);
      ctx.closePath();
      ctx.fill();
    }

    // =========================================================================
    // STAGE 5: 05. Velvet Chiaroscuro & Drapery Folds (Obsidian Veil Depth)
    // =========================================================================
    {
      const ctx = buffers[5].getContext('2d')!;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Deep Cylindrical Shadow Valleys along each Kalidar Pleat
      for (let i = 0; i < panelXTop.length - 1; i++) {
        const midTop = (panelXTop[i] + panelXTop[i + 1]) * 0.5;
        const midBot = (panelXBot[i] + panelXBot[i + 1]) * 0.5;

        const foldGrad = ctx.createLinearGradient(
          panelXBot[i],
          (waistY + hemY) * 0.5,
           panelXBot[i + 1],
          (waistY + hemY) * 0.5
        );
        foldGrad.addColorStop(0, 'rgba(48, 41, 42, 0.72)');
        foldGrad.addColorStop(0.45, 'rgba(48, 41, 42, 0.0)');
        foldGrad.addColorStop(1, 'rgba(48, 41, 42, 0.58)');

        ctx.fillStyle = foldGrad;
        ctx.beginPath();
        ctx.moveTo(panelXTop[i], waistY);
        ctx.lineTo(panelXBot[i], hemY);
        ctx.quadraticCurveTo(midBot, hemY + 18, panelXBot[i + 1], hemY);
        ctx.lineTo(panelXTop[i + 1], waistY);
        ctx.closePath();
        ctx.fill();

        // Central ridge velvet highlight
        ctx.strokeStyle = 'rgba(236, 231, 213, 0.14)';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(midTop, waistY + 15);
        ctx.lineTo(midBot, hemY - 25);
        ctx.stroke();
      }

      // Deep Royal Hem Border Velvet Band
      const borderGrad = ctx.createLinearGradient(0, hemY - 75, 0, hemY + 15);
      borderGrad.addColorStop(0, 'rgba(48, 41, 42, 0.75)');
      borderGrad.addColorStop(0.5, 'rgba(74, 20, 21, 0.88)');
      borderGrad.addColorStop(1, 'rgba(48, 41, 42, 0.92)');
      ctx.fillStyle = borderGrad;
      ctx.beginPath();
      ctx.moveTo(152, hemY - 68);
      ctx.quadraticCurveTo(CX, hemY - 46, 488, hemY - 68);
      ctx.lineTo(panelXBot[7], hemY);
      ctx.quadraticCurveTo(CX, hemY + 22, panelXBot[0], hemY);
      ctx.closePath();
      ctx.fill();

      // Hair & Facial Chiaroscuro (Obsidian Veil)
      ctx.fillStyle = '#30292a';
      ctx.beginPath();
      ctx.ellipse(CX, 72, 21, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(CX, 98, 26, Math.PI * 0.95, Math.PI * 2.05);
      ctx.fill();

      // Subtle Eyes, Brows & Crimson Lips
      ctx.strokeStyle = '#30292a';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(CX - 13, 108);
      ctx.quadraticCurveTo(CX - 8, 105, CX - 4, 108);
      ctx.moveTo(CX + 4, 108);
      ctx.quadraticCurveTo(CX + 8, 105, CX + 13, 108);
      ctx.stroke();

      ctx.fillStyle = '#a33533';
      ctx.beginPath();
      ctx.ellipse(CX, 128, 5, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // =========================================================================
    // STAGE 6: 06. Tactile Oil Pastel & Impasto Grain (Surface Texture)
    // =========================================================================
    {
      const ctx = buffers[6].getContext('2d')!;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Deterministic PRNG for oil pastel cross-contour strokes
      let seed = 409;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };

      const pastelColors = ['#c75b52', '#ece7d5', '#806055', '#a33533', '#d49a89'];

      // Cross-contour Banarasi silk pastel texture across skirt
      for (let s = 0; s < 520; s++) {
        const t = rand();
        const y = waistY + 15 + t * (hemY - waistY - 85);
        const halfSpread = 42 + t * 170;
        const x = CX + (rand() - 0.5) * 2 * halfSpread;

        ctx.strokeStyle = pastelColors[Math.floor(rand() * pastelColors.length)];
        ctx.globalAlpha = 0.14 + rand() * 0.18;
        ctx.lineWidth = 1.5 + rand() * 2.5;
        ctx.beginPath();
        ctx.moveTo(x - 8, y);
        ctx.quadraticCurveTo(x, y + 3, x + 8, y - 1);
        ctx.stroke();
      }

      // Soft Rose & Peach Oil Pastel Blush on Cheeks & Shoulders
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#c75b52';
      ctx.beginPath();
      ctx.arc(CX - 11, 118, 6, 0, Math.PI * 2);
      ctx.arc(CX + 11, 118, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }

    // =========================================================================
    // STAGE 7: 07. 24k Zardozi & Marodi Metallic Filigree (Gold Bullion)
    // =========================================================================
    {
      const ctx = buffers[7].getContext('2d')!;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Royal Kundan & 24k Gold Bridal Choker + Jhumka Earrings + Maang Tikka
      ctx.strokeStyle = '#d4af37';
      ctx.fillStyle = '#ece7d5';
      ctx.lineWidth = 2.2;

      // Maang Tikka on forehead
      ctx.beginPath();
      ctx.moveTo(CX, 82);
      ctx.lineTo(CX, 101);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(CX, 102, 3.2, 0, Math.PI * 2);
      ctx.fill();

      // Jhumka Earrings
      [-24, 24].forEach((dx) => {
        ctx.fillStyle = '#d4af37';
        ctx.beginPath();
        ctx.arc(CX + dx, 122, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ece7d5';
        ctx.beginPath();
        ctx.arc(CX + dx, 128, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Multi-strand Kundan Choker Necklace
      for (let row = 0; row < 3; row++) {
        const ny = 166 + row * 6;
        ctx.strokeStyle = row === 1 ? '#ece7d5' : '#d4af37';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(CX - 18 - row * 3, ny);
        ctx.quadraticCurveTo(CX, ny + 10, CX + 18 + row * 3, ny);
        ctx.stroke();
      }

      // Gold Zardozi Choli Embroidery & Waistband (Neffa)
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(277, waistY);
      ctx.quadraticCurveTo(CX, waistY + 8, 363, waistY);
      ctx.stroke();

      // Gold Kalidar Vertical Gota Patti Piping along all 8 seams
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.82)';
      for (let i = 0; i < panelXTop.length; i++) {
        ctx.beginPath();
        ctx.moveTo(panelXTop[i], waistY);
        const ctrlX = (panelXTop[i] + panelXBot[i]) * 0.5 + (i - 3.5) * 6;
        ctx.quadraticCurveTo(ctrlX, (waistY + hemY) * 0.52, panelXBot[i], hemY);
        ctx.stroke();
      }

      // Intricate 24k Zardozi Architectural Hem Border (Mihrab Arches & Floral Jaal)
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(152, hemY - 68);
      ctx.quadraticCurveTo(CX, hemY - 46, 488, hemY - 68);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(138, hemY - 8);
      ctx.quadraticCurveTo(CX, hemY + 14, 502, hemY - 8);
      ctx.stroke();

      // Gold Floral Motifs (Butis) along the Hem & Skirt Panels
      for (let i = 0; i < 14; i++) {
        const frac = (i + 0.5) / 14;
        const bx = 148 + frac * 344;
        const archOffset = Math.sin(frac * Math.PI) * 20;
        const by = hemY - 36 + archOffset;

        // Gold Mandala Rosette inside border
        ctx.fillStyle = '#d4af37';
        ctx.beginPath();
        ctx.arc(bx, by, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ece7d5';
        ctx.beginPath();
        ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Scattered Gold Zari Butis across the Skirt
      for (let row = 0; row < 5; row++) {
        const ry = waistY + 70 + row * 82;
        const spread = 55 + row * 28;
        const count = 4 + row;
        for (let k = 0; k < count; k++) {
          const kx = CX - spread + (k / Math.max(1, count - 1)) * (spread * 2);
          ctx.fillStyle = k % 2 === 0 ? '#d4af37' : '#ece7d5';
          ctx.beginPath();
          ctx.arc(kx, ry + (k % 2) * 8, 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // =========================================================================
    // STAGE 8: 08. Studio Atmospheric Glaze & Rim Light (Master Finish)
    // =========================================================================
    {
      const ctx = buffers[8].getContext('2d')!;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Editorial Studio Vignette Framing around outer perimeter
      const vigGrad = ctx.createRadialGradient(
        CX,
        410,
        210,
        CX,
        420,
        520
      );
      vigGrad.addColorStop(0, 'rgba(236, 231, 213, 0.0)');
      vigGrad.addColorStop(0.7, 'rgba(48, 41, 42, 0.18)');
      vigGrad.addColorStop(1, 'rgba(48, 41, 42, 0.52)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Warm Golden Runway Halo behind Head & Shoulders
      const haloGrad = ctx.createRadialGradient(CX, 155, 10, CX, 155, 165);
      haloGrad.addColorStop(0, 'rgba(236, 231, 213, 0.28)');
      haloGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.12)');
      haloGrad.addColorStop(1, 'rgba(212, 175, 55, 0.0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(CX, 155, 165, 0, Math.PI * 2);
      ctx.fill();

      // High-Fashion Specular Rim Light along Left Silhouette Edge
      ctx.strokeStyle = 'rgba(236, 231, 213, 0.78)';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(CX - 22, 95);
      ctx.quadraticCurveTo(CX - 21, 130, CX - 12, 142);
      ctx.moveTo(264, 182);
      ctx.lineTo(234, 244);
      ctx.moveTo(278, waistY);
      ctx.lineTo(136, hemY);
      ctx.stroke();

      // Luminous Gold Dust Bokeh Motes
      const motes = [
        [210, 140, 2.5],
        [425, 130, 3.0],
        [185, 290, 2.0],
        [445, 275, 2.8],
        [150, 480, 3.2],
        [485, 460, 2.4],
        [120, 660, 3.5],
        [515, 650, 2.8],
        [295, 610, 2.0],
        [355, 520, 2.2],
      ];
      motes.forEach(([mx, my, mr]) => {
        ctx.fillStyle = 'rgba(236, 231, 213, 0.85)';
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    stageBuffersRef.current = buffers;
  }, []);

  // Composite visible stages (1 .. activeStage) onto the Master 2D Registered Canvas
  useEffect(() => {
    const master = masterCanvasRef.current;
    if (!master) return;
    const ctx = master.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Subtle dark studio easel base if Stage 1 is hidden
    ctx.fillStyle = '#ece7d5';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    for (let i = 1; i <= 8; i++) {
      if (i <= activeStage && layerVisibility[i] && stageBuffersRef.current[i]) {
        ctx.save();
        // Authentic Procreate-calibrated composite operations
        if (i === 2 || i === 5) {
          ctx.globalCompositeOperation = 'multiply';
        } else {
          ctx.globalCompositeOperation = 'source-over';
        }
        ctx.drawImage(stageBuffersRef.current[i], 0, 0);
        ctx.restore();
      }
    }
  }, [activeStage, layerVisibility]);

  const activeLayerData =
    anatomyData.layers.find((l) => l.index === activeStage) || anatomyData.layers[7];

  const toggleLayer = (layerIdx: number) => {
    setLayerVisibility((prev) => ({
      ...prev,
      [layerIdx]: !prev[layerIdx],
    }));
  };

  const resetAllLayers = () => {
    setActiveStage(8);
    setLayerVisibility({
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
    });
  };

  const visibleCount = Object.entries(layerVisibility).filter(
    ([idx, vis]) => Number(idx) <= activeStage && vis
  ).length;

  return (
    <section
      id="anatomy-section"
      className="py-20 md:py-28 bg-[#837d75] text-[#ece7d5] relative overflow-hidden border-b border-[#30292a]/40 select-none"
    >
      {/* Subtle Atmospheric Studio Lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          background:
            'radial-gradient(circle at 30% 45%, rgba(163, 53, 51, 0.22) 0%, rgba(128, 96, 85, 0.28) 50%, rgba(48, 41, 42, 0.45) 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#ece7d5]/25 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-sans tracking-[0.24em] uppercase text-[#a33533] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{anatomyData.sectionKicker}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#ece7d5] tracking-tight">
              {anatomyData.sectionTitle}
            </h2>
            <p className="mt-3 text-sm sm:text-base font-sans text-[#ece7d5]/80 leading-relaxed">
              {anatomyData.sectionSubtitle}
            </p>
          </div>

          {/* Stage Counter & Reset Action (Unboxed Editorial Metadata + Clean Control) */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right font-mono text-xs text-[#ece7d5]/75">
              <div>STAGE 0{activeStage} / 08</div>
              <div className="text-[11px] text-[#ece7d5]/55">
                {visibleCount} Active Layers Composited
              </div>
            </div>
            <button
              type="button"
              onClick={resetAllLayers}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-sans uppercase tracking-wider bg-[#30292a] text-[#ece7d5] border border-[#ece7d5]/25 hover:border-[#a33533] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#a33533]" />
              <span>Reset All 8 Stages</span>
            </button>
          </div>
        </motion.div>

        {/* MAIN 2-COLUMN REGISTERED STUDIO WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Perfectly Aligned Square-Framed 2D Master Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[440px] bg-[#30292a] p-3 sm:p-4 border border-[#ece7d5]/30 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
              {/* Top Archival Registration Bar */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#ece7d5]/15 text-[11px] font-mono text-[#ece7d5]/70">
                <span>PROCREATE MASTER · {anatomyData.canvasSpecs.dimensions}</span>
                <span className="text-[#a33533] font-semibold">
                  STAGE 0{activeStage}
                </span>
              </div>

              {/* Strictly Aligned 2D Canvas Viewport (Zero Tilt / Zero Crookedness) */}
              <div className="relative w-full aspect-[640/840] bg-[#ece7d5] overflow-hidden border border-[#ece7d5]/25 group">
                {/* High-res rendered image from /public/images/8 stages */}
                {activeLayerData.imageUrl && (
                  <img
                    src={activeLayerData.imageUrl}
                    alt={activeLayerData.name}
                    className="absolute inset-0 w-full h-full object-cover select-none"
                  />
                )}
                <canvas
                  ref={masterCanvasRef}
                  width={CANVAS_W}
                  height={CANVAS_H}
                  className="block w-full h-full object-cover relative z-10"
                  style={{
                    opacity: Object.entries(layerVisibility).some(([idx, vis]) => Number(idx) <= activeStage && !vis) ? 1 : 0
                  }}
                />

                {/* Corner Registration Crosshairs */}
                <div className="pointer-events-none absolute inset-2 border border-[#30292a]/15 z-20" />

                {/* Live Color Palette Extractor on Hover */}
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <LiveColorPaletteOverlay
                    palette={activeLayerData.palette}
                    artworkTitle={activeLayerData.name}
                  />
                </div>
              </div>

              {/* Quick Prev / Next Stage Scrubber Bar Directly Under Canvas */}
              <div className="mt-3 pt-2.5 border-t border-[#ece7d5]/15 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={activeStage <= 1}
                  onClick={() => setActiveStage((s) => Math.max(1, s - 1))}
                  className="px-3 py-1.5 bg-[#806055]/40 hover:bg-[#a33533] disabled:opacity-30 disabled:pointer-events-none text-xs font-sans uppercase tracking-wider text-[#ece7d5] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev Stage</span>
                </button>

                <span className="text-xs font-serif italic text-[#ece7d5]/85 truncate">
                  {activeLayerData.shortLabel}
                </span>

                <button
                  type="button"
                  disabled={activeStage >= 8}
                  onClick={() => setActiveStage((s) => Math.min(8, s + 1))}
                  className="px-3 py-1.5 bg-[#806055]/40 hover:bg-[#a33533] disabled:opacity-30 disabled:pointer-events-none text-xs font-sans uppercase tracking-wider text-[#ece7d5] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Next Stage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Unboxed Archival Specs Metadata */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-[#ece7d5]/75">
              <span>{anatomyData.canvasSpecs.dimensions}</span>
              <span>·</span>
              <span>{anatomyData.canvasSpecs.resolution}</span>
              <span>·</span>
              <span>{anatomyData.canvasSpecs.colorSpace}</span>
            </div>
          </div>

          {/* RIGHT COLUMN: 8-Stage Interactive Scrubber, Inspector & Layer Toggles */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Interactive 8-Stage Progression Scrubber & Grid */}
            <div className="bg-[#30292a]/90 border border-[#ece7d5]/20 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <label
                  htmlFor="anatomy-stage-slider"
                  className="text-xs font-sans uppercase tracking-[0.2em] text-[#ece7d5]/80 flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5 text-[#a33533]" />
                  <span>Scrub Master Progression (Stages 01 – 08)</span>
                </label>
                <span className="text-xs font-mono text-[#ece7d5] tabular-nums">
                  {Math.round((activeStage / 8) * 100)}% Complete
                </span>
              </div>

              {/* Smooth Range Scrubber */}
              <input
                id="anatomy-stage-slider"
                type="range"
                min={1}
                max={8}
                step={1}
                value={activeStage}
                onChange={(e) => setActiveStage(Number(e.target.value))}
                className="w-full h-2 bg-[#837d75]/40 accent-[#a33533] cursor-pointer mb-5"
              />

              {/* 8 Stage Selector Buttons (4x2 Responsive Grid) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {anatomyData.layers.map((l) => {
                  const isCurrent = activeStage === l.index;
                  const isIncluded = l.index <= activeStage;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setActiveStage(l.index)}
                      className={`p-2.5 text-left border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#a33533] text-[#ece7d5] border-[#ece7d5] shadow-md'
                          : isIncluded
                          ? 'bg-[#806055]/45 text-[#ece7d5] border-[#ece7d5]/25 hover:border-[#ece7d5]'
                          : 'bg-[#30292a] text-[#ece7d5]/50 border-[#ece7d5]/10 hover:border-[#ece7d5]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span>STAGE {l.stageCode}</span>
                        <span
                          className="w-2.5 h-2.5 border border-[#ece7d5]/40"
                          style={{ backgroundColor: l.palette[0] }}
                        />
                      </div>
                      <div className="text-xs font-serif tracking-wide truncate mt-1">
                        {l.shortLabel}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Active Stage Technical Breakdown Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayerData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 bg-[#30292a] border-t-2 border-t-[#a33533] border-x border-b border-[#ece7d5]/20 space-y-4 shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#ece7d5]/75">
                  <span className="uppercase tracking-widest text-[#a33533] font-semibold">
                    {activeLayerData.category}
                  </span>
                  <span>
                    Blend: <strong className="text-[#ece7d5]">{activeLayerData.blendMode}</strong>
                    {' · '}
                    Opacity: <strong className="text-[#ece7d5]">{activeLayerData.opacity}%</strong>
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#ece7d5]">
                  {activeLayerData.name}
                </h3>

                <p className="font-sans text-sm text-[#ece7d5]/85 leading-relaxed">
                  {activeLayerData.description}
                </p>

                {/* Brush & Pigment Swatches Row */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-[#806055]/25 border border-[#ece7d5]/15">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#ece7d5]/60">
                      Calibrated Procreate Brush
                    </div>
                    <div className="text-sm font-serif text-[#ece7d5] mt-0.5">
                      {activeLayerData.brush}
                    </div>
                  </div>

                  <div className="p-3 bg-[#806055]/25 border border-[#ece7d5]/15 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ece7d5]/60">
                      Stage Pigments
                    </span>
                    <div className="flex items-center gap-1.5">
                      {activeLayerData.palette.map((hex) => (
                        <div
                          key={hex}
                          title={hex}
                          className="w-5 h-5 border border-[#ece7d5]/40"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vrinda's Atelier Technique Tip */}
                <div className="flex items-start gap-2.5 text-xs font-sans text-[#ece7d5]/90 pt-2 border-t border-[#ece7d5]/15">
                  <CheckCircle2 className="w-4 h-4 text-[#a33533] shrink-0 mt-0.5" />
                  <span>
                    <strong className="uppercase tracking-wider text-[#ece7d5]">
                      Atelier Note:{' '}
                    </strong>
                    {activeLayerData.techniqueTip}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 3. Individual Layer Visibility Toggles (1 to 8) */}
            <div className="bg-[#30292a]/80 border border-[#ece7d5]/20 p-5">
              <div className="flex items-center justify-between text-xs font-sans uppercase tracking-[0.18em] text-[#ece7d5]/80 mb-3">
                <span>Isolate or Mute Individual Layers (01 – 08)</span>
                <span className="font-mono text-[#ece7d5]/65 tabular-nums">
                  {visibleCount} / 8 Active
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {anatomyData.layers.map((l) => {
                  const isVisible = layerVisibility[l.index];
                  const isActiveInStage = l.index <= activeStage;
                  return (
                    <button
                      key={`vis-${l.id}`}
                      type="button"
                      onClick={() => toggleLayer(l.index)}
                      className={`px-3 py-2 border text-left flex items-center justify-between text-xs font-sans transition-colors cursor-pointer ${
                        isVisible && isActiveInStage
                          ? 'bg-[#806055]/35 border-[#ece7d5]/30 text-[#ece7d5]'
                          : 'bg-[#30292a] border-[#ece7d5]/10 text-[#ece7d5]/40'
                      }`}
                    >
                      <span className="truncate pr-1">
                        {l.stageCode}. {l.shortLabel}
                      </span>
                      {isVisible ? (
                        <Eye className="w-3.5 h-3.5 text-[#a33533] shrink-0" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
