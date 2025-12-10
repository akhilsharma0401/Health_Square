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

  // remove dangerous scripts and inline JS
  html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "");

  // fix null/undefined image and link URLs to prevent .startsWith errors
  html = html.replace(/(src|href)=["'](null|undefined)["']/gi, '$1="#"');

  // ensure relative image paths have BASE_URL
  html = html.replace(
    /src=["'](?!https?:|data:|\/)([^"']+)["']/gi,
    (m, path) => {
      return `src="${constant.BASE_URL}/${path}"`;
    }
  );

  return html;
};

const pickTitle = (b) =>
  b?.metatitle ||
  (b?.title && b.title !== "Untitled post") ||
  stripHtml(b?.content || "").slice(0, 80) ||
  b?.slug ||
  "Blog";

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
            setPost({
              id: b.id,
              slug: b.slug,
              title: pickTitle(b),
              content: b.content || "",
              image: b.image || b.featured_image_url || "",
              date: b.publishdate || b.created_at || "",
              author: b.author || b.created_by || "",
              meta: {
                description: b.metadescription || "",
                keywords: b.keywords || "",
              },
              category: b.category || "",
              tags: b.tags || "",
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
        <section className="relative w-full h-[75vh] overflow-hidden flex items-end justify-center">
          {hero && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <Image
                src={hero}
                alt={title}
                fill
                priority
                sizes="100vw"
                className="object-contain md:object-cover object-center brightness-95 transition-all duration-700"
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <motion.div
            {...fade}
            className="relative z-10 text-center max-w-3xl mx-auto px-6 pb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              {title}
            </h1>
            <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm text-gray-100">
              {post?.author && (
                <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <FiUser /> {post.author}
                </span>
              )}
              {post?.date && (
                <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <FiCalendar /> {formatDate(post.date)}
                </span>
              )}
              {readMins && (
                <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <FiClock /> {readMins} min read
                </span>
              )}
            </div>
            <motion.div
              {...fade}
              className="mt-6 flex justify-center gap-4 flex-wrap"
            >
              <button
                onClick={async () => {
                  if (typeof window === "undefined") return;
                  const url = window.location.href;
                  try {
                    if (navigator.share)
                      await navigator.share({ title, text: title, url });
                    else if (navigator.clipboard) {
                      await navigator.clipboard.writeText(url);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1400);
                    }
                  } catch {}
                }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50"
              >
                <FiShare2 /> Share
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
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50"
              >
                {copied ? <FiCheck /> : <FiCopy />}{" "}
                {copied ? "Copied" : "Copy link"}
              </button>
            </motion.div>
          </motion.div>
        </section>

        <section className="relative bg-gradient-to-b from-[#f8fbff] to-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10 flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center gap-2">
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
              className="relative bg-white/80 backdrop-blur-md border border-slate-100 rounded-[28px] shadow-lg ring-1 ring-slate-200/30 p-8 md:p-12 prose prose-lg prose-slate max-w-none text-justify leading-relaxed"
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
