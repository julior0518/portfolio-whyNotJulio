
export function cssVarColor(name) {
  if (typeof document === "undefined") return "";
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${name}`)
    .trim();
  if (!raw) return "";
  if (raw.startsWith("#")) return raw;
  const rgb = raw.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)/i,
  );
  if (!rgb) return "";
  const toHex = (n) => Number(n).toString(16).padStart(2, "0");
  return `#${toHex(rgb[1])}${toHex(rgb[2])}${toHex(rgb[3])}`;
}
