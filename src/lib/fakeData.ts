const copyVariants = [
  "Compact row.",
  "This row is intentionally longer and includes enough words to wrap on most desktop resolutions. It helps demonstrate how virtualization handles mixed measured heights while the window drives scroll.",
  "Medium-length example text with a second sentence so item height differs from compact rows.",
  "Very long row copy: when this row renders, it should span multiple lines even on large monitors because the sentence keeps going with descriptive details about window scrolling, list measurement, and stable positioning during rapid wheel movement.",
  "Another short row.",
  "Long variant with punctuation and structure. First, it adds detail. Second, it continues with additional context about list behavior under dynamic content. Third, it closes with one more sentence to force a clearly taller cell.",
];

export type SimpleItem = { id: string; text: string };

export const generateItems = (count: number, startIndex = 0): SimpleItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: String(startIndex + i),
    text: copyVariants[i % copyVariants.length],
  }));
