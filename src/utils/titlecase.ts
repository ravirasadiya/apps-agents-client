export function TitleCase(input: string) {
  if (!input) return;
  return input
    .toLowerCase()
    .replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
}
