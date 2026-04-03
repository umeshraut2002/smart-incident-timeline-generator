import { useMemo } from "react";

export const useTimelineFilters = (timeline, filters) =>
  useMemo(() => {
    return timeline.filter((event) => {
      const eventTime = new Date(event.timestamp).getTime();
      const levelMatches = filters.level === "ALL" || event.level === filters.level;
      const fromMatches = !filters.from || eventTime >= new Date(filters.from).getTime();
      const toMatches = !filters.to || eventTime <= new Date(filters.to).getTime();
      return levelMatches && fromMatches && toMatches;
    });
  }, [timeline, filters]);
