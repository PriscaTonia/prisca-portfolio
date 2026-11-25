/**
 * Cloudinary URL helper. Images are referenced by their delivery URL in the
 * data files; this inserts a transformation so large PNG screenshots are
 * served as resized AVIF/WebP instead of multi-megabyte originals.
 */
export function cld(
  src: string,
  opts: { w?: number; h?: number; crop?: "fill" | "limit"; gravity?: string } = {}
): string {
  if (!src.includes("res.cloudinary.com") || !src.includes("/upload/")) return src;
  const { w = 2400, h, crop = h ? "fill" : "limit", gravity = "north" } = opts;
  const t = ["f_auto", "q_auto", `c_${crop}`, `w_${w}`];
  if (h) t.push(`h_${h}`);
  if (crop === "fill") t.push(`g_${gravity}`);
  const [base, rest] = src.split("/upload/");
  return `${base}/upload/${t.join(",")}/${rest.replace(/ /g, "%20")}`;
}
