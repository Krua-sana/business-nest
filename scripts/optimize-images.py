"""Create web-sized copies of heavy photos in public/images/web/.

Run from the project folder:  python3 scripts/optimize-images.py
Needs Pillow (pip install pillow). Safe to re-run; it overwrites the web copies.
Add a line to JOBS when you add a new big photo.
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
# Big originals live in image-sources/ (not published); older ones may still be in public/.
SOURCES = [ROOT / "image-sources", PUBLIC]

# (source inside image-sources/ or public/, output inside public/images/web/, max width)
JOBS = [
    ("images/March workshop Layoff to Income Strategy.png", "financial-lab-poster.jpg", 1200),
    ("images/AI as Co-Creator-cover.png", "ai-co-creator-poster.jpg", 1200),
    # ai-co-creator-cover.jpg/.mp4 were made from images/ai-workshop-cover.gif with ffmpeg:
    # ffmpeg -i ai-workshop-cover.gif -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart -an ai-co-creator-cover.mp4
    ("images/QA_160126.jpg", "qa-talk.jpg", 1200),
    ("lovable-uploads/Kateryna-Saprunova.jpg", "Kateryna-Saprunova.jpg", 600),
    ("lovable-uploads/Dilip-Kumar-Mulluri.png", "Dilip-Kumar-Mulluri.jpg", 600),
    ("images/Iryna Digtiarova.png", "Iryna-Digtiarova.jpg", 300),
    ("images/Upiek Riptoningrum.jpg", "Upiek-Riptoningrum.jpg", 300),
    ("images/Zoe Prifti.jpeg", "Zoe-Prifti.jpg", 300),
] + [(f"images/g{i}.jpeg", f"gallery/g{i}.jpg", 1600) for i in range(1, 17)] + [
    (f"images/image{i}.jpeg", f"gallery/image{i}.jpg", 1600) for i in (5, 12, 13, 20, 21, 23)
]


def main() -> None:
    for src, out, width in JOBS:
        src_path = next((d / src for d in SOURCES if (d / src).exists()), PUBLIC / src)
        out_path = PUBLIC / "images" / "web" / out
        if not src_path.exists():
            print(f"skip (missing): {src}")
            continue
        out_path.parent.mkdir(parents=True, exist_ok=True)
        im = ImageOps.exif_transpose(Image.open(src_path))
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGBA")
            bg = Image.new("RGB", im.size, (255, 255, 255))
            bg.paste(im, mask=im.split()[-1])
            im = bg
        else:
            im = im.convert("RGB")
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        im.save(out_path, "JPEG", quality=82, optimize=True, progressive=True)
        print(f"{out}: {out_path.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
