import kyotoSkyline from "../assets/footer-bg.png";

export default function Footer() {
  return (
    <footer className="w-full  relative mt-auto h-48 md:h-170">
      {/* Kyoto skyline illustration — frames both sides, open center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${kyotoSkyline})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          backgroundSize: "100% 100%",
          opacity: 0.55,
        }}
      />

      {/* Gold top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(246,204,44,0.3) 20%, rgba(246,204,44,0.3) 80%, transparent)",
        }}
      />

      {/* Content — sits in the open centre of the illustration */}
      <div
        className=" absolute bottom-1 left-1/2 -translate-x-1/2 z-10 max-w-6xl mx-auto 
       px-6 py-10 sm:py-14 flex flex-col  gap-3 text-center text-nowrap min-h-35"
      >
        <p className="text-sm text-[#FFFCF5]/40">
          Share culture over a coffee.
        </p>
        <p className="text-xs text-[#FFFCF5]/25">
          © {new Date().getFullYear()} Koffe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
