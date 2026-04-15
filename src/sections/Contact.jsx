import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { useInViewOnce } from "../hooks/useInViewOnce";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [sectionRef, sectionVisible] = useInViewOnce({ rootMargin: "160px" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        "service_79b0nyj",
        "template_17us8im",
        {
          from_name: formData.name,
          to_name: "Julio",
          from_email: formData.email,
          to_email: "AliSanatiDev@gmail.com",
          message: formData.message,
        },
        "pn-Bw_mS1_QQdofuV",
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Your message has been sent!");
    } catch {
      setIsLoading(false);
      showAlertMessage("danger", "Something went wrong!");
    }
  };
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex scroll-mt-28 items-center justify-center overflow-hidden border-t border-gold/10 bg-canvas text-ink section-spacing app-padding"
    >
        {sectionVisible && (
          <Particles
            className="absolute inset-0 -z-10 opacity-[0.35]"
            quantity={48}
            ease={90}
            color="#C6A962"
          />
        )}
        {showAlert && <Alert type={alertType} text={alertMessage} />}
        <div className="relative z-10 mx-auto flex w-full max-w-md flex-col rounded-2xl border border-gold/15 bg-white/95 p-8 shadow-lux-lg backdrop-blur-sm">
          <div className="mb-10 flex w-full flex-col items-start gap-4">
            <div>
              <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.35em] text-brass">
                Correspondence
              </p>
              <h2 className="mt-0 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
                Let&apos;s talk
              </h2>
            </div>
            <p className="font-sans text-sm font-light leading-relaxed text-muted">
              Whether you&apos;re looking to build a new website, improve your
              existing platform, or bring a unique project to life, I&apos;m
              here to help.
            </p>
          </div>
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="field-label">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="field-input field-input-focus rounded-lg"
                placeholder="Your name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="field-input field-input-focus rounded-lg"
                placeholder="you@example.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="field-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="field-input field-input-focus rounded-xl"
                placeholder="Share your thoughts…"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="hover-animation w-full rounded-full border border-gold/30 bg-gradient-to-r from-burgundy/90 via-plum/80 to-burgundy/90 py-3.5 font-sans text-sm font-medium uppercase tracking-[0.2em] text-porcelain shadow-lux-sm transition disabled:opacity-50"
            >
              {!isLoading ? "Send" : "Sending…"}
            </button>
          </form>
        </div>
    </section>
  );
};

export default Contact;
