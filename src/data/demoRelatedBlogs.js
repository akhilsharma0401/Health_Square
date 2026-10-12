// TEMPORARY, DEMO-ONLY.
//
// The blog API accepts a `relatedBlogs` field on save but doesn't store or
// return it yet, so related links picked in the admin panel can't come back.
// Until the backend persists it, this maps the two demo blogs (slugs) to
// each other so the Related Blogs section can be shown working end to end.
//
// It is only a fallback: a post whose API response includes its own
// `relatedBlogs` always uses that, and slugs that don't exist are ignored.
// Delete this file (and its one use in pages/blog/[slug].js) once the
// backend returns `relatedBlogs`.
export const DEMO_RELATED_BY_SLUG = {
  "demo-featured-blog": ["demo-regular-blog"],
  "demo-regular-blog": ["demo-featured-blog"],
};
