#!/usr/bin/env python3
import os
import subprocess
import urllib.request
import math
import random

os.makedirs("public/images/logo", exist_ok=True)
os.makedirs("public/images/8 stages", exist_ok=True)
os.makedirs("public/images/about us", exist_ok=True)
os.makedirs("public/images/gallery", exist_ok=True)
os.makedirs("public/images/student work", exist_ok=True)
os.makedirs("public/images/testimonials", exist_ok=True)
os.makedirs("public/images/digital media", exist_ok=True)

# 1. Download helpers for curated photography & art assets
def download_and_convert(url, dest_path, resize=None):
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 1000:
        print(f"[SKIP] {dest_path} already exists")
        return
    tmp_file = f"/tmp/{os.path.basename(dest_path)}.tmp"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp, open(tmp_file, 'wb') as out:
            out.write(resp.read())
        cmd = ["convert", tmp_file]
        if resize:
            cmd.extend(["-resize", resize])
        cmd.append(dest_path)
        subprocess.run(cmd, check=True)
        if os.path.exists(tmp_file):
            os.remove(tmp_file)
        print(f"[OK] Saved {dest_path}")
    except Exception as e:
        print(f"[ERROR] Failed to fetch {url} -> {dest_path}: {e}")

# 2. Gallery Artworks (Curated House of Kalakaar Pieces)
gallery_images = [
    ("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80", "public/images/gallery/01-banarasi-heritage-bride.png"),
    ("https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80", "public/images/gallery/02-nocturne-velvet-silhouette.png"),
    ("https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80", "public/images/gallery/03-saffron-sunkissed-portrait.png"),
    ("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80", "public/images/gallery/04-jaipur-archways-reverie.png"),
    ("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80", "public/images/gallery/05-whispering-organza-folds.png"),
    ("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80", "public/images/gallery/06-emerald-queen-regalia.png"),
    ("https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80", "public/images/gallery/07-atelier-canvas-study.png"),
    ("https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80", "public/images/gallery/08-crimson-silk-brocade.png"),
]

for url, dest in gallery_images:
    download_and_convert(url, dest, "1200x1600>")

# 3. Student Work
student_images = [
    ("https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80", "public/images/student work/01-ivory-raw-silk-croquis.png"),
    ("https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80", "public/images/student work/02-sunlight-shadow-portrait.png"),
    ("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80", "public/images/student work/03-floral-chiffon-anarkali.png"),
    ("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", "public/images/student work/04-gilded-zari-border-study.png"),
]

for url, dest in student_images:
    download_and_convert(url, dest, "800x1000>")

# 4. Testimonials
testimonial_images = [
    ("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80", "public/images/testimonials/01-tanvi-singhania.png"),
    ("https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80", "public/images/testimonials/02-devika-roy.png"),
    ("https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80", "public/images/testimonials/03-aditi-mathur.png"),
    ("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80", "public/images/testimonials/04-kavita-sundaram.png"),
]

for url, dest in testimonial_images:
    download_and_convert(url, dest, "400x400^")

# 5. About Us (Vrinda Haldia Portrait & Atelier Studies)
about_images = [
    ("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", "public/images/about us/01-vrinda-haldia-portrait.png"),
    ("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", "public/images/about us/02-draped-silk-reverie.png"),
    ("https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80", "public/images/about us/03-cinder-clay-gesture.png"),
    ("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80", "public/images/about us/04-terracotta-vessels.png"),
    ("https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80", "public/images/about us/05-chiaroscuro-muse.png"),
    ("https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80", "public/images/about us/06-artist-table.png"),
    ("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80", "public/images/about us/07-botanical-heirloom.png"),
]

for url, dest in about_images:
    download_and_convert(url, dest, "800x1000>")

# 6. Digital Media Cards
digital_media_images = [
    ("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=760&q=80", "public/images/digital media/01-couture-drape-study.png"),
    ("https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=760&q=80", "public/images/digital media/02-velvet-silhouette-editorial.png"),
    ("https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=760&q=80", "public/images/digital media/03-haute-couture-gold-zardozi.png"),
    ("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=760&q=80", "public/images/digital media/04-heritage-mughal-tapestry.png"),
    ("https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=760&q=80", "public/images/digital media/05-abstract-cinder-clay.png"),
    ("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=760&q=80", "public/images/digital media/06-terracotta-still-life.png"),
]

for url, dest in digital_media_images:
    download_and_convert(url, dest, "760x520^")

print("All photo and digital media images prepared.")
