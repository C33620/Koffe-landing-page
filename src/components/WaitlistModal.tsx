import { useState } from "react";
import { supabase } from "../utils/supabase/client";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [userType, setUserType] = useState<"explorer" | "local" | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userType && email) {
      try {
        setError(null);

        const { error: sbError } = await supabase
          .from("waitlist")
          .insert([{ email, user_type: userType }]);

        if (sbError) throw new Error(sbError.message);

        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setUserType(null);
          setEmail("");
          setError(null);
        }, 2000);
      } catch (err) {
        console.error("Error submitting to waitlist:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to submit. Please try again.",
        );
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
      style={{
        backgroundColor: "rgba(38, 29, 13, 0.85)",
        animation: "fadeIn 0.4s ease-out",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-auto bg-[#FCF4CC]/60 backdrop-blur-lg backdrop-saturate-250 rounded-3xl shadow-2xl"
        style={{
          animation: "scaleIn 0.5s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 sm:px-8 py-6 sm:py-8">
          {!submitted ? (
            <>
              <h2 className="text-2xl sm:text-3xl text-[#261D0D] mb-2 text-center font-semibold">
                Your kyoto connection starts here
              </h2>
              <p className="text-sm sm:text-base text-[#271D0D]/87 mb-6 text-center">
                Tell us a bit about yourself
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
                    What do you identify to ?
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
                      Cultural Explorer
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
                      Local
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 sm:mb-3 text-sm sm:text-base font-medium"
                    style={{ color: "#261D0D" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
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
                  Join the Waitlist
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-10 sm:py-12">
              <h2 className="text-2xl sm:text-3xl text-[#FFFCF5] mb-3 sm:mb-4 font-semibold">
                Welcome!
              </h2>
              <p className="text-sm sm:text-xl text-[#FFFCF5]/95">
                You've been added to the waitlist. We'll be in touch soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
