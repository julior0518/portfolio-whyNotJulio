export default function FormField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  rows = 4,
  roundedClass = "rounded-lg",
}) {
  const controlClass = `field-input field-input-focus ${roundedClass}`;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          className={controlClass}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          className={controlClass}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
}
