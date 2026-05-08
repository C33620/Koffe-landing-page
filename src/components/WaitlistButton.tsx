interface WaitlistButtonProps {
  buttonFillLevel: number;
  isHeroFixed: boolean;
  onClick: () => void;
}

export default function WaitlistButton({
  buttonFillLevel,
  onClick,
}: WaitlistButtonProps) {
  const progress = Math.max(0, Math.min(1, (buttonFillLevel - 30) / 10));

  const darkR = 38,
    darkG = 29,
    darkB = 13;
  const lightR = 255,
    lightG = 252,
    lightB = 245;

  const bgR = Math.round(darkR + (lightR - darkR) * progress);
  const bgG = Math.round(darkG + (lightG - darkG) * progress);
  const bgB = Math.round(darkB + (lightB - darkB) * progress);

  const textR = Math.round(lightR + (darkR - lightR) * progress);
  const textG = Math.round(lightG + (darkG - lightG) * progress);
  const textB = Math.round(lightB + (darkB - lightB) * progress);

  return (
    <div
      className="fixed pointer-events-none w-full flex justify-center px-6"
      style={{
        top: "calc(50vh + 160px)",
        zIndex: 35,
      }}
    >
      <button
        onClick={onClick}
        className="
      w-full
    max-w-152        /* ~same width as hero text on small screens */
    md:max-w-160     /* slightly wider on md+ */
    py-4 md:py-6  
    lg:max-w-md        /* bigger vertical padding on md */
    text-base md:text-lg
    rounded-full shadow-2xl
    hover:shadow-2xl transform hover:-translate-y-0.5
    pointer-events-auto
    transition-transform duration-200
        "
        style={{
          backgroundColor: `rgb(${bgR}, ${bgG}, ${bgB})`,
          color: `rgb(${textR}, ${textG}, ${textB})`,
        }}
        aria-label="Join the waitlist"
      >
        Join the Waitlist
      </button>
    </div>
  );
}
