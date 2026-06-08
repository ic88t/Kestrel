import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#F4F1EC",
        brass: "#9A8868",
        smoke: "#1A1A1A",
        mist: "#E8E3DB",
        stone: "#8A857C",
        forest: "#1a3a2a",
        "forest-dark": "#122a1e",
        "forest-light": "#2d5a40",
        sage: "#7a9a7a",
        cream: "#f5f5f0"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        tightest: "-0.04em",
        wider: "0.08em",
        widest: "0.2em"
      },
      transitionTimingFunction: {
        kestrel: "cubic-bezier(0.65, 0, 0.35, 1)",
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "mask-reveal": {
          "0%": { clipPath: "inset(0 0 100% 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.9s var(--ease-kestrel) forwards",
        "mask-reveal": "mask-reveal 1.1s var(--ease-kestrel) forwards",
        marquee: "marquee 40s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
