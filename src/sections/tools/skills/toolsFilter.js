/**
 * Case-insensitive substring filter on tool slug strings.
 * Empty query matches every slug.
 * @param {readonly string[]} slugs
 * @param {string} query
 * @returns {string[]}
 */
export function filterToolSlugs(slugs, query) {
  const q = query.toLowerCase();
  return slugs.filter((slug) => slug.toLowerCase().includes(q));
}

/**
 * Top matches for autocomplete (uses {@link filterToolSlugs}).
 * @param {readonly string[]} slugs
 * @param {string} query
 * @param {number} [limit=3]
 * @returns {string[]}
 */
export function recommendToolSlugs(slugs, query, limit = 3) {
  if (!query.length) return [];
  return filterToolSlugs(slugs, query).slice(0, limit);
}
