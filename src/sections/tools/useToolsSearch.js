import { useDeferredValue, useMemo, useState } from "react";
import { filterToolSlugs, recommendToolSlugs } from "./skills/toolsFilter";

/**
 * Search state for the Tools section: deferred matching + suggestion list.
 * @param {readonly string[]} allSlugs
 */
export function useToolsSearch(allSlugs) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const matchedSet = useMemo(
    () => new Set(filterToolSlugs(allSlugs, deferredQuery)),
    [allSlugs, deferredQuery],
  );

  const recommendations = useMemo(
    () => recommendToolSlugs(allSlugs, query, 3),
    [allSlugs, query],
  );

  const noSearchMatches =
    matchedSet.size === 0 && deferredQuery.trim().length > 0;

  return {
    query,
    setQuery,
    matchedSet,
    recommendations,
    noSearchMatches,
  };
}
