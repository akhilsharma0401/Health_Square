"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { callApi } from "@/src/api";
import constant from "@/src/env";
import Link from "next/link";
import Seo from "@/src/components/seo";
import { showError } from "@/src/components/toaster";
import Image from "next/image";

const PER_PAGE = 6;

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [recent, setRecent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reqIdRef = useRef(0);

  const fetchBlogs = useCallback(async (p = 1) => {
    const id = ++reqIdRef.current;
    setLoading(true);

    try {
      const base = constant?.API?.BLOG;
      if (!base) throw new Error("API base URL missing");

      const url = `${base}?page=${p}&per_page=${PER_PAGE}`;
      const res = await callApi(url, "GET");

      if (id !== reqIdRef.current) return;

      if (res?.status && Array.isArray(res?.data?.results)) {
        const results = res.data.results.map((b) => ({
          id: b.id,
          title: b.title,
          author: b.author,
          category: b.category,
          date: new Date(b.publishdate).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          image: `${constant?.API?.BASE_URL || ""}/${b.image}`,
          shortdes: b.shortdes,
          slug: b.slug,
        }));

        setBlogs(results);

        setRecent(res.recentblog || []);
        setCategories(res.categoryCounts || []);
        const total = Number(res.data.total) || results.length;
        setTotalPages(Math.ceil(total / PER_PAGE));
      } else {
        console.warn("Invalid response:", res);
        // showError("Unable to load blogs.");
        setBlogs([]);
        setRecent([]);
        setCategories([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    } finally {
      if (id === reqIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs(page);
  }, [page, fetchBlogs]);
  const handleNext = () => page < totalPages && setPage(page + 1);
  const handlePrev = () => page > 1 && setPage(page - 1);

  return (
  <>
   <Seo
        title="Dental Care Tips & News - Health Square Blog"
        description="Stay updated with expert dental care tips and news on the Health Square Blog. Your go-to resource for oral health advice."
      />
    <section className="bg-[#f2f7fe] py-16 px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: PER_PAGE }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#e4ebfa] p-5 animate-pulse"
            >
              <div className="h-56 w-full bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded mb-6"></div>
              <div className="h-8 w-32 bg-gray-200 rounded-full"></div>
            </div>
          ))
        ) : blogs.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No blogs available.
          </div>
        ) : (
          blogs.map((blog, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-[#e4ebfa] shadow-sm hover:shadow-md transition-all duration-300 p-5 cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-4 group">
                <div className="relative w-full h-56 rounded-xl overflow-hidden">
                  <Image
                    src={`${constant?.BASE_URL}/${blog.image}`}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-xl transform transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110 group-hover:-translate-y-2"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#00000070] via-[#00000030] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>{blog.date}</span>
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>{blog.author}</span>
              </div>

              <h3 className="text-[17px] font-semibold text-[#1b2c4f] mb-3 leading-snug group-hover:text-[#1363df] transition-colors duration-300">
                {blog.title}
              </h3>

              <p className="text-gray-500 text-sm mb-5 line-clamp-2">
                {blog.shortdes}
              </p>

              <Link
                href={{
                  pathname: `/blog/${blog.slug}`,
                  query: { id: blog.id },
                }}
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
          ))
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="max-w-6xl mx-auto flex justify-end mt-10">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className={`px-4 py-2 text-sm font-medium rounded-full border border-[#1363df] transition ${
                page === 1
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
              className={`px-4 py-2 text-sm font-medium rounded-full border border-[#1363df] transition ${
                page === totalPages
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
