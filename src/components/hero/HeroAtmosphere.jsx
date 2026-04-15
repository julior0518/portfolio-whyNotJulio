/**
 * Fore-atmosphere: vignette + mist + light bloom — sits above parallax, below type/horse UI.
 * Keeps Palm Royale balance: expressive depth without mudding legibility.
 */
export default function HeroAtmosphere() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Cool alpine air at top → warm floor memory at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-porcelain/25 via-transparent to-burgundy/[0.07]" />
      {/* Corner vignette — camera lens, not flat overlay */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 38%, transparent 0%, rgba(17,17,17,0.12) 100%)",
        }}
      />
      {/* Subtle horizon haze band */}
      <div className="absolute inset-x-0 bottom-[18%] h-[28%] bg-gradient-to-t from-porcelain/15 via-transparent to-transparent" />
      {/* Gold-hour rim (single accent, not wallpaper) */}
      <div className="absolute -right-[20%] top-[8%] h-[45%] w-[55%] rounded-full bg-gold/[0.04] blur-3xl" />
    </div>
  );
}
