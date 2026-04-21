import { useCallback, useState } from "react";
import emailjs from "@emailjs/browser";

const initialForm = { name: "", email: "", message: "" };

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
      setIsLoading(true);

      try {
        await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          {
            from_name: formData.name,
            to_name: mailDefaults.toName,
            from_email: formData.email,
            to_email: mailDefaults.toEmail,
            message: formData.message,
          },
          emailjsConfig.publicKey,
        );
        setIsLoading(false);
        setFormData(initialForm);
        showAlertMessage("success", "Your message has been sent!");
      } catch {
        setIsLoading(false);
        showAlertMessage("danger", "Something went wrong!");
      }
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
