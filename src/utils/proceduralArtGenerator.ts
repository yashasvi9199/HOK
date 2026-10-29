// High-resolution procedural Oil Pastel, Digital Art, and Dripping Paint Canvas Generator
// Produces authentic tactile impasto oil-pastel textures and viscous dripping paint data URLs.

export type PastelSubject =
  | 'illustration_drape'
  | 'composition_abstract'
  | 'stilllife_vessels'
  | 'illustration_portrait'
  | 'composition_atelier'
  | 'stilllife_botanical'
  | 'digital_couture_1'
  | 'digital_couture_2'
  | 'digital_editorial_3'
  | 'digital_velvet_4'
  | 'digital_heritage_5'
  | 'digital_glaze_6';

const cache = new Map<string, string>();

// Seeded pseudo-random generator for deterministic artistic strokes
function createRng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Helper to draw an oil pastel chalk/impasto stroke
function drawPastelStroke(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  thickness: number,
  color: string,
  rng: () => number,
  opacity = 0.85
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const steps = Math.max(8, Math.floor(dist / 3));

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x1 + (x2 - x1) * t + (rng() - 0.5) * thickness * 0.35;
    const y = y1 + (y2 - y1) * t + (rng() - 0.5) * thickness * 0.35;
    const r = (thickness * 0.5) * (0.65 + rng() * 0.6);

    ctx.beginPath();
    ctx.ellipse(
      x,
      y,
      r,
      r * (0.45 + rng() * 0.4),
      rng() * Math.PI,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  ctx.restore();
}

// Helper to add cold-pressed paper tooth & oil pastel grain
function applyPastelPaperGrain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rng: () => number
) {
  ctx.save();
  // Warm linen paper tooth speckles
  for (let i = 0; i < 1800; i++) {
    const x = rng() * w;
    const y = rng() * h;
    const size = 0.8 + rng() * 2.2;
    ctx.fillStyle = rng() > 0.5 ? 'rgba(236, 231, 213, 0.14)' : 'rgba(48, 41, 42, 0.14)';
    ctx.fillRect(x, y, size, size);
  }
  ctx.restore();
}

export function generateOilPastelArtwork(
  subject: PastelSubject,
  width = 800,
  height = 800
): string {
  const key = `${subject}_${width}x${height}`;
  if (cache.has(key)) return cache.get(key)!;

  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const seedMap: Record<PastelSubject, number> = {
    illustration_drape: 101,
    composition_abstract: 202,
    stilllife_vessels: 303,
    illustration_portrait: 404,
    composition_atelier: 505,
    stilllife_botanical: 606,
    digital_couture_1: 707,
    digital_couture_2: 808,
    digital_editorial_3: 909,
    digital_velvet_4: 1010,
    digital_heritage_5: 1111,
    digital_glaze_6: 1212,
  };

  const rng = createRng(seedMap[subject] || 1337);

  // Base background tone
  const bgGradients: Record<PastelSubject, [string, string]> = {
    illustration_drape: ['#30292a', '#806055'],
    composition_abstract: ['#806055', '#30292a'],
    stilllife_vessels: ['#837d75', '#30292a'],
    illustration_portrait: ['#30292a', '#5a3a36'],
    composition_atelier: ['#5c4740', '#30292a'],
    stilllife_botanical: ['#30292a', '#6d544b'],
    digital_couture_1: ['#241e1f', '#806055'],
    digital_couture_2: ['#30292a', '#a33533'],
    digital_editorial_3: ['#4a443f', '#30292a'],
    digital_velvet_4: ['#30292a', '#6e2322'],
    digital_heritage_5: ['#806055', '#2a2324'],
    digital_glaze_6: ['#3b3334', '#837d75'],
  };

  const [c1, c2] = bgGradients[subject];
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Background oil pastel cross-hatching washes
  const palette = ['#ece7d5', '#806055', '#a33533', '#837d75', '#d4b483', '#30292a', '#c97b63'];
  for (let i = 0; i < 65; i++) {
    const sx = rng() * width;
    const sy = rng() * height;
    const angle = (rng() - 0.5) * 1.2;
    const len = 80 + rng() * 180;
    const col = palette[Math.floor(rng() * palette.length)];
    drawPastelStroke(
      ctx,
      sx,
      sy,
      sx + Math.cos(angle) * len,
      sy + Math.sin(angle) * len,
      18 + rng() * 34,
      col,
      rng,
      0.22
    );
  }

  // Subject-specific oil pastel composition
  if (subject === 'illustration_drape' || subject === 'digital_couture_1' || subject === 'digital_velvet_4') {
    // High-fashion couture muse silhouette in draped oil pastel saree / gown
    const cx = width * 0.52;
    const cy = height * 0.5;

    // Radiant halo in smoke whisper & ochre
    for (let r = 180; r > 30; r -= 18) {
      drawPastelStroke(ctx, cx - r, cy - r * 0.8, cx + r, cy - r * 0.6, 26, '#ece7d5', rng, 0.18);
    }

    // Flowing couture skirt/saree folds in cindered red & drystone clay
    for (let i = 0; i < 32; i++) {
      const spread = (i / 31 - 0.5) * width * 0.65;
      drawPastelStroke(
        ctx,
        cx + spread * 0.2,
        height * 0.36,
        cx + spread,
        height * 0.95,
        24 + rng() * 18,
        i % 3 === 0 ? '#a33533' : i % 2 === 0 ? '#ece7d5' : '#d4b483',
        rng,
        0.78
      );
    }

    // Sculpted bodice & shoulders
    drawPastelStroke(ctx, cx - 55, height * 0.28, cx + 55, height * 0.28, 30, '#a33533', rng, 0.92);
    drawPastelStroke(ctx, cx, height * 0.25, cx, height * 0.42, 42, '#806055', rng, 0.9);
    // Head & regal bun
    ctx.save();
    ctx.fillStyle = '#30292a';
    ctx.beginPath();
    ctx.arc(cx, height * 0.18, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    drawPastelStroke(ctx, cx - 22, height * 0.14, cx + 25, height * 0.16, 16, '#d4b483', rng, 0.9);
  } else if (subject === 'stilllife_vessels' || subject === 'stilllife_botanical' || subject === 'digital_heritage_5') {
    // Still life with ceramic vessels, pomegranates & dried botanicals
    // Tablecloth horizon
    drawPastelStroke(ctx, 0, height * 0.68, width, height * 0.64, 90, '#ece7d5', rng, 0.65);
    drawPastelStroke(ctx, 0, height * 0.78, width, height * 0.82, 110, '#806055', rng, 0.75);

    // Tall terracotta vessel
    for (let y = height * 0.3; y < height * 0.72; y += 14) {
      const curve = Math.sin(((y - height * 0.3) / (height * 0.42)) * Math.PI) * 55;
      drawPastelStroke(
        ctx,
        width * 0.45 - 40 - curve,
        y,
        width * 0.45 + 40 + curve,
        y,
        20,
        y % 28 < 14 ? '#a33533' : '#806055',
        rng,
        0.88
      );
    }

    // Botanical stems & pastel blooms
    const stems = [
      [width * 0.32, height * 0.14],
      [width * 0.48, height * 0.1],
      [width * 0.62, height * 0.18],
      [width * 0.28, height * 0.24],
    ];
    stems.forEach(([bx, by], idx) => {
      drawPastelStroke(ctx, width * 0.45, height * 0.32, bx, by, 8, '#30292a', rng, 0.85);
      drawPastelStroke(
        ctx,
        bx - 24,
        by - 15,
        bx + 24,
        by + 15,
        34,
        idx % 2 === 0 ? '#ece7d5' : '#a33533',
        rng,
        0.92
      );
      drawPastelStroke(ctx, bx - 10, by, bx + 12, by - 10, 18, '#d4b483', rng, 0.85);
    });

    // Still life fruit / bowls on right
    drawPastelStroke(ctx, width * 0.66, height * 0.66, width * 0.78, height * 0.67, 48, '#a33533', rng, 0.92);
    drawPastelStroke(ctx, width * 0.68, height * 0.64, width * 0.74, height * 0.64, 22, '#ece7d5', rng, 0.75);
  } else if (subject === 'illustration_portrait' || subject === 'digital_glaze_6' || subject === 'digital_couture_2') {
    // Expressive oil pastel portrait study
    const cx = width * 0.5;
    const cy = height * 0.48;

    // Dramatic background aura
    drawPastelStroke(ctx, cx - 160, cy - 140, cx + 160, cy + 120, 95, '#a33533', rng, 0.45);
    drawPastelStroke(ctx, cx + 120, cy - 160, cx - 140, cy + 140, 85, '#ece7d5', rng, 0.35);

    // Face & neck contours in warm pastel layers
    for (let y = cy - 110; y <= cy + 90; y += 14) {
      const halfW = Math.max(18, Math.sin(((y - (cy - 110)) / 200) * Math.PI) * 95);
      drawPastelStroke(ctx, cx - halfW, y, cx + halfW * 0.3, y, 22, '#d4b483', rng, 0.88);
      drawPastelStroke(ctx, cx - halfW * 0.1, y, cx + halfW, y, 22, '#806055', rng, 0.88);
    }

    // Highlight on nose bridge & cheekbone in smoke whisper
    drawPastelStroke(ctx, cx - 8, cy - 55, cx - 4, cy + 15, 16, '#ece7d5', rng, 0.92);
    drawPastelStroke(ctx, cx - 65, cy - 10, cx - 20, cy + 10, 20, '#ece7d5', rng, 0.75);

    // Expressive lips in cindered red
    drawPastelStroke(ctx, cx - 28, cy + 48, cx + 28, cy + 48, 18, '#a33533', rng, 0.95);

    // Sweeping dark hair strokes
    for (let i = 0; i < 16; i++) {
      drawPastelStroke(
        ctx,
        cx - 110 + i * 14,
        cy - 130,
        cx - 140 + (i % 2 === 0 ? -30 : 160),
        cy + 120,
        26,
        '#30292a',
        rng,
        0.85
      );
    }
  } else {
    // Composition abstract / atelier moodboard
    // Layered geometric & organic oil pastel blocks
    drawPastelStroke(ctx, width * 0.15, height * 0.25, width * 0.75, height * 0.22, 85, '#ece7d5', rng, 0.82);
    drawPastelStroke(ctx, width * 0.25, height * 0.55, width * 0.85, height * 0.52, 95, '#a33533', rng, 0.85);
    drawPastelStroke(ctx, width * 0.18, height * 0.78, width * 0.72, height * 0.76, 75, '#806055', rng, 0.88);

    // Intersecting figure / gesture arches
    for (let a = 0; a < Math.PI; a += 0.15) {
      const x = width * 0.5 + Math.cos(a) * (width * 0.28);
      const y = height * 0.55 - Math.sin(a) * (height * 0.32);
      drawPastelStroke(ctx, width * 0.5, height * 0.65, x, y, 22, '#30292a', rng, 0.72);
    }
    drawPastelStroke(ctx, width * 0.35, height * 0.38, width * 0.65, height * 0.38, 38, '#d4b483', rng, 0.9);
  }

  // Final oil pastel impasto highlights & paper grain
  applyPastelPaperGrain(ctx, width, height, rng);

  // Subtle inner gallery vignette
  const rad = ctx.createRadialGradient(
    width * 0.5,
    height * 0.5,
    width * 0.25,
    width * 0.5,
    height * 0.5,
    width * 0.75
  );
  rad.addColorStop(0, 'rgba(0,0,0,0)');
  rad.addColorStop(1, 'rgba(48,41,42,0.32)');
  ctx.fillStyle = rad;
  ctx.fillRect(0, 0, width, height);

  const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
  cache.set(key, dataUrl);
  return dataUrl;
}

// Generates a viscous, high-contrast dripping paint background image for Section 2.02 Digital Media
export function generateDrippingPaintBackground(width = 1200, height = 800): string {
  const key = `dripping_paint_${width}x${height}`;
  if (cache.has(key)) return cache.get(key)!;
  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const rng = createRng(98765);

  // Deep obsidian veil base
  ctx.fillStyle = '#30292a';
  ctx.fillRect(0, 0, width, height);

  // Layered dripping paint curtains in global palette colors
  const dripLayers = [
    { color: '#837d75', maxLen: 0.92, count: 38 }, // Weathered steel
    { color: '#806055', maxLen: 0.82, count: 42 }, // Drystone clay
    { color: '#ece7d5', maxLen: 0.68, count: 34 }, // Smoke whisper
    { color: '#a33533', maxLen: 0.88, count: 48 }, // Cindered red
    { color: '#1e1819', maxLen: 0.45, count: 30 }, // Deep glossy ink
  ];

  dripLayers.forEach((layer) => {
    ctx.save();
    ctx.fillStyle = layer.color;

    // Top reservoir wave
    ctx.fillRect(0, 0, width, height * 0.08);

    for (let i = 0; i < layer.count; i++) {
      const x = (i / layer.count) * width + (rng() - 0.5) * (width / layer.count);
      const dripWidth = 8 + rng() * 26;
      const dripHeight = height * (0.12 + rng() * layer.maxLen);

      // Vertical stream
      ctx.beginPath();
      ctx.moveTo(x - dripWidth * 0.5, 0);
      ctx.quadraticCurveTo(
        x - dripWidth * 0.35,
        dripHeight * 0.6,
        x - dripWidth * 0.42,
        dripHeight - dripWidth
      );
      // Bulbous droplet tip at bottom
      ctx.arc(x, dripHeight - dripWidth * 0.5, dripWidth * 0.58, Math.PI, 0, true);
      ctx.quadraticCurveTo(
        x + dripWidth * 0.35,
        dripHeight * 0.6,
        x + dripWidth * 0.5,
        0
      );
      ctx.closePath();
      ctx.fill();

      // Glossy specular highlight on wet paint drip
      ctx.fillStyle = 'rgba(236, 231, 213, 0.22)';
      ctx.beginPath();
      ctx.ellipse(
        x - dripWidth * 0.18,
        dripHeight - dripWidth * 0.55,
        Math.max(1.5, dripWidth * 0.12),
        Math.max(4, dripWidth * 0.35),
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.fillStyle = layer.color;

      // Occasional detached falling paint bead
      if (rng() > 0.62 && dripHeight < height * 0.85) {
        const dropY = dripHeight + 12 + rng() * 38;
        const dropR = 3 + rng() * 6;
        ctx.beginPath();
        ctx.arc(x, dropY, dropR, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  });

  const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
  cache.set(key, dataUrl);
  return dataUrl;
}
