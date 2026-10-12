"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toAbs, stripHtml } from "@/src/utils/sanitizeHtml";

// Short description for cards: the blog's own, or — when it was left blank
// — the start of its content, so a card never shows an empty excerpt.
export const excerptFor = (b, max = 180) => {
  const own = String(b?.shortdes || "").trim();
  if (own) return own;
  const text = stripHtml(String(b?.content || ""));
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
};

export const FALLBACK_IMAGE = "/images/appointment.jpg";

// publishdate can be missing/invalid — never let a raw "Invalid Date" reach
// the UI.
export const formatBlogDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Published-only, mapped down to what the card needs.
export const normalizeBlogs = (list) =>
  (Array.isArray(list) ? list : [])
    .filter((b) => b?.status === "published" || b?.status === 1 || b?.status === "1")
    .map((b) => ({
      id: b.id,
      title: b.title || "Untitled",
      author: b.author || "",
      category: b.category || "",
      date: formatBlogDate(b.publishdate),
      image: b.image ? toAbs(b.image) : "",
      shortdes: excerptFor(b),
      slug: b.slug,
    }));

export function BlogCard({ blog }) {
  const [src, setSrc] = useState(blog.image || FALLBACK_IMAGE);
  useEffect(() => {
    setSrc(blog.image || FALLBACK_IMAGE);
  }, [blog.image]);

  return (
    <div className="group relative flex h-full flex-col bg-white rounded-2xl border border-[#e4ebfa] shadow-sm hover:shadow-md transition-all duration-300 p-5 cursor-pointer">
      <div className="relative overflow-hidden rounded-xl mb-4 group">
        <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-slate-100">
          {/* Blurred copy of the picture fills any space around it, so the
              whole image always shows — never cropped, never grey bars. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-125 bg-cover bg-center blur-xl opacity-60"
            style={{ backgroundImage: `url("${src}")` }}
          />
          <Image
            src={src}
            alt={blog.title}
            fill
            onError={() => setSrc(FALLBACK_IMAGE)}
            className="object-contain rounded-xl transform transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110 group-hover:-translate-y-2"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#00000070] via-[#00000030] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      </div>

      <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
        {blog.date && (
          <>
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>{blog.date}</span>
          </>
        )}
        {blog.author && (
          <>
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>{blog.author}</span>
          </>
        )}
      </div>

      <h3 className="text-[17px] font-semibold text-[#1b2c4f] mb-3 leading-snug line-clamp-2 group-hover:text-[#1363df] transition-colors duration-300">
        {/* Stretched link: the whole card (image, title, text) opens the blog. */}
        <Link
          href={`/blog/${blog.slug}`}
          className="after:absolute after:inset-0 after:content-[''] after:rounded-2xl"
        >
          {blog.title}
        </Link>
      </h3>

      <p className="text-gray-500 text-sm mb-5 line-clamp-2">
        {blog.shortdes}
      </p>

      <Link
        href={`/blog/${blog.slug}`}
        className="relative z-10 mt-auto sm:self-start"
      >
        <button
          type="submit"
          className="relative overflow-hidden cursor-pointer bg-[#0072CE] text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-500 ease-in-out group w-full sm:w-auto"
        >
          <span className="relative z-10 transition-colors duration-500 ease-in-out">
            Read More →
          </span>
          <span className="absolute inset-0 bg-[#00B388] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
        </button>
      </Link>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#e4ebfa] p-5 animate-pulse">
      <div className="h-56 w-full bg-gray-200 rounded-xl mb-4"></div>
      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-6"></div>
      <div className="h-8 w-32 bg-gray-200 rounded-full"></div>
    </div>
  );
}
