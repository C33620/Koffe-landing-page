import { useState } from "react";
import { useI18n } from "../locales/useI18n";
import { supabase } from "../utils/supabase/client";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type HeardFrom = "poster" | "word_of_mouth" | "social_media";

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const { locale, translations } = useI18n();

  const [userType, setUserType] = useState<"explorer" | "local" | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [insertedId, setInsertedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedHeardFrom, setSelectedHeardFrom] = useState<HeardFrom | null>(
    null,
  );

  if (!isOpen) return null;

  const resetModal = () => {
    setSubmitted(false);
    setIsFinishing(false);
    setInsertedId(null);
    setSelectedHeardFrom(null);
    setUserType(null);
    setEmail("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userType && email) {
      try {
        setError(null);

        const { data, error: sbError } = await supabase
          .from("waitlist")
          .insert([{ email, user_type: userType }])
          .select("id")
          .single();

        if (sbError) throw new Error(sbError.message);

        setInsertedId(data.id);
        setSubmitted(true);
      } catch (err) {
        console.error("Error submitting to waitlist:", err);
        setError(
          err instanceof Error
            ? err.message
            : translations.waitlist_modal.error_fallback[locale],
        );
      }
    }
  };

  const handleHeardFrom = async (value: HeardFrom) => {
    setSelectedHeardFrom(value);

    try {
      if (insertedId) {
        const { error: sbError } = await supabase
          .from("waitlist")
          .update({ heard_from: value })
          .eq("id", insertedId);

        if (sbError) console.error("Error updating heard_from:", sbError);
      }
    } catch (err) {
      console.error("Error updating heard_from:", err);
    } finally {
      setIsFinishing(true);

      setTimeout(() => {
        onClose();
        setTimeout(() => {
          resetModal();
        }, 250);
      }, 1100);
    }
  };

  const heardFromOptions: { value: HeardFrom; label: string }[] = [
    {
      value: "poster",
      label: translations.waitlist_modal.heard_from_flyer[locale],
    },
    {
      value: "word_of_mouth",
      label: translations.waitlist_modal.heard_from_word_of_mouth[locale],
    },
    {
      value: "social_media",
      label: translations.waitlist_modal.heard_from_social_media[locale],
    },
  ];

  return (
    <div
      className="fixed inset-0 z-10000 flex items-center justify-center px-4 sm:px-6"
      style={{
        backgroundColor: "rgba(36, 31, 23, 0.90)",
        animation: "fadeIn 0.4s ease-out",
      }}
      onClick={!submitted && !isFinishing ? onClose : undefined}
    >
      <div
        className="relative w-full max-w-md mx-auto bg-[#FFFCF5]/85 backdrop-blur-lg backdrop-saturate-250 rounded-3xl shadow-2xl overflow-hidden"
        style={{
          animation: "scaleIn 0.5s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 sm:px-8 py-6 sm:py-8">
          {!submitted ? (
            <>
              <h2 className="text-2xl sm:text-3xl text-[#261D0D] mb-2 text-center font-semibold">
                {translations.waitlist_modal.title[locale]}
              </h2>
              <p className="text-sm sm:text-base text-[#271D0D]/87 mb-6 text-center">
                {translations.waitlist_modal.subtitle[locale]}
              </p>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center mb-4 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                <div>
                  <label
                    className="block mb-2 text-sm sm:text-base font-medium"
                    style={{ color: "#261D0D" }}
                  >
                    {translations.waitlist_modal.identity_label[locale]}
                  </label>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setUserType("explorer")}
                      className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-full text-sm sm:text-base transition-colors duration-200"
                      style={{
                        backgroundColor: "rgba(255, 252, 245, 0.95)",
                        color: "#261D0D",
                        border: "3px solid",
                        borderColor:
                          userType === "explorer" ? "#261D0D" : "#261D0D60",
                      }}
                    >
                      {translations.waitlist_modal.type_explorer[locale]}
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType("local")}
                      className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-full text-sm sm:text-base transition-colors duration-200"
                      style={{
                        backgroundColor: "rgba(255, 252, 245, 0.95)",
                        color: "#261D0D",
                        border: "3px solid",
                        borderColor:
                          userType === "local" ? "#261D0D" : "#261D0D60",
                      }}
                    >
                      {translations.waitlist_modal.type_local[locale]}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 sm:mb-3 text-sm sm:text-base font-medium"
                    style={{ color: "#261D0D" }}
                  >
                    {translations.waitlist_modal.email_label[locale]}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      translations.waitlist_modal.email_placeholder[locale]
                    }
                    required
                    className="
                      w-full px-5 sm:px-6 py-3 sm:py-4
                      rounded-full bg-[#FFFCF5]
                      text-sm sm:text-base
                      text-[#261D0D] placeholder-[#261D0D]/40
                      focus:outline-none focus:border-[#261D0D]
                      transition-colors
                    "
                    style={{ border: "3px solid #261D0D60" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!userType || !email}
                  className="
                    w-full px-5 sm:px-6 py-3.5 sm:py-4
                    rounded-full text-sm sm:text-base
                    text-[#FFFCF5] bg-[#261D0D]
                    hover:shadow-xl transform hover:-translate-y-0.5
                    transition-all duration-300
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
                    mt-4 sm:mt-6
                  "
                >
                  {translations.waitlist_modal.submit_button[locale]}
                </button>
              </form>
            </>
          ) : isFinishing ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-14 text-center">
              <div
                className="mb-5 flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.08) 55%, rgba(34,197,94,0) 72%)",
                  animation: "successPop 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 72 72"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="36"
                    cy="36"
                    r="28"
                    stroke="#22C55E"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="176"
                    strokeDashoffset="176"
                    style={{
                      animation: "checkCircleDraw 0.55s ease-out forwards",
                    }}
                  />
                  <path
                    d="M24 36.5L32.5 45L48.5 28.5"
                    stroke="#22C55E"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="34"
                    strokeDashoffset="34"
                    style={{
                      animation: "checkPathDraw 0.35s 0.35s ease-out forwards",
                    }}
                  />
                </svg>
              </div>

              <h2 className="text-2xl sm:text-3xl text-[#261D0D] mb-2 font-semibold">
                {translations.waitlist_modal.success_title[locale]}
              </h2>
              <p className="text-sm sm:text-base text-[#261D0D]/80">
                {translations.waitlist_modal.success_body[locale]}
              </p>
            </div>
          ) : (
            <div className="text-center py-8 sm:py-10">
              <h2 className="text-2xl sm:text-3xl text-[#261D0D] mb-3 sm:mb-4 font-semibold">
                {translations.waitlist_modal.welcome_title[locale]}
              </h2>
              <p className="text-sm sm:text-xl text-[#261D0D]/95 mb-8">
                {translations.waitlist_modal.welcome_body[locale]}
              </p>

              <div className="space-y-3">
                <p className="text-sm sm:text-base font-medium text-[#261D0D] mb-4">
                  {translations.waitlist_modal.heard_from_label[locale]}
                </p>
                {heardFromOptions.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleHeardFrom(value)}
                    className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-full text-sm sm:text-base transition-colors duration-200"
                    style={{
                      backgroundColor: "rgba(255, 252, 245, 0.95)",
                      color: "#261D0D",
                      border: "3px solid",
                      borderColor:
                        selectedHeardFrom === value ? "#261D0D" : "#261D0D60",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes checkCircleDraw {
            from { stroke-dashoffset: 176; opacity: 0.7; }
            to { stroke-dashoffset: 0; opacity: 1; }
          }

          @keyframes checkPathDraw {
            from { stroke-dashoffset: 34; opacity: 0.7; }
            to { stroke-dashoffset: 0; opacity: 1; }
          }

          @keyframes successPop {
            0% {
              transform: scale(0.72);
              opacity: 0;
            }
            70% {
              transform: scale(1.06);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
