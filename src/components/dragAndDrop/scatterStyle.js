/** Deterministic pseudo-random scatter from a string key (stable across re-renders). */
export function scatterStyleForKey(key) {
  let n = 0;
  for (let i = 0; i < key.length; i++) {
    n = (n * 31 + key.charCodeAt(i)) >>> 0;
  }
  const rot = (n % 90) - 45;
  const top = 8 + (n % 72);
  const left = 4 + ((n >>> 8) % 76);
  return {
    rotate: `${rot}deg`,
    top: `${top}%`,
    left: `${left}%`,
  };
}
