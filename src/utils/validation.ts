/**
 * Maps a Zod error path to a JSON path
 * @param path The Zod error path.
 */
export function mapZodPathToJsonPath(path: (string | number)[]) {
  return path
    .map((item) => {
      if (typeof item === "string") {
        return `.${item}`;
      }
      return `[${item}]`;
    })
    .join("")
    .replace(/^\./, "");
}
