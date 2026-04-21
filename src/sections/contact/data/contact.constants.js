/** Read from `.env.local` — see repo root `.env.example`. Restart dev server after changes. */
function env(key) {
  const v = import.meta.env[key];
  return typeof v === "string" && v.trim() !== "" ? v.trim() : "";
}

export const EMAILJS_CONFIG = {
  serviceId: env("VITE_EMAILJS_SERVICE_ID"),
  publicKey: env("VITE_EMAILJS_PUBLIC_KEY"),
  templateNotify: env("VITE_EMAILJS_TEMPLATE_NOTIFY"),
  templateAutoreply: env("VITE_EMAILJS_TEMPLATE_AUTOREPLY") || null,
};

export function isEmailJsConfigured() {
  return Boolean(
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.publicKey &&
    EMAILJS_CONFIG.templateNotify,
  );
}

export const CONTACT_MAIL_DEFAULTS = {
  toName: "Julio",
  toEmail: "info@whynotjulio.com",
};
