"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FALLBACK_IMAGE } from "@/src/components/blog/blogcard";

// "Oct 09, 2026" — as in the reference design. Invalid/missing dates render
// nothing rather than "Invalid Date".
const formatFeaturedDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

/**
 * The single Featured Blog shown at the top of the blogs page.
 * `blog`: { slug, title, shortdes, image, author, publishdate }
 */
export default function FeaturedBlog({ blog }) {
  const [src, setSrc] = useState(blog?.image || FALLBACK_IMAGE);
  // A missing/deleted upload shouldn't leave a broken-image icon and alt
  // text in the hero — fall back to the site image instead.
  useEffect(() => {
    setSrc(blog?.image || FALLBACK_IMAGE);
  }, [blog?.image]);

  if (!blog) return null;

  const date = formatFeaturedDate(blog.publishdate);
  const href = `/blog/${blog.slug}`;

  return (
    <article className="group max-w-6xl mx-auto mb-12 md:mb-16 overflow-hidden rounded-[28px] bg-white shadow-md hover:shadow-xl transition-shadow duration-500 grid grid-cols-1 md:grid-cols-[1.15fr_1fr]">
      {/* Image */}
      <Link
        href={href}
        aria-label={blog.title}
        className="block p-4 sm:p-5 md:p-6 md:border-r border-[#dbe7fb]"
      >
        <div className="relative w-full aspect-[3/2] overflow-hidden rounded-xl bg-slate-100">
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
            priority
            onError={() => setSrc(FALLBACK_IMAGE)}
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      {/* Text */}
      <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 md:p-10">
        {(date || blog.author) && (
          <p className="text-sm text-slate-500">
            {date}
            {date && blog.author ? (
              <span className="mx-2 text-slate-300">|</span>
            ) : null}
            {blog.author ? `By ${blog.author}` : null}
          </p>
        )}

        <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-[#1F4C7A] line-clamp-3">
          <Link href={href} className="hover:text-[#0E76CD] transition-colors">
            {blog.title}
          </Link>
        </h1>

        {blog.shortdes && (
          <p className="text-slate-600 leading-relaxed md:text-justify line-clamp-3">
            {blog.shortdes}
          </p>
        )}

        <div className="pt-2">
          <Link
            href={href}
            className="relative inline-flex items-center overflow-hidden rounded-full bg-[#0072CE] px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-500 hover:shadow-lg"
          >
            <span className="relative z-10">Read More +</span>
            <span className="absolute inset-0 -translate-x-full bg-[#00B388] transition-transform duration-500 ease-in-out group-hover:translate-x-0 hover:translate-x-0" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FeaturedBlogSkeleton() {
  return (
    <div className="max-w-6xl mx-auto mb-12 md:mb-16 overflow-hidden rounded-[28px] bg-white shadow-md grid grid-cols-1 md:grid-cols-[1.15fr_1fr] animate-pulse">
      <div className="p-4 sm:p-5 md:p-6">
        <div className="aspect-[3/2] w-full rounded-xl bg-gray-200" />
      </div>
      <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 md:p-10">
        <div className="h-3 w-40 rounded bg-gray-200" />
        <div className="h-7 w-5/6 rounded bg-gray-200" />
        <div className="h-7 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-11 w-36 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
