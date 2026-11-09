import type { Config } from "tailwindcss";

// Business Nest design tokens (from the "Brand foundations" board in Claude Design).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827", // Nest Ink — text, dark buttons, footer
        cream: "#FFF8EF", // Shell Cream — page background
        hatch: "#FFE8D2", // Hatch Tint — hero background on workshop detail pages
        orange: { DEFAULT: "#F26A1B", accent: "#E4570A" }, // Hatch Orange — buttons, rings
        ember: "#C2410C", // orange text: eyebrows, links
        sky: { DEFAULT: "#1F44F0", tint: "#E8ECFF" }, // Sky Blue — flagship, stats, LinkedIn
        yolk: "#FFD84D", // Yolk Yellow — waiting list, accents on blue
        lime: "#D4F57A", // Sprout Lime — flagship / open
        amber: "#F59E0B", // decorative rings only
        sand: { DEFAULT: "#F0DFCB", dark: "#EBDDCB", photo: "#F3E3D0" }, // borders, dividers
        slate: "#374151", // body copy
        stone: "#4B5563", // captions
        peach: "#FDBA74",
        mute: "#E5E7EB", // past-edition badge
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.03em", eyebrow: "0.08em", badge: "0.06em" },
      borderRadius: { card: "28px", panel: "40px" },
      maxWidth: { page: "1320px", content: "1240px", band: "1160px" },
    },
  },
  plugins: [],
} satisfies Config;
