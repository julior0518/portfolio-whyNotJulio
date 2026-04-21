/** EmailJS — override with VITE_EMAILJS_* in `.env` for local / deploy. */
export const EMAILJS_CONFIG = {
  serviceId:
    import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_79b0nyj",
  templateId:
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_17us8im",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "pn-Bw_mS1_QQdofuV",
};

export const CONTACT_MAIL_DEFAULTS = {
  toName: "Julio",
  toEmail: "AliSanatiDev@gmail.com",
};
