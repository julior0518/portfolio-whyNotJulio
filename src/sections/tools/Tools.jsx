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
      className="alpine-map-grid relative overflow-visible border-t-2 border-gold/20 text-ink section-spacing scroll-pt-28"
    >
      <div className="mx-auto w-full max-w-screen-2xl app-padding">
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
      </div>
    </section>
  );
}
