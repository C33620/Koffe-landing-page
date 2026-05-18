const steps = [
  {
    number: "1",
    title: "Add your interests",
    description: "Create your profile by choosing the things you're into.",
  },
  {
    number: "2",
    title: "Connect through location",
    description:
      "Cultural explorers choose an area. Locals choose a café. When both line up around shared interests, a connection is created.",
  },
  {
    number: "3",
    title: "Start safely over coffee",
    description:
      "Begin in a public café and keep the first conversation easy and low-pressure.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl text-[#FFFCF5] text-center mb-16 leading-snug">
          Meet over coffee <span className="text-[#FFFCF5]/50">in 3 steps</span>
        </h2>

        {/* ── DESKTOP: horizontal layout ── */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-8">
          {/* Row 1: circles only, no connectors */}
          <div className="contents">
            {steps.map((step) => (
              <div
                key={`circle-${step.number}`}
                className="flex justify-center"
              >
                <div className="w-12 h-12 rounded-full border-2 border-[#FFFCF5]/20 bg-[#f8dfa40d] flex items-center justify-center text-[#f6cc2ccc] font-semibold text-lg">
                  {step.number}
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: text content centered under each circle */}
          {steps.map((step) => (
            <div key={`text-${step.number}`} className="pt-4 text-center px-2">
              <h3 className="text-xl font-semibold text-[#FFFCF5] mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-[#FFFCF5]/60 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── MOBILE: vertical layout ── */}
        <div className="flex flex-col md:hidden">
          {steps.map((step, index) => (
            <div key={step.number} className="flex gap-5">
              {/* Left: circle + vertical line */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 shrink-0 rounded-full border-2 border-[#FFFCF5]/20 bg-[#FFFCF5]/5 flex items-center justify-center text-[#FFFCF5] font-semibold text-lg">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px bg-[#FFFCF5]/15 flex-1 my-2" />
                )}
              </div>

              {/* Right: text */}
              <div
                className={`${index < steps.length - 1 ? "pb-10" : "pb-0"} pt-2`}
              >
                <h3 className="text-xl font-semibold text-[#FFFCF5] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[#FFFCF5]/70 leading-relaxed text-lg md:text-base max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
