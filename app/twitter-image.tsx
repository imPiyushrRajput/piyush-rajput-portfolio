// Twitter/X uses the same card artwork as Open Graph.
// `runtime` must be a literal in this file — Next can't read a re-exported one.
export const runtime = "edge";
export { default, alt, size, contentType } from "./opengraph-image";
