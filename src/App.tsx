import { useEffect, useState } from "react"; // ← add useEffect to your existing import
import CoffeeCarafe from "./components/CoffeeCarafe";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import WaitlistButton from "./components/WaitlistButton";
import WaitlistModal from "./components/WaitlistModal";

export default function App() {
  const [navbarInCoffee, setNavbarInCoffee] = useState(false);
  const [heroFixed, setHeroFixed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonFillLevel, setButtonFillLevel] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true); // ← add this

  // ── fade out on scroll ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setShowScrollHint(window.scrollY < 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFCF5] antialiased relative flex flex-col">
      <main className="flex-1">
        <Navbar inCoffee={navbarInCoffee} />

        <CoffeeCarafe
          onNavbarHit={setNavbarInCoffee}
          onHeroFreeze={setHeroFixed}
          onButtonHit={setButtonFillLevel}
        />

        <Hero isFixed={heroFixed} buttonInCoffee={buttonFillLevel >= 1} />
        <WaitlistButton
          buttonFillLevel={buttonFillLevel}
          isHeroFixed={heroFixed}
          onClick={() => setIsModalOpen(true)}
        />

        <WaitlistModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* ── "scroll to pour" label — sits just below the WaitlistButton ── */}

        <p
          aria-hidden="true"
          className="[@media(max-width:530px)_and_(max-height:760px)]:hidden"
          style={{
            position: "fixed",
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 58px)",
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(38, 29, 13, 0.45)",
            pointerEvents: "none",
            zIndex: 9999,
            opacity: showScrollHint ? 1 : 0,
            transition: "opacity 500ms ease-out",
            animation: showScrollHint
              ? "scrollHintFloat 2.5s ease-in-out infinite"
              : "none",
          }}
        >
          scroll to pour
        </p>

        <style>{`
        @keyframes scrollHintFloat {
          0%, 100% { opacity: 0.5; transform: translateY(0px); }
          50%       { opacity: 1;   transform: translateY(-4px); }
        }
      `}</style>

        {/* Spacer to allow brown background to scroll into view */}
        {heroFixed && <div className="min-h-[85vh]" />}
        <div className="relative bg-[#3E2723] min-h-screen z-30">
          {/* Wave at the top of brown section */}
          <svg
            className="absolute left-0 right-0 w-full"
            style={{ top: "-60px", height: "120px", zIndex: 31 }}
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="waveGradientPermanent"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#5D4037" stopOpacity="1" />
                <stop offset="100%" stopColor="#3E2723" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M0 40 Q150 20 300 40 T600 40 T900 40 T1200 40 L1200 100 L0 100 Z"
              fill="url(#waveGradientPermanent)"
              opacity="1"
              style={{ animation: "wave 4s ease-in-out infinite" }}
            />
            <path
              d="M0 45 Q150 28 300 45 T600 45 T900 45 T1200 45 L1200 100 L0 100 Z"
              fill="#3E2723"
              opacity="1"
              style={{ animation: "wave 5s ease-in-out infinite reverse" }}
            />
          </svg>
          <Features />
          <Footer />
        </div>
      </main>
    </div>
  );
}
