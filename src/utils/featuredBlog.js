import { callApi, callApiWithFile } from "@/src/api";
import constant from "@/src/env";

// The backend stores `featured` as the strings "true"/"false" — and
// Boolean("false") is true, so never coerce it with Boolean()/truthiness.
export const isFeaturedValue = (v) =>
  v === true ||
  v === 1 ||
  v === "1" ||
  (typeof v === "string" && v.trim().toLowerCase() === "true");

const isPublished = (b) =>
  b?.status === "published" || b?.status === 1 || b?.status === "1";

// Pull every blog out of a list-API response (the paginated list is in
// `recentblog`; `data` is a fixed top-3 kept as a fallback), de-duplicated.
export function blogsFromListResponse(res) {
  const seen = new Set();
  const out = [];
  [
    ...(Array.isArray(res?.recentblog) ? res.recentblog : []),
    ...(Array.isArray(res?.data) ? res.data : []),
  ].forEach((b) => {
    if (b?.id == null || seen.has(String(b.id))) return;
    seen.add(String(b.id));
    out.push(b);
  });
  return out;
}

// There should only ever be one featured blog. If the data ever holds more
// than one flagged (older posts, or a write that was interrupted), show the
// one that was saved most recently — deterministic, and only ever among
// blogs that were explicitly flagged; never "just the newest blog".
export function pickFeaturedBlog(list) {
  const featured = (Array.isArray(list) ? list : []).filter(
    (b) => isPublished(b) && isFeaturedValue(b.featured ?? b.isFeatured)
  );
  if (featured.length === 0) return null;
  const ts = (b) => {
    const t = Date.parse(b.updated_at || b.created_at || "");
    return Number.isNaN(t) ? 0 : t;
  };
  return featured.sort((a, b) => ts(b) - ts(a) || Number(b.id) - Number(a.id))[0];
}

// The API returns publishdate as a UTC instant (a post dated the 29th comes
// back as 2026-09-28T18:30:00Z). Slicing the string would shift it back a
// day on every re-save, so read it in local time instead.
export function toLocalDateInput(v) {
  if (!v) return "";
  const s = String(v);
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s.slice(0, 10);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * Enforce "only one featured blog": clear the featured flag on every other
 * blog. The backend has no such rule of its own, so the admin form applies
 * it right after a blog is saved as featured.
 *
 * Each other featured blog is re-saved with identical content and only
 * featured/isFeatured flipped to false (the featured image isn't sent, so
 * the stored one is kept).
 *
 * @returns {{cleared: Array, failed: Array}} ids that were / weren't cleared
 */
export async function unfeatureOtherBlogs({ keepId = null, keepSlug = "" } = {}) {
  const cleared = [];
  const failed = [];

  const list = await callApi(
    `${constant.API.BLOG}?page=1&per_page=1000`,
    "GET"
  );
  const others = blogsFromListResponse(list).filter(
    (b) =>
      isFeaturedValue(b.featured ?? b.isFeatured) &&
      String(b.id) !== String(keepId ?? "") &&
      (!keepSlug || b.slug !== keepSlug)
  );

  for (const other of others) {
    try {
      const shown = await callApi(constant.API.SINGLEBLOG, "POST", {
        id: other.id,
      });
      const b = shown?.status ? shown.data || shown.blog : null;
      if (!b) throw new Error("not found");

      const fd = new FormData();
      const put = (k, v) => fd.append(k, v ?? "");
      put("id", String(other.id));
      put("title", b.title);
      put("slug", b.slug);
      put("shortdes", b.shortdes);
      put("content", b.content);
      put("category", b.category);
      put("author", b.author);
      put("publishdate", toLocalDateInput(b.publishdate));
      put("metatitle", b.metatitle);
      put("metadescription", b.metadescription);
      put("keywords", b.keywords);
      put("tags", b.tags);
      put("status", isPublished(b) ? "published" : "draft");
      put("featured", "false");
      put("isFeatured", "false");
      // faqs are required by the API and replaced on every save, so carry
      // the existing ones over untouched.
      put(
        "faqs",
        JSON.stringify(
          (Array.isArray(b.faqs) ? b.faqs : []).map((f) => ({
            question: f?.question || "",
            answer: f?.answer || "",
          }))
        )
      );
      // Only when the backend starts returning related blogs: preserve them.
      const related = b.relatedBlogs ?? b.related_blogs;
      if (Array.isArray(related)) {
        put(
          "relatedBlogs",
          JSON.stringify(
            related.map((r) => String(r && typeof r === "object" ? r.id : r))
          )
        );
      }

      const res = await callApiWithFile(constant.API.BLOG, "POST", fd);
      if (res && (res.status === true || res.status === "1")) {
        cleared.push(other.id);
      } else {
        failed.push(other.id);
      }
    } catch {
      failed.push(other.id);
    }
  }

  return { cleared, failed };
}
