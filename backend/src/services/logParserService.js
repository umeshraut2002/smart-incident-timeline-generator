const fs = require("fs/promises");

const patterns = [
  /^(?<timestamp>\d{4}-\d{2}-\d{2}[T ][\d:.]+(?:Z|[+-]\d{2}:?\d{2})?)\s+\[(?<level>INFO|WARN|ERROR)\]\s+(?<message>.+)$/i,
  /^(?<timestamp>\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}:\d{2}(?:,\d{3}|\.\d{3})?(?:Z|[+-]\d{2}:?\d{2})?)\s+(?<level>INFO|WARN|ERROR)\s+(?<message>.+)$/i,
  /^(?<level>INFO|WARN|ERROR)\s+(?<timestamp>\d{4}\/\d{2}\/\d{2}\s+\d{2}:\d{2}:\d{2})\s+(?<message>.+)$/i,
  /^(?<timestamp>\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2})\s+\[(?<level>INFO|WARN|ERROR)\]\s+(?<message>.+)$/i
];

const parseTimestamp = (rawTimestamp) => {
  if (!rawTimestamp) {
    return null;
  }

  const hasExplicitTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(rawTimestamp);
  const normalized = rawTimestamp.replace(",", ".").replace(" ", "T");
  const isoCandidate = hasExplicitTimezone ? normalized : `${normalized}Z`;
  const parsed = new Date(isoCandidate);

  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  const europeanMatch = rawTimestamp.match(
    /^(?<day>\d{2})\/(?<month>\d{2})\/(?<year>\d{4})\s+(?<time>\d{2}:\d{2}:\d{2})$/
  );

  if (europeanMatch?.groups) {
    const { day, month, year, time } = europeanMatch.groups;
    return new Date(`${year}-${month}-${day}T${time}Z`);
  }

  return null;
};

const parseLogLine = (line, lineNumber) => {
  for (const pattern of patterns) {
    const match = line.match(pattern);

    if (!match?.groups) {
      continue;
    }

    const parsedDate = parseTimestamp(match.groups.timestamp);

    if (!parsedDate) {
      return null;
    }

    return {
      lineNumber,
      timestamp: parsedDate.toISOString(),
      level: match.groups.level.toUpperCase(),
      message: match.groups.message.trim(),
      raw: line
    };
  }

  return null;
};

const parseLogFile = async (filePath) => {
  const content = await fs.readFile(filePath, "utf8");
  const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);

  const parsedEntries = [];
  const skippedLines = [];

  lines.forEach((line, index) => {
    const parsedLine = parseLogLine(line, index + 1);

    if (parsedLine) {
      parsedEntries.push(parsedLine);
      return;
    }

    skippedLines.push({
      lineNumber: index + 1,
      raw: line
    });
  });

  return {
    entries: parsedEntries,
    skippedLines,
    totalLines: lines.length
  };
};

module.exports = {
  parseLogFile
};
