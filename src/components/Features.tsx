import HowItWorks from "./HowItWorks";
import LocalTrust from "./LocalTrust";
import WhoIsItFor from "./WhoIsItFor";

export default function Features() {
  return (
    <section className="py-10 md:py-32 px-6 relative z-30">
      <div className="max-w-6xl mx-auto space-y-16">
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="who-is-it-for">
          <WhoIsItFor />
        </section>
        <section id="trust">
          <LocalTrust />
        </section>

        <div className="h-12" />
      </div>
    </section>
  );
}
