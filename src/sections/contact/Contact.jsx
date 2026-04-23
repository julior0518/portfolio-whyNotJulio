import { useLayoutEffect, useState } from "react";
import Alert from "../../components/Alert";
import { Particles } from "../../components/Particles";
import { useInViewOnce } from "../../hooks/useInViewOnce";
import { cssVarColor } from "../../theme";
import { CONTACT_MAIL_DEFAULTS, EMAILJS_CONFIG } from "./data/contact.constants";
import ContactForm from "./form/ContactForm";
import ContactInfo from "./info/ContactInfo";
import { useContactForm } from "./useContactForm";

const GOLD_FALLBACK = "#bfa256";

export default function Contact() {
  const [sectionRef, sectionVisible] = useInViewOnce({ rootMargin: "160px" });
  const [particleColor, setParticleColor] = useState(GOLD_FALLBACK);
  const {
    formData,
    isLoading,
    showAlert,
    alertType,
    alertMessage,
    handleChange,
    handleSubmit,
  } = useContactForm(EMAILJS_CONFIG, CONTACT_MAIL_DEFAULTS);

  useLayoutEffect(() => {
    const hex = cssVarColor("gold");
    if (hex) setParticleColor(hex);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex scroll-mt-28 flex-col items-center justify-center overflow-hidden border-t-2 border-gold/20 bg-mist/40 text-ink section-spacing"
    >
      {sectionVisible && (
        <Particles
          className="absolute inset-0 -z-10 opacity-[0.35]"
          quantity={48}
          ease={90}
          color={particleColor}
        />
      )}
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col items-center app-padding">
        <ContactInfo />
        <div className="mt-2 w-full max-w-xl rounded-2xl border border-gold/25 bg-white/96 p-8 shadow-lux-lg backdrop-blur-sm md:mt-4">
          <ContactForm
            formData={formData}
            isLoading={isLoading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}
