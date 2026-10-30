#!/usr/bin/env python3
import os
import subprocess
import math
import random

W = 640
H = 840
CX = 320

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

C_PRIMARY = hex_to_rgb("ece7d5")     # Smoke whisper
C_BG = hex_to_rgb("837d75")          # Weathered steel
C_SECONDARY = hex_to_rgb("806055")   # Drystone clay
C_HIGHLIGHT = hex_to_rgb("a33533")   # Cindered red
C_OBSIDIAN = hex_to_rgb("30292a")    # Obsidian veil
C_GOLD = hex_to_rgb("d4af37")        # 24k Zardozi gold

class Canvas:
    def __init__(self, w, h, bg_color):
        self.w = w
        self.h = h
        self.pixels = bytearray(w * h * 3)
        for i in range(0, len(self.pixels), 3):
            self.pixels[i] = bg_color[0]
            self.pixels[i+1] = bg_color[1]
            self.pixels[i+2] = bg_color[2]

    def set_pixel(self, x, y, color, alpha=1.0):
        if 0 <= x < self.w and 0 <= y < self.h:
            idx = (y * self.w + x) * 3
            if alpha >= 1.0:
                self.pixels[idx] = color[0]
                self.pixels[idx+1] = color[1]
                self.pixels[idx+2] = color[2]
            else:
                inv = 1.0 - alpha
                self.pixels[idx] = int(self.pixels[idx] * inv + color[0] * alpha)
                self.pixels[idx+1] = int(self.pixels[idx+1] * inv + color[1] * alpha)
                self.pixels[idx+2] = int(self.pixels[idx+2] * inv + color[2] * alpha)

    def draw_line(self, x0, y0, x1, y1, color, alpha=1.0, thickness=1):
        dx = abs(x1 - x0)
        dy = abs(y1 - y0)
        sx = 1 if x0 < x1 else -1
        sy = 1 if y0 < y1 else -1
        err = dx - dy
        x, y = x0, y0
        while True:
            for tx in range(-thickness//2, thickness//2 + 1):
                for ty in range(-thickness//2, thickness//2 + 1):
                    self.set_pixel(x + tx, y + ty, color, alpha)
            if x == x1 and y == y1:
                break
            e2 = 2 * err
            if e2 > -dy:
                err -= dy
                x += sx
            if e2 < dx:
                err += dx
                y += sy

    def draw_circle(self, cx, cy, r, color, alpha=1.0, fill=True):
        for y in range(cy - r, cy + r + 1):
            for x in range(cx - r, cx + r + 1):
                d = math.hypot(x - cx, y - cy)
                if fill and d <= r:
                    self.set_pixel(x, y, color, alpha)
                elif not fill and abs(d - r) <= 1.0:
                    self.set_pixel(x, y, color, alpha)

    def draw_ellipse(self, cx, cy, rx, ry, color, alpha=1.0, fill=True):
        for y in range(cy - ry, cy + ry + 1):
            for x in range(cx - rx, cx + rx + 1):
                val = ((x - cx)**2) / (rx**2) + ((y - cy)**2) / (ry**2)
                if fill and val <= 1.0:
                    self.set_pixel(x, y, color, alpha)
                elif not fill and 0.85 <= val <= 1.15:
                    self.set_pixel(x, y, color, alpha)

    def add_paper_grain(self, strength=14):
        rng = random.Random(42)
        for i in range(0, len(self.pixels), 3):
            delta = rng.randint(-strength, strength)
            self.pixels[i] = max(0, min(255, self.pixels[i] + delta))
            self.pixels[i+1] = max(0, min(255, self.pixels[i+1] + delta))
            self.pixels[i+2] = max(0, min(255, self.pixels[i+2] + delta))

    def save_png(self, out_path):
        ppm_path = f"/tmp/{os.path.basename(out_path)}.ppm"
        with open(ppm_path, "wb") as f:
            header = f"P6\n{self.w} {self.h}\n255\n"
            f.write(header.encode())
            f.write(self.pixels)
        subprocess.run(["convert", ppm_path, out_path], check=True)
        if os.path.exists(ppm_path):
            os.remove(ppm_path)
        print(f"[OK] Rendered {out_path}")

# ==============================================================================
# 8 Registered Stage Renderers
# ==============================================================================

# STAGE 1: Croquis Grid & Anatomical Proportions
def render_stage_1():
    c = Canvas(W, H, C_PRIMARY)
    c.add_paper_grain(10)
    # 9 horizontal head guidelines
    head_ys = [120, 196, 272, 348, 424, 500, 576, 652, 728, 776]
    for y in head_ys:
        c.draw_line(40, y, W - 40, y, C_SECONDARY, alpha=0.35, thickness=1)
    # Plumb line
    c.draw_line(CX, 60, CX, 790, C_OBSIDIAN, alpha=0.5, thickness=1)
    # Shoulder tilt & hip cant
    c.draw_line(CX - 72, 190, CX + 72, 182, C_HIGHLIGHT, alpha=0.6, thickness=2)
    c.draw_line(CX - 56, 344, CX + 56, 354, C_HIGHLIGHT, alpha=0.6, thickness=2)
    # Croquis head oval
    c.draw_ellipse(CX, 140, 24, 34, C_OBSIDIAN, alpha=0.45, fill=False)
    # Spine gesture
    for t in range(0, 100):
        y = 174 + int(t * 1.7)
        x = CX + int(math.sin(t * 0.05) * 8)
        c.set_pixel(x, y, C_OBSIDIAN, alpha=0.65)
    # Skirt cage trapeze lines
    top_x = [278, 290, 302, 314, 326, 338, 350, 362]
    bot_x = [135, 188, 240, 293, 347, 400, 452, 505]
    for tx, bx in zip(top_x, bot_x):
        c.draw_line(tx, 292, bx, 776, C_SECONDARY, alpha=0.4, thickness=1)
    return c

# STAGE 2: Stage 1 + Ink Contour
def render_stage_2():
    c = render_stage_1()
    # Crisp calligraphic ink contour
    # Head & jawline
    c.draw_ellipse(CX, 140, 25, 35, C_OBSIDIAN, alpha=0.9, fill=False)
    c.draw_line(CX - 12, 148, CX + 12, 148, C_OBSIDIAN, alpha=0.85, thickness=2) # mouth
    # Neck & collarbones
    c.draw_line(CX - 8, 172, CX - 10, 202, C_OBSIDIAN, alpha=0.85, thickness=2)
    c.draw_line(CX + 8, 172, CX + 10, 202, C_OBSIDIAN, alpha=0.85, thickness=2)
    # Choli bodice contour
    c.draw_line(CX - 32, 215, CX + 32, 215, C_OBSIDIAN, alpha=0.9, thickness=2)
    c.draw_line(CX - 32, 215, CX - 22, 292, C_OBSIDIAN, alpha=0.9, thickness=2)
    c.draw_line(CX + 32, 215, CX + 22, 292, C_OBSIDIAN, alpha=0.9, thickness=2)
    c.draw_line(CX - 22, 292, CX + 22, 292, C_OBSIDIAN, alpha=0.9, thickness=2)
    # Lehenga outline pleats
    top_x = [278, 290, 302, 314, 326, 338, 350, 362]
    bot_x = [135, 188, 240, 293, 347, 400, 452, 505]
    for tx, bx in zip(top_x, bot_x):
        c.draw_line(tx, 292, bx, 776, C_OBSIDIAN, alpha=0.85, thickness=2)
    c.draw_line(bot_x[0], 776, bot_x[-1], 776, C_OBSIDIAN, alpha=0.9, thickness=3)
    return c

# STAGE 3: Stage 2 + Gouache Underpainting & Skin Planes
def render_stage_3():
    c = render_stage_2()
    # Warm drystone clay & gouache skin fill
    for y in range(125, 172):
        for x in range(CX - 22, CX + 23):
            if ((x - CX)**2)/(23**2) + ((y - 142)**2)/(32**2) <= 1.0:
                c.set_pixel(x, y, C_SECONDARY, alpha=0.45)
    # Torso underpainting
    for y in range(202, 292):
        span = int(18 + (y - 202) * 0.1)
        for x in range(CX - span, CX + span + 1):
            c.set_pixel(x, y, C_SECONDARY, alpha=0.35)
    return c

# STAGE 4: Stage 3 + Saturated Crimson Silk Base Blocking
def render_stage_4():
    c = render_stage_3()
    # Bodice fill
    for y in range(215, 292):
        span = int(28 - (y - 215) * 0.08)
        for x in range(CX - span, CX + span + 1):
            c.set_pixel(x, y, C_HIGHLIGHT, alpha=0.85)
    # Lehenga skirt fill
    for y in range(292, 776):
        t = (y - 292) / (776 - 292)
        left = int(278 * (1 - t) + 135 * t)
        right = int(362 * (1 - t) + 505 * t)
        for x in range(left, right + 1):
            # Rich crimson base with weathered steel undertone
            col = C_HIGHLIGHT if (x + y) % 6 != 0 else C_BG
            c.set_pixel(x, y, col, alpha=0.82)
    return c

# STAGE 5: Stage 4 + Velvet Chiaroscuro & Deep Pleat Folds
def render_stage_5():
    c = render_stage_4()
    # Obsidian shadow valleys between kalidar panels
    bot_x = [135, 188, 240, 293, 347, 400, 452, 505]
    top_x = [278, 290, 302, 314, 326, 338, 350, 362]
    for i in range(len(top_x)):
        tx = top_x[i]
        bx = bot_x[i]
        c.draw_line(tx, 292, bx, 776, C_OBSIDIAN, alpha=0.75, thickness=4)
        c.draw_line(tx + 2, 292, bx + 4, 776, C_OBSIDIAN, alpha=0.5, thickness=3)
    return c

# STAGE 6: Stage 5 + Tactile Oil Pastel & Impasto Grain
def render_stage_6():
    c = render_stage_5()
    rng = random.Random(108)
    # Textured directional chalk/pastel dabs across lehenga
    for _ in range(8000):
        y = rng.randint(295, 770)
        t = (y - 292) / (776 - 292)
        left = int(278 * (1 - t) + 140 * t)
        right = int(362 * (1 - t) + 500 * t)
        if left < right:
            x = rng.randint(left, right)
            col = C_PRIMARY if rng.random() > 0.4 else C_SECONDARY
            c.draw_circle(x, y, rng.randint(1, 3), col, alpha=0.35, fill=True)
    return c

# STAGE 7: Stage 6 + 24k Zardozi & Marodi Metallic Filigree
def render_stage_7():
    c = render_stage_6()
    # Gold border along lehenga hem
    bot_x = [135, 188, 240, 293, 347, 400, 452, 505]
    c.draw_line(bot_x[0], 765, bot_x[-1], 765, C_GOLD, alpha=0.9, thickness=5)
    c.draw_line(bot_x[0], 750, bot_x[-1], 750, C_GOLD, alpha=0.8, thickness=3)
    # Stippled gold jaal motifs
    rng = random.Random(777)
    for _ in range(3500):
        y = rng.randint(310, 755)
        t = (y - 292) / (776 - 292)
        left = int(278 * (1 - t) + 145 * t)
        right = int(362 * (1 - t) + 495 * t)
        if left < right:
            x = rng.randint(left, right)
            c.draw_circle(x, y, 1, C_GOLD, alpha=0.85, fill=True)
            if rng.random() > 0.8:
                c.draw_circle(x, y, 2, C_PRIMARY, alpha=0.95, fill=True)
    # Choker jewelry
    c.draw_line(CX - 16, 192, CX + 16, 192, C_GOLD, alpha=0.95, thickness=4)
    return c

# STAGE 8: Stage 7 + Studio Atmospheric Glaze & Rim Light
def render_stage_8():
    c = render_stage_7()
    # High-contrast rim light along edges
    for y in range(292, 776):
        t = (y - 292) / (776 - 292)
        left = int(278 * (1 - t) + 135 * t)
        right = int(362 * (1 - t) + 505 * t)
        c.set_pixel(left - 1, y, C_PRIMARY, alpha=0.75)
        c.set_pixel(left - 2, y, C_PRIMARY, alpha=0.45)
        c.set_pixel(right + 1, y, C_PRIMARY, alpha=0.75)
        c.set_pixel(right + 2, y, C_PRIMARY, alpha=0.45)
    # Golden ambient dust motes
    rng = random.Random(999)
    for _ in range(400):
        x = rng.randint(50, W - 50)
        y = rng.randint(50, H - 50)
        c.draw_circle(x, y, rng.randint(1, 3), C_PRIMARY, alpha=0.4, fill=True)
    return c

# Render and write all 8 stages
stages = [
    ("01-croquis-grid.png", render_stage_1),
    ("02-ink-contour.png", render_stage_2),
    ("03-underpainting.png", render_stage_3),
    ("04-silk-base.png", render_stage_4),
    ("05-chiaroscuro.png", render_stage_5),
    ("06-oil-pastel.png", render_stage_6),
    ("07-zardozi-embroidery.png", render_stage_7),
    ("08-studio-glaze.png", render_stage_8),
]

for filename, render_fn in stages:
    target = os.path.join("public/images/8 stages", filename)
    print(f"Rendering {target}...")
    canvas = render_fn()
    canvas.save_png(target)

print("All 8 stages rendered successfully.")
