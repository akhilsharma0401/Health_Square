"use client";
import React, { useState, useEffect } from "react";
import { callApi } from "@/src/api";
import constant from "@/src/env";
import Seo from "@/src/components/seo";
import {
  BlogCard,
  BlogCardSkeleton,
  normalizeBlogs,
  excerptFor,
} from "@/src/components/blog/blogcard";
import FeaturedBlog, {
  FeaturedBlogSkeleton,
} from "@/src/components/blog/featuredblog";
import { toAbs } from "@/src/utils/sanitizeHtml";
import {
  blogsFromListResponse,
  pickFeaturedBlog,
} from "@/src/utils/featuredBlog";

const PER_PAGE = 6;

export default function BlogList() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  // One request for every blog. The Featured Blog is whichever published blog
  // the admin flagged (never "the newest blog"); it gets its own hero, so it
  // is taken out of the grid *before* paginating — every page then holds a
  // full PER_PAGE blogs instead of PER_PAGE minus the featured one.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await callApi(
          `${constant.API.BLOG}?page=1&per_page=1000`,
          "GET"
        );
        if (cancelled) return;
        if (!res?.status) {
          setError(res?.message || "Unable to load blogs right now.");
          return;
        }
        const raw = blogsFromListResponse(res);
        const pick = pickFeaturedBlog(raw);
        setFeatured(
          pick
            ? {
                id: pick.id,
                slug: pick.slug,
                title: pick.title || "Untitled",
                shortdes: excerptFor(pick, 220),
                author: pick.author || "",
                publishdate: pick.publishdate,
                image: pick.image ? toAbs(pick.image) : "",
              }
            : null
        );
        // Newest first, matching the API's own ordering.
        const ts = (b) => {
          const t = Date.parse(b.publishdate || b.created_at || "");
          return Number.isNaN(t) ? 0 : t;
        };
        const sorted = [...raw].sort(
          (a, b) => ts(b) - ts(a) || Number(b.id) - Number(a.id)
        );
        setAllBlogs(
          normalizeBlogs(sorted).filter(
            (b) => !pick || String(b.id) !== String(pick.id)
          )
        );
      } catch (err) {
        console.error("Error fetching blogs:", err);
        if (!cancelled) setError("Failed to load blogs. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(allBlogs.length / PER_PAGE));
  const listed = allBlogs.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const featuredLoading = loading;
  const handleNext = () => page < totalPages && setPage(page + 1);
  const handlePrev = () => page > 1 && setPage(page - 1);

  return (
    <>
      <Seo
        title="Dental Care Tips & News - Health Square Blog"
        description="Stay updated with expert dental care tips and news on the Health Square Blog. Your go-to resource for oral health advice."
        currentUrl="https://www.healthsquare.in/blog"
      />
      <section className="bg-[#f2f7fe] py-16 px-6 md:px-12 relative">
        {featuredLoading ? (
          <FeaturedBlogSkeleton />
        ) : (
          featured && <FeaturedBlog blog={featured} />
        )}

        <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: PER_PAGE }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))
          ) : error ? (
            <div className="col-span-full text-center text-red-600 font-medium py-10">
              {error}
            </div>
          ) : listed.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              No blogs available.
            </div>
          ) : (
            listed.map((blog) => (
              <BlogCard key={blog.id ?? blog.slug} blog={blog} />
            ))
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="max-w-6xl mx-auto flex justify-end mt-10">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`px-4 py-2 text-sm font-medium rounded-full border border-[#1363df] transition ${page === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-[#1363df] hover:bg-[#1363df] hover:text-white"
                  }`}
              >
                ← Prev
              </button>
              <span className="text-gray-600 text-sm font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`px-4 py-2 text-sm font-medium rounded-full border border-[#1363df] transition ${page === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-[#1363df] hover:bg-[#1363df] hover:text-white"
                  }`}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
