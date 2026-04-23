import FormField from "../../../components/FormField";

export default function ContactForm({
  formData,
  isLoading,
  onChange,
  onSubmit,
}) {
  return (
    <form className="w-full space-y-6" onSubmit={onSubmit}>
      <FormField
        id="name"
        name="name"
        label="Full name"
        type="text"
        placeholder="Your name"
        autoComplete="name"
        value={formData.name}
        onChange={onChange}
        required
      />
      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={formData.email}
        onChange={onChange}
        required
      />
      <FormField
        id="message"
        name="message"
        label="Message"
        type="textarea"
        placeholder="Share your thoughts…"
        autoComplete="off"
        rows={4}
        roundedClass="rounded-xl"
        value={formData.message}
        onChange={onChange}
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="hover-animation w-full rounded-lg border border-gold/30 bg-gradient-to-r from-burgundy/90 via-plum/80 to-burgundy/90 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-porcelain shadow-lux-sm transition disabled:opacity-50"
      >
        {!isLoading ? "Send" : "Sending…"}
      </button>
    </form>
  );
}
