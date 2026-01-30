"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;
export const fetchCache = "force-no-store";

import Seo from "@/src/components/seo";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { callApi } from "@/src/api";
import constant from "@/src/env";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiTag,
  FiShare2,
  FiCopy,
  FiChevronLeft,
  FiCheck,
} from "react-icons/fi";

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps() {
  return { props: {} };
}
const toAbs = (url) => {
  if (!url || typeof url !== "string") return "";
  if (url.startsWith("http")) return url;
  const clean = url.startsWith("/") ? url : `/${url}`;
  return `${constant.BASE_URL}${clean}`;
};
const stripHtml = (s = "") =>
  s
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const calcReadingTime = (html = "") =>
  Math.max(
    1,
    Math.ceil(stripHtml(html).split(/\s+/).filter(Boolean).length / 200)
  );
const sanitizeAndAbsolutize = (html = "") => {
  if (!html || typeof html !== "string") return "";


  html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");


  html = html.replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "");

  html = html.replace(/(src|href)=["'](null|undefined)["']/gi, '$1="#"');


  html = html.replace(
    /src=["'](?!https?:|data:|\/)([^"']+)["']/gi,
    (m, path) => `src="${constant.BASE_URL}/${path}"`
  );


  html = html.replace(
    /style=["'][^"']*font-size:[^;"']*;?[^"']*["']/gi,
    (m) => m.replace(/font-size:[^;]+;?/gi, "")
  );


  html = html.replace(
    /<h2([^>]*)>/gi,
    (match, attrs) => {
      const tailwind = "text-xl md:text-3xl font-semibold my-4 leading-snug";

      // If class already exists → merge
      if (/class=/i.test(attrs)) {
        return match.replace(
          /class=(["'])(.*?)\1/i,
          (m, q, cls) => `class=${q}${cls} ${tailwind}${q}`
        );
      }

      // If no class → add new
      return `<h2${attrs} class="${tailwind}">`;
    }
  );

  return html;
};


// const pickTitle = (b) =>
//   b?.metatitle ||
//   (b?.title && b.title !== "Untitled post") ||
//   stripHtml(b?.content || "").slice(0, 80) ||
//   b?.slug ||
//   "Blog";

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  console.log(router.query)

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await callApi(constant.API.SINGLEBLOG, "POST", { id });
        if (!cancelled) {
          const b =
            res?.status && (res?.data || res?.blog)
              ? res.data || res.blog
              : null;
          if (b && typeof b === "object") {
            const tags = b?.tags?.split(",")
            setPost({
              id: b.id,
              slug: b.slug,
              title: b?.title,
              content: b.content || "",
              image: b.image || b.featured_image_url || "",
              date: b.publishdate || b.created_at || "",
              author: b.author || b.created_by || "",
              meta: {
                description: b.metadescription || "",
                keywords: b.keywords || "",
              },
              category: b.category || "",
              tags: tags,
            });
          } else setErr(res?.message || "Post not found.");
        }
      } catch {
        if (!cancelled) setErr("Failed to load the post.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const safeHtml = useMemo(
    () => sanitizeAndAbsolutize(post?.content || ""),
    [post?.content]
  );
  const title = post ? post.title : "Blog";
  console.log(post)
  console.log(title);
  const hero = toAbs(post?.image || "");
  const readMins = post ? calcReadingTime(post.content) : null;

  const fade = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true },
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Seo
        title={`${title} | Health Square Blog`}
        description={
          post?.meta?.description ||
          stripHtml(post?.content || "").slice(0, 150) ||
          "Read this blog on Health Square for insights, tips, and updates."
        }
        keywords={post?.meta?.keywords || post?.tags || ""}
        image={hero}
      />

      <main className="relative w-full overflow-hidden">
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 items-center justify-between gap-5 px-4 py-2 md:py-10">

          {/* Left Content */}
          <motion.div
            {...fade}
            className="relative z-10 flex flex-col gap-6 text-center lg:text-left max-w-2xl"
          >
            {/* Category + Tags */}
            <div className="space-y-2 md:order-1 order-3">
              {post?.category && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-xs text-black px-3 py-1 rounded-lg shadow-sm">
                  {post.category}
                </span>
              )}

              {post?.tags?.length > 0 && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-slate-800">
                  <span className="font-semibold">Tags:</span>
                  {post.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="font-normal text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold leading-snug text-left text-slate-900 md:order-2 order-1">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm md:order-3 order-2">
              {post?.author && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full shadow-sm">
                  <FiUser size={14} /> {post.author}
                </span>
              )}

              {post?.date && post.date !== "N/A" && (
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full shadow-sm">
                  <FiCalendar size={14} /> {formatDate(post.date)}
                </span>
              )}

              {readMins && (
                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full shadow-sm">
                  <FiClock size={14} /> {readMins} min read
                </span>
              )}
            </div>

            {/* Buttons */}
            <motion.div
              {...fade}
              className="flex flex-wrap justify-center lg:justify-start gap-4 md:order-4 order-4"
            >
              <button
                onClick={async () => {
                  if (typeof window === "undefined") return;
                  const url = window.location.href;

                  try {
                    if (navigator.share && window.location.protocol === "https:") {
                      await navigator.share({ title, text: title, url });
                    } else if (navigator.clipboard) {
                      await navigator.clipboard.writeText(url);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1400);
                    }
                  } catch { }
                }}
                className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium hover:bg-slate-100 transition"
              >
                <FiShare2 size={16} />
                Share
              </button>

              <button
                onClick={async () => {
                  if (typeof window === "undefined") return;
                  const url = window.location.href;

                  if (navigator.clipboard) {
                    await navigator.clipboard.writeText(url);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1400);
                  }
                }}
                className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium hover:bg-slate-100 transition"
              >
                {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                {copied ? "Copied" : "Copy Link"}
              </button>
            </motion.div>
          </motion.div>


          {/* Right Image */}
          <div className="relative w-full  h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">

            <Image
              src={hero || "/no-image.png"}
              alt={title || "Blog Image"}
              fill
            />
          </div>

        </section>


        <section className="relative bg-gradient-to-b from-[#f8fbff] to-white py-5 md:py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-2 md:mb-10 flex justify-between items-center text-sm text-gray-600">
              <div className="flex flex-wrap items-center gap-2">
                <Link href="/" className="hover:text-[#1F4C7A]">
                  Home
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-[#1F4C7A]">
                  Blogs
                </Link>
                {post?.slug && (
                  <>
                    <span>/</span>
                    <span>{post.slug}</span>
                  </>
                )}
              </div>
              <Link
                href="/blog"
                className="flex items-center gap-2 text-[#1F4C7A] font-medium hover:underline"
              >
                <FiChevronLeft /> Back
              </Link>
            </div>

            <motion.article
              {...fade}
              className="relative bg-white/80 backdrop-blur-md border border-slate-100 rounded-[28px] shadow-lg ring-1 ring-slate-200/30 p-4 md:p-12 prose prose-lg prose-slate max-w-none text-justify leading-relaxed"
            >
              <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
            </motion.article>

            {loading && (
              <div className="mt-12 animate-pulse bg-white rounded-3xl p-6 ring-1 ring-black/5 shadow-md">
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-6 bg-slate-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            )}

            {!loading && err && (
              <p className="py-10 text-center text-red-600 font-medium">
                {err}
              </p>
            )}
          </div>
        </section>

        {/* <Head>
          <title>{title} | Blog</title>
          {hero ? <meta property="og:image" content={hero} /> : null}
          <meta name="description" content={post?.meta?.description || title} />
          {post?.meta?.keywords && (
            <meta name="keywords" content={post.meta.keywords} />
          )}
        </Head> */}
      </main>
    </>
  );
}
