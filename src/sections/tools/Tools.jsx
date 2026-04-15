import ToolsInfo from "./info/ToolsInfo";
import ToolsSearch from "./search/ToolsSearch";
import { TOOL_SLUGS } from "./skills/skills.constants";
import ToolsSkillsGrid from "./skills/ToolsSkillsGrid";
import { useToolsSearch } from "./useToolsSearch";

export default function Tools() {
  const {
    query,
    setQuery,
    matchedSet,
    recommendations,
    noSearchMatches,
  } = useToolsSearch(TOOL_SLUGS);

  return (
    <section
      id="tools"
      className="relative overflow-visible border-t border-gold/10 bg-canvas text-ink app-padding section-spacing scroll-mt-28"
    >
      <ToolsInfo />
      <ToolsSearch
        query={query}
        setQuery={setQuery}
        recommendations={recommendations}
      />
      <ToolsSkillsGrid
        slugs={TOOL_SLUGS}
        matchedSet={matchedSet}
        noSearchMatches={noSearchMatches}
      />
    </section>
  );
}
