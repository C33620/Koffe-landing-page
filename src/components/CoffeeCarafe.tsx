import { useEffect, useState } from "react";

interface CoffeeCarafeProps {
  onNavbarHit: (isHit: boolean) => void;
  onHeroFreeze: (freeze: boolean) => void;
  onButtonHit?: (fillLevel: number) => void;
}

export default function CoffeeCarafe({
  onNavbarHit,
  onHeroFreeze,
  onButtonHit,
}: CoffeeCarafeProps) {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      const maxScroll = 800;
      const progress = Math.min(scrolled / maxScroll, 1);

      setAnimationProgress(Math.min(progress * 1.5, 1));
      setScrollProgress(Math.max((scrolled - 400) / 400, 0));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tiltPhase = Math.min(animationProgress / 0.6, 1);
  const fillPhase = Math.min(animationProgress / 0.8, 1);

  const tiltAngle = -tiltPhase * 45;

  const initialFillHeight = fillPhase * 25;
  const scrollFillHeight = 25 + scrollProgress * 75;
  const fillHeight =
    animationProgress >= 1 ? scrollFillHeight : initialFillHeight;

  const navbarHit = fillHeight >= 92;
  const heroFrozen = fillHeight < 100;

  useEffect(() => {
    onNavbarHit(navbarHit);
  }, [navbarHit, onNavbarHit]);

  useEffect(() => {
    onHeroFreeze(heroFrozen);
  }, [heroFrozen, onHeroFreeze]);

  useEffect(() => {
    onButtonHit?.(fillHeight);
  }, [fillHeight, onButtonHit]);

  return (
    <div className="[@media(max-width:530px)_and_(max-height:760px)]:hidden">
      <div
        className="fixed top-24 right-8 md:right-12 pointer-events-none"
        style={{ zIndex: 15 }}
      >
        <svg width="160" height="200" viewBox="0 0 160 200">
          <ellipse
            cx="80"
            cy="178"
            rx="52"
            ry="9"
            fill="#261D0D"
            opacity="0.1"
          />
        </svg>
      </div>

      <div
        className="fixed top-24 right-8 md:right-12 pointer-events-none"
        style={{
          zIndex: 15,
          transform: `rotate(${tiltAngle}deg)`,
          transformOrigin: "30% 60%",
        }}
      >
        <svg
          width="160"
          height="200"
          viewBox="0 0 160 200"
          className="drop-shadow-lg"
        >
          <defs>
            <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8DCC8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#F5EFE6" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#E8DCC8" stopOpacity="0.9" />
            </linearGradient>
            <pattern
              id="seigaihaWave"
              x="0"
              y="0"
              width="24"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 6 Q6 3 12 6 T24 6"
                fill="none"
                stroke="#261D0D"
                strokeWidth="0.8"
                opacity="0.2"
              />
            </pattern>
          </defs>

          <path
            d="M 48 58 C 44 68 42 80 40 95 C 40 115 40 135 42 150 C 44 162 48 170 54 174 L 106 174 C 112 170 116 162 118 150 C 120 135 120 115 120 95 C 118 80 116 68 112 58 Z"
            fill="url(#glassBody)"
            stroke="#261D0D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          <path
            d={`M 44 ${105 - tiltPhase * 25} C 44 ${125 - tiltPhase * 20} 44 ${140 - tiltPhase * 15} 46 152 C 48 164 51 171 56 173 L 104 173 C 109 171 112 164 114 152 C 116 ${140 + tiltPhase * 15} 116 ${125 + tiltPhase * 20} 116 ${105 + tiltPhase * 25} Z`}
            fill="#4E342E"
            opacity="0.6"
          />

          <ellipse
            cx="80"
            cy={90 + tiltPhase * 5}
            rx="37"
            ry="12"
            fill="url(#seigaihaWave)"
            opacity="0.6"
            transform={`rotate(${tiltAngle * -0.8} 80 90)`}
          />

          <path
            d="M 52 70 C 53 85 54 100 55 120"
            stroke="#FFFCF5"
            strokeWidth="2"
            opacity="0.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 108 70 C 107 85 106 100 105 120"
            stroke="#FFFCF5"
            strokeWidth="1.5"
            opacity="0.3"
            fill="none"
            strokeLinecap="round"
          />

          <ellipse
            cx="80"
            cy="58"
            rx="32"
            ry="4"
            fill="#E8DCC8"
            stroke="#261D0D"
            strokeWidth="2"
          />

          <ellipse
            cx="80"
            cy="55"
            rx="34"
            ry="7"
            fill="#261D0D"
            opacity="0.85"
          />
          <ellipse cx="80" cy="52" rx="34" ry="5" fill="#1a1410" />
          <ellipse cx="80" cy="48" rx="26" ry="4" fill="#2d2520" />

          <path
            d="M 40 78 C 30 80 22 82 16 85 C 14 86 13 88 13 90 C 13 92 14 94 16 95 C 22 98 30 100 38 98 L 42 88 Z"
            fill="url(#glassBody)"
            fillOpacity="1"
            stroke="#261D0D"
            strokeWidth="2.5"
            strokeLinejoin="round"
            opacity="1"
          />

          <path
            d="M 120 68 L 132 72 Q 142 76 142 90 Q 142 104 132 108 L 120 112 L 120 108 L 130 105 Q 136 102 136 90 Q 136 78 130 75 L 120 72 Z"
            fill="#261D0D"
            opacity="0.9"
            stroke="#1a1410"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path
            d="M 122 74 L 130 77 Q 134 79 134 90 Q 134 101 130 103 L 122 106"
            fill="none"
            stroke="#4a403a"
            strokeWidth="1.5"
            opacity="0.5"
          />

          <path
            d={`M 44 ${105 + tiltPhase * 50} C 44 ${120 + tiltPhase * 35} 44 ${135 + tiltPhase * 25} 46 152 C 48 164 51 171 56 173 L 104 173 C 109 171 112 164 114 152 C 116 ${135 + tiltPhase * 25} 116 ${120 + tiltPhase * 35} 116 ${105 + tiltPhase * 50} Z`}
            fill="url(#coffeeGradient)"
          />
        </svg>
      </div>

      {tiltPhase > 0.1 && (
        <div
          className="fixed top-24 right-8 md:right-12 pointer-events-none"
          style={{ zIndex: 12 }}
        >
          <svg
            width="160"
            height="600"
            viewBox="0 0 160 600"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient
                id="pourGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3E2723" stopOpacity="1" />
                <stop offset="50%" stopColor="#3E2723" stopOpacity="1" />
                <stop offset="100%" stopColor="#3E2723" stopOpacity="1" />
              </linearGradient>
            </defs>

            <path
              d={`M 16 ${105 - tiltPhase * 10} Q 12 ${165 + tiltPhase * 100} 10 ${265 + tiltPhase * 150} T 6 ${415 + tiltPhase * 200}`}
              fill="none"
              stroke="url(#pourGradient)"
              strokeWidth={6 + tiltPhase * 4}
              strokeLinecap="round"
              opacity={Math.min(tiltPhase * 2, 0.9)}
            />
            <path
              d={`M 14 ${105 - tiltPhase * 10} Q 10 ${170 + tiltPhase * 105} 8 ${270 + tiltPhase * 155} T 4 ${420 + tiltPhase * 205}`}
              fill="none"
              stroke="url(#pourGradient)"
              strokeWidth={4 + tiltPhase * 2}
              strokeLinecap="round"
              opacity={Math.min(tiltPhase * 1.5, 0.7)}
            />
          </svg>
        </div>
      )}

      <div
        className="fixed bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: `${fillHeight}vh`,
          opacity: fillPhase > 0.05 || scrollProgress > 0 ? 1 : 0,
          zIndex: 20,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#3E2723",
            opacity: 1,
            zIndex: 19,
          }}
        />

        <svg
          className="absolute left-0 right-0 w-full"
          style={{
            top: "-40px",
            height: "100px",
            zIndex: 31,
          }}
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5D4037" stopOpacity="1" />
              <stop offset="100%" stopColor="#3E2723" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0 40 Q150 20 300 40 T600 40 T900 40 T1200 40 L1200 100 L0 100 Z"
            fill="url(#waveGradient)"
            opacity="1"
            style={{
              animation:
                fillPhase > 0.3 || scrollProgress > 0
                  ? "wave 4s ease-in-out infinite"
                  : "none",
            }}
          />
          <path
            d="M0 45 Q150 28 300 45 T600 45 T900 45 T1200 45 L1200 100 L0 100 Z"
            fill="#3E2723"
            opacity="1"
            style={{
              animation:
                fillPhase > 0.3 || scrollProgress > 0
                  ? "wave 5s ease-in-out infinite reverse"
                  : "none",
            }}
          />
        </svg>

        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to top, transparent 0%, rgba(93, 64, 55, 0.15) 60%, transparent 100%)",
            filter: "blur(20px)",
            opacity: fillPhase > 0.4 || scrollProgress > 0.2 ? 0.5 : 0,
            transition: "opacity 0.8s ease-out",
            zIndex: 32,
          }}
        />
      </div>
    </div>
  );
}
