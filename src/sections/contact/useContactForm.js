import { useCallback, useState } from "react";
import emailjs from "@emailjs/browser";
import { EmailJSResponseStatus } from "@emailjs/browser";
import { isEmailJsConfigured } from "./data/contact.constants";

const initialForm = { name: "", email: "", message: "" };

function formatEmailJsError(err) {
  if (err instanceof EmailJSResponseStatus) {
    return `${err.status} ${err.text || ""}`.trim();
  }
  return String(err?.message || err);
}

export function useContactForm(emailjsConfig, mailDefaults) {
  const [formData, setFormData] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlertMessage = useCallback((type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  }, []);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!isEmailJsConfigured()) {
        showAlertMessage(
          "danger",
          "Contact isn’t configured yet. Add EmailJS keys to `.env.local` (see `.env.example`).",
        );
        return;
      }

      setIsLoading(true);

      const templateParams = {
        from_name: formData.name.trim(),
        to_name: mailDefaults.toName,
        from_email: formData.email.trim(),
        to_email: mailDefaults.toEmail,
        message: formData.message.trim(),
      };

      const opts = { publicKey: emailjsConfig.publicKey };

      try {
        await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateNotify,
          templateParams,
          opts,
        );
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error("[Contact] EmailJS (notify)", err);
        }
        const detail = formatEmailJsError(err);
        showAlertMessage(
          "danger",
          detail.includes("422") || detail.includes("empty")
            ? "Email to you failed: in EmailJS, open the NOTIFY template and set “To email” to info@whynotjulio.com (or {{to_email}}). See .env.example."
            : `Could not send: ${detail}`,
        );
        setIsLoading(false);
        return;
      }

      if (emailjsConfig.templateAutoreply && templateParams.from_email) {
        const autoreplyParams = {
          ...templateParams,
          // Some templates use these for “To email” instead of {{from_email}}
          email: templateParams.from_email,
          user_email: templateParams.from_email,
        };
        try {
          await emailjs.send(
            emailjsConfig.serviceId,
            emailjsConfig.templateAutoreply,
            autoreplyParams,
            opts,
          );
        } catch (err) {
          if (import.meta.env.DEV) {
            console.error("[Contact] EmailJS (autoreply)", err);
          }
          showAlertMessage(
            "danger",
            "Your note was sent to info@whynotjulio.com, but the visitor confirmation failed (422). In EmailJS → AUTOREPLY template → Settings, set “To email” to exactly {{from_email}} (or {{email}} / {{user_email}} — we send those too). Do not leave To blank.",
          );
          setIsLoading(false);
          return;
        }
      }

      setFormData(initialForm);
      showAlertMessage("success", "Your message has been sent!");
      setIsLoading(false);
    },
    [emailjsConfig, formData, mailDefaults, showAlertMessage],
  );

  return {
    formData,
    isLoading,
    showAlert,
    alertType,
    alertMessage,
    handleChange,
    handleSubmit,
  };
}
