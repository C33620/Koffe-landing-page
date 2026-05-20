import { useState } from "react";
import { useI18n } from "../locales/useI18n";

export default function ContactForm() {
  const { locale, translations } = useI18n();

  const TYPES = [
    { value: "local", label: translations.contact.type_local[locale] },
    {
      value: "explorer",
      label: translations.contact.type_explorer[locale],
    },
  ];

  const [email, setEmail] = useState<string>("");
  const [userType, setUserType] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // ── Disable send until all fields are filled ──────────────────────────────
  const isFormComplete =
    email.trim() !== "" && userType !== null && message.trim() !== "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userType) {
      setErrorMsg("Please select Local or Cultural Explorer.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email, user_type: userType, message }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
      setEmail("");
      setUserType(null);
      setMessage("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <section className="py-20 px-6 ">
        <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#328341] text-[#FFFCF5] flex items-center justify-center text-2xl mb-2">
            ✓
          </div>
          <h3 className="text-xl font-semibold text-[#FFFCF5]">
            {translations.contact.success_title[locale]}
          </h3>
          <p className="text-[#FFFCF5]">
            {translations.contact.success_body[locale]}
          </p>
        </div>
      </section>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <section className="mt-40 mb-40 md:mt-0 md:mb-0">
      <div className="max-w-4xl md:grid md:grid-cols-2 md:gap-12 md:items-start">
        {/* LEFT — form card, flush to the left edge of parent */}
        <div className="rounded-2xl py-10 px-10 bg-[#f8dfa40d]  border  border-[#f6cc2ccc]/30  ">
          <h2 className="text-3xl font-semibold text-[#FFFCF5] mb-2">
            {translations.contact.title[locale]}
          </h2>
          <p className="text-[#cdbda3] mb-8">
            {translations.contact.subtitle[locale]}
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6"
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="cf-email"
                className="text-sm font-semibold text-[#FFFCF5] tracking-wide"
              >
                {translations.contact.email_label[locale]}
              </label>
              <input
                id="cf-email"
                type="email"
                required
                placeholder={translations.contact.email_placeholder[locale]}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#261D0D]/35 bg-[#FFFCF5]/90 text-[#261D0D] placeholder:text-[#261D0D]/30 focus:outline-none focus:border-[#261D0D] focus:ring-2 focus:ring-[#261D0D]/10 transition-all duration-150"
              />
            </div>

            {/* User type */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-[#FFFCF5] tracking-wide">
                {translations.contact.identity_label[locale]}
              </span>
              <div className="flex flex-col gap-3 min-[422px]:flex-row max-[843px]:min-[769px]:flex-col">
                {TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    aria-pressed={userType === t.value}
                    onClick={() => setUserType(t.value)}
                    className={`
                      flex-1 py-2.5 px-4 rounded-full border-[1.5px] text-sm font-medium
                      transition-all duration-150 cursor-pointer 
                      ${
                        userType === t.value
                          ? // selected: filled dark bg + CTA-coloured border
                            " text-[#FFFCF5] border-[#261D0D] bg-[#261D0D]"
                          : // unselected: same neutral border for both buttons
                            "bg-transparent text-[#FFFCF5] border-[#FFFCF5]/50"
                      }
                    `}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="cf-message"
                className="text-sm font-semibold text-[#FFFCF5] tracking-wide"
              >
                {translations.contact.message_label[locale]}
              </label>
              <textarea
                id="cf-message"
                required
                rows={5}
                placeholder={translations.contact.message_placeholder[locale]}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#261D0D]/35 bg-[#FFFCF5]/90 text-[#261D0D] placeholder:text-[#261D0D]/30 focus:outline-none focus:border-[#261D0D] focus:ring-2 focus:ring-[#261D0D]/10 transition-all duration-150 resize-y"
              />
            </div>

            {/* Error */}
            {errorMsg && (
              <p
                role="alert"
                className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
              >
                {errorMsg}
              </p>
            )}

            {/* Submit — disabled until all fields complete */}
            <button
              type="submit"
              disabled={!isFormComplete || status === "loading"}
              className="w-full py-3.5 rounded-full bg-[#261D0D] text-[#FFFCF5] text-base font-semibold tracking-wide
                 hover:-translate-y-0.5
                disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0
                transition-all duration-150"
            >
              {status === "loading"
                ? translations.contact.submit_loading[locale]
                : translations.contact.submit_idle[locale]}
            </button>
          </form>
        </div>

        {/* RIGHT — empty for now */}
        <div className="hidden md:block" />
      </div>
    </section>
  );
}
