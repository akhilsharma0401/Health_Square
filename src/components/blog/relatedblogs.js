"use client";

import { useEffect, useMemo, useState } from "react";
import { callApi } from "@/src/api";
import constant from "@/src/env";
import {
  BlogCard,
  BlogCardSkeleton,
  normalizeBlogs,
} from "@/src/components/blog/blogcard";

// The API may give `relatedBlogs` as an array, a JSON string, or a
// comma-separated string — of ids, or of objects that already carry blog
// details. Normalise to a de-duplicated list of ids (minus the open blog)
// plus any details that arrived inline.
function parseRelated(raw, currentId) {
  let list = raw;
  if (typeof list === "string") {
    const t = list.trim();
    if (t.startsWith("[")) {
      try {
        list = JSON.parse(t);
      } catch {
        list = [];
      }
    } else {
      list = t ? t.split(",") : [];
    }
  }
  if (!Array.isArray(list)) return { ids: [], inline: new Map() };

  const ids = [];
  const inline = new Map();
  for (const entry of list) {
    const isObj = entry && typeof entry === "object";
    const key = String(isObj ? entry.id : entry ?? "").trim();
    if (!key || key === String(currentId) || ids.includes(key)) continue;
    ids.push(key);
    if (isObj && entry.slug && entry.title) inline.set(key, entry);
  }
  return { ids, inline };
}

/**
 * "Related Blogs" section for a blog detail page. Shows only the blogs
 * picked in the admin panel (the post's `relatedBlogs`), never the open
 * post, and renders nothing at all when none are assigned.
 */
export default function RelatedBlogs({ relatedBlogs, currentId }) {
  const { ids, inline } = useMemo(
    () => parseRelated(relatedBlogs, currentId),
    [relatedBlogs, currentId]
  );
  const idsKey = ids.join(",");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ids.length === 0) {
      setItems([]);
      setLoading(false);
      setError("");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    (async () => {
      try {
        const results = await Promise.all(
          ids.map(async (id) => {
            if (inline.has(id)) return inline.get(id);
            const res = await callApi(constant.API.SINGLEBLOG, "POST", { id });
            return res?.status ? res.data || res.blog || null : null;
          })
        );
        if (cancelled) return;

        // Keep the admin's chosen order; drop anything that couldn't be
        // loaded or isn't published; never repeat a card.
        const seen = new Set();
        const cards = normalizeBlogs(results.filter(Boolean)).filter((b) => {
          const k = String(b.id);
          if (k === String(currentId) || seen.has(k)) return false;
          seen.add(k);
          return true;
        });

        setItems(cards);
        if (cards.length === 0) {
          setError("Related blogs are unavailable right now.");
        }
      } catch {
        if (!cancelled) setError("Related blogs are unavailable right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // idsKey captures the ids; `inline` is derived from the same input.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, currentId]);

  if (ids.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 md:mb-16">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C78D1]">
          Related Blogs
        </h2>
        <div className="h-px flex-1 bg-slate-300"></div>
      </div>

      {loading ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {ids.slice(0, 3).map((id) => (
            <BlogCardSkeleton key={id} />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((blog) => (
            <BlogCard key={blog.id ?? blog.slug} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-6">{error}</p>
      )}
    </section>
  );
}
