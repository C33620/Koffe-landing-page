import { useState } from "react";
import { useI18n } from "../locales/useI18n";
import KoffeeLogo from "./KoffeeLogo";
import WaitlistButton from "./WaitlistButton";

interface NavbarProps {
  inCoffee: boolean;
  onWaitlistClick: () => void;
}

export default function Navbar({ inCoffee, onWaitlistClick }: NavbarProps) {
  const { locale, translations } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      label: translations.navbar.link_meet_over_coffee[locale],
      href: "#how-it-works",
    },
    {
      label: translations.navbar.link_share_together[locale],
      href: "#who-is-it-for",
    },
    {
      label: translations.navbar.link_in_trusted_place[locale],
      href: "#trust",
    },
  ];

  const textMuted = inCoffee ? "rgba(255,252,245,0.7)" : "rgba(38,29,13,0.7)";
  const textFull = inCoffee ? "#FFFCF5" : "#261D0D";

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const handleWaitlistClick = () => {
    setMenuOpen(false);
    onWaitlistClick();
  };

  return (
    <nav
      className="sticky top-0 left-0 right-0 z-50 overflow-visible border-b backdrop-blur-sm transition-all duration-500"
      style={{
        backgroundColor: inCoffee
          ? "rgba(62, 39, 35, 0.95)"
          : "rgba(255, 252, 245, 0.95)",
        borderColor: inCoffee
          ? "rgba(255, 252, 245, 0.1)"
          : "rgba(38, 29, 13, 0.1)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          opacity: inCoffee ? 0.25 : 0.08,
          backgroundImage: inCoffee
            ? `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='seigaiha' x='0' y='0' width='100' height='50' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 25 Q12.5 12.5 25 25 T50 25 T75 25 T100 25' fill='none' stroke='%23FFFCF5' stroke-width='0.8'/%3E%3Cpath d='M-25 25 Q-12.5 12.5 0 25 T25 25 T50 25 T75 25' fill='none' stroke='%23FFFCF5' stroke-width='0.8'/%3E%3Cpath d='M0 25 Q12.5 37.5 25 25 T50 25 T75 25 T100 25' fill='none' stroke='%23FFFCF5' stroke-width='0.5' opacity='0.6'/%3E%3Cpath d='M12.5 25 Q25 18.75 37.5 25 T62.5 25 T87.5 25' fill='none' stroke='%23FFFCF5' stroke-width='0.5' opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23seigaiha)'/%3E%3C/svg%3E")`
            : `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='seigaiha' x='0' y='0' width='100' height='50' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 25 Q12.5 12.5 25 25 T50 25 T75 25 T100 25' fill='none' stroke='%23261D0D' stroke-width='0.8'/%3E%3Cpath d='M-25 25 Q-12.5 12.5 0 25 T25 25 T50 25 T75 25' fill='none' stroke='%23261D0D' stroke-width='0.8'/%3E%3Cpath d='M0 25 Q12.5 37.5 25 25 T50 25 T75 25 T100 25' fill='none' stroke='%23261D0D' stroke-width='0.5' opacity='0.6'/%3E%3Cpath d='M12.5 25 Q25 18.75 37.5 25 T62.5 25 T87.5 25' fill='none' stroke='%23261D0D' stroke-width='0.5' opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23seigaiha)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "80px 40px",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <KoffeeLogo
          className="text-3xl md:text-4xl transition-colors duration-500"
          style={{ color: textFull }}
        />

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="relative rounded-lg px-3 py-1.5 text-sm md:text-[1rem] transition-all duration-200 cursor-pointer"
                style={{
                  color: textMuted,
                  border: "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = textFull;
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = textMuted;
                  e.currentTarget.style.border = "1px solid transparent";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {label}
              </a>
            ))}

            <WaitlistButton
              inCoffee={inCoffee}
              onClick={handleWaitlistClick}
              className="ml-4 lg:ml-6"
            />
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <WaitlistButton
              inCoffee={inCoffee}
              onClick={handleWaitlistClick}
              className="px-3 py-1.5 text-xs"
            />

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 transition-colors duration-200"
              style={{ color: textFull, backgroundColor: "transparent" }}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={
                menuOpen
                  ? translations.navbar.aria_close_navigation[locale]
                  : translations.navbar.aria_open_navigation[locale]
              }
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <g
                  stroke={textFull}
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line
                    x1="5"
                    y1="7"
                    x2="19"
                    y2="7"
                    style={{
                      transformOrigin: "12px 7px",
                      transition: "transform 200ms ease, opacity 200ms ease",
                      transform: menuOpen
                        ? "translateY(5px) rotate(45deg)"
                        : "none",
                    }}
                  />
                  <line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                    style={{
                      opacity: menuOpen ? 0 : 1,
                      transition: "opacity 150ms ease",
                    }}
                  />
                  <line
                    x1="5"
                    y1="17"
                    x2="19"
                    y2="17"
                    style={{
                      transformOrigin: "12px 17px",
                      transition: "transform 200ms ease, opacity 200ms ease",
                      transform: menuOpen
                        ? "translateY(-5px) rotate(-45deg)"
                        : "none",
                    }}
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className="relative pointer-events-none sm:hidden"
        style={{ height: 0 }}
      >
        <div
          className="absolute left-0 right-0 overflow-hidden pointer-events-auto transition-[max-height,opacity] duration-250 ease-out"
          style={{
            top: "100%",
            maxHeight: menuOpen ? "100vh" : "0px",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <div
            className="mx-4 mb-3 mt-1 rounded-xl"
            style={{
              backgroundColor: inCoffee
                ? "rgba(52, 24, 20, 0.95)"
                : "rgba(255, 252, 245, 0.98)",
              border: inCoffee
                ? "1px solid rgba(255, 252, 245, 0.12)"
                : "1px solid rgba(38, 29, 13, 0.12)",
            }}
          >
            {navLinks.map(({ label, href }, idx) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="block px-4 py-2.5 text-sm"
                style={{
                  color: textFull,
                  borderBottom:
                    idx === navLinks.length - 1
                      ? "none"
                      : inCoffee
                        ? "1px solid rgba(255, 252, 245, 0.12)"
                        : "1px solid rgba(38, 29, 13, 0.12)",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
