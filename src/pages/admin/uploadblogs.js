"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { showSuccess, showError } from "@/src/components/toaster";
import { callApiWithFile, callApi } from "@/src/api";
import constant from "@/src/env";
import RichTextEditor from "@/src/components/blog/uplodblogs/contenteditor";
import RelatedBlogsSelect from "@/src/components/blog/uplodblogs/relatedblogsselect";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import {
  isFeaturedValue,
  pickFeaturedBlog,
  blogsFromListResponse,
  toLocalDateInput,
  unfeatureOtherBlogs,
} from "@/src/utils/featuredBlog";

export default function BlogUploadFormPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Wait for the router to be ready before deciding — otherwise this runs
    // once with a not-yet-ready router and again once it's ready, firing
    // router.replace() twice and racing against itself.
    if (!router.isReady) return;
    try {
      const loggedIn = sessionStorage.getItem("logintype") === "admin";
      if (loggedIn) {
        setAllowed(true);
      } else {
        showError("Please login as admin to access this page");
        router.replace("/admin");
      }
    } catch {
      router.replace("/admin");
    } finally {
      setChecking(false);
    }
  }, [router, router.isReady]);

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center text-sm text-gray-500">
        Checking permission…
      </div>
    );
  }

  if (!allowed) return null;

  return <BlogUploadFormInner />;
}

/** -------- Inner: create + edit (same UI) -------- */
function BlogUploadFormInner() {
  const router = useRouter();
  const fileRef = useRef(null);

  const blogId = router?.query?.id ? String(router.query.id) : "";
  const isEdit = Boolean(blogId);

  const [initializing, setInitializing] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  const [categories, setCategories] = useState(["DENTAL CARE", "PHARMACY"]);
  const [authors, setAuthors] = useState(["Admin"]);

  const [newCat, setNewCat] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const [faqs, setFaqs] = useState([]);

  // Related blogs: ids of the selected blogs, plus the pickable options
  // fetched from the existing blog-list API.
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [blogOptions, setBlogOptions] = useState([]);
  const [blogOptionsLoading, setBlogOptionsLoading] = useState(true);
  const [blogOptionsError, setBlogOptionsError] = useState("");
  // The blog currently flagged as the Featured Blog (shown as a hint under
  // the "Set as Featured Blog" option).
  const [currentFeatured, setCurrentFeatured] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortdes: "",
    content: "",
    category: "",
    tags: "",
    author: "Admin",
    publishdate: "",
    metatitle: "",
    metadescription: "",
    keywords: "",
    status: "draft",
    featured: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const normalizeSlug = (s) =>
    String(s || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // FAQ question/answer are rich-text HTML now (so a specific word/phrase can
  // carry its own link) — Jodit's "empty" state is markup like "<p><br></p>",
  // not "", so strip tags before checking whether there's real text.
  const isHtmlEmpty = (html) =>
    String(html || "")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim() === "";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
      ...(name === "title" ? { slug: normalizeSlug(val) } : {}),
    }));
  };

  const addCategory = () => {
    const v = newCat.trim();
    if (!v) return;
    if (categories.some((c) => c.toLowerCase() === v.toLowerCase())) {
      showError("Category already exists");
      return;
    }
    setCategories((prev) => [...prev, v]);
    setNewCat("");
    setFormData((p) => ({ ...p, category: v }));
  };

  const deleteCategory = (name) => {
    setCategories((prev) => prev.filter((c) => c !== name));
    setFormData((p) => ({
      ...p,
      category: p.category === name ? "" : p.category,
    }));
  };

  const addAuthor = () => {
    const v = newAuthor.trim();
    if (!v) return;
    if (authors.some((a) => a.toLowerCase() === v.toLowerCase())) {
      showError("Author already exists");
      return;
    }
    setAuthors((prev) => [...prev, v]);
    setNewAuthor("");
    setFormData((p) => ({ ...p, author: v }));
  };

  const deleteAuthor = (name) => {
    setAuthors((prev) => prev.filter((a) => a !== name));
    setFormData((p) => ({
      ...p,
      author:
        p.author === name
          ? authors[0] === name
            ? ""
            : authors[0] || ""
          : p.author,
    }));
  };

  const addFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const updateFaq = (index, field, value) => {
    setFaqs((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)),
    );
  };

  const removeFaq = (index) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  // Every blog image is saved at one common size (1200×800, 3:2) so cards
  // and heroes look uniform. The whole picture is kept — never cropped; any
  // spare space is filled with a blurred copy of it. Falls back to the
  // original file if the browser can't process it.
  const standardizeBlogImage = (file) =>
    new Promise((resolve) => {
      const W = 1200;
      const H = 800;
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = W;
          canvas.height = H;
          const ctx = canvas.getContext("2d");
          const iw = img.naturalWidth;
          const ih = img.naturalHeight;

          const cover = Math.max(W / iw, H / ih);
          ctx.filter = "blur(28px)";
          ctx.drawImage(
            img,
            (W - iw * cover) / 2,
            (H - ih * cover) / 2,
            iw * cover,
            ih * cover
          );
          ctx.filter = "none";

          const fit = Math.min(W / iw, H / ih);
          const dw = iw * fit;
          const dh = ih * fit;
          ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);

          canvas.toBlob(
            (blob) => {
              URL.revokeObjectURL(url);
              if (!blob) return resolve(file);
              const base = file.name.replace(/\.[^.]+$/, "") || "blog-image";
              resolve(new File([blob], `${base}.jpg`, { type: "image/jpeg" }));
            },
            "image/jpeg",
            0.9
          );
        } catch {
          URL.revokeObjectURL(url);
          resolve(file);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(file);
      };
      img.src = url;
    });

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxMB = 5;
    const isImage = file.type.startsWith("image/");
    const withinSize = file.size <= maxMB * 1024 * 1024;

    if (!isImage) {
      showError("Please select a valid image file.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    if (!withinSize) {
      showError(`Image must be ≤ ${maxMB} MB.`);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    const standard = await standardizeBlogImage(file);

    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);

    setImage(standard);
    setPreview(URL.createObjectURL(standard));
  };

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Populate the Related Blogs dropdown from the existing list API. The
  // paginated full list comes back in `recentblog` (it honours
  // page/per_page); `data` is only a fixed top-3, so it's just a fallback.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setBlogOptionsLoading(true);
      setBlogOptionsError("");
      try {
        const res = await callApi(
          `${constant.API.BLOG}?page=1&per_page=1000&role=admin`,
          "GET"
        );
        if (cancelled) return;
        if (!res?.status) {
          setBlogOptionsError(res?.message || "Could not load blogs.");
          return;
        }
        const raw = Array.isArray(res.recentblog) && res.recentblog.length
          ? res.recentblog
          : Array.isArray(res.data)
          ? res.data
          : [];
        const seen = new Set();
        const opts = [];
        for (const b of raw) {
          if (b?.id == null || seen.has(String(b.id))) continue;
          seen.add(String(b.id));
          opts.push({ id: b.id, title: b.title || `Blog #${b.id}` });
        }
        setBlogOptions(opts);
        const feat = pickFeaturedBlog(blogsFromListResponse(res));
        setCurrentFeatured(
          feat ? { id: feat.id, slug: feat.slug, title: feat.title } : null
        );
      } catch (e) {
        if (!cancelled) setBlogOptionsError("Could not load blogs.");
      } finally {
        if (!cancelled) setBlogOptionsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // --------- EDIT: load existing blog by id ----------

  const EMPTY_FORM = {
    title: "",
    slug: "",
    shortdes: "",
    content: "",
    category: "",
    author: "Admin",
    publishdate: "",
    metatitle: "",
    metadescription: "",
    keywords: "",
    tags: "",
    status: "draft",
    featured: false,
  };

  function resetAll() {
    setFormData(EMPTY_FORM);
    setFaqs([]);
    setRelatedBlogs([]);
    setImage(null);
    if (preview && typeof preview === "string" && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }
  function toAbsUrl(path) {
    if (!path) return "";
    const s = String(path).trim();
    if (/^https?:\/\//i.test(s)) return s;
    // Dev: same-origin, proxied by next.config.mjs to the active backend.
    const base =
      process.env.NODE_ENV === "production"
        ? (constant.BASE_URL || "").replace(/\/$/, "")
        : "";
    const file = s.replace(/^\/+/, "");
    return base ? `${base}/${file}` : `/${file}`;
  }
  useEffect(() => {
    const load = async () => {
      if (!isEdit) return;
      const id = blogId;
      try {
        setInitializing(true);
        const res = await callApi(constant.API.SINGLEBLOG, "POST", { id });

        const ok =
          res?.status === true || res?.success === true || res?.ok === true;
        const blog = ok ? res?.data || res?.blog || res : null;
        if (!blog) {
          showError("Blog not found");
          return;
        }

        setFormData({
          title: blog.title || "",
          slug: blog.slug || normalizeSlug(blog.title || ""),
          shortdes: blog.shortdes || blog.short_description || "",
          content: blog.content || blog.body || "",
          category:
            (blog.category && (blog.category.name || blog.category)) ||
            blog.category_name ||
            blog.category ||
            "",
          tags: blog.tags || "",
          author:
            (blog.author && (blog.author.name || blog.author)) ||
            blog.author_name ||
            blog.author ||
            "Admin",
          publishdate: toLocalDateInput(
            blog.publishdate || blog.publishDate || blog.published_at || ""
          ),
          metatitle: blog.metatitle || blog.meta_title || "",
          metadescription: blog.metadescription || blog.meta_description || "",
          keywords: blog.keywords || "",
          status:
            blog.status === 1 ||
            blog.status === "1" ||
            blog.status === "published" ||
            blog.status === "Published"
              ? "published"
              : "draft",
          featured: isFeaturedValue(
            blog.featured ?? blog.isFeatured ?? blog.is_featured
          ),
        });

        const existingImage =
          blog.featured_image_url || blog.featuredimage || blog.image || "";
        if (existingImage) setPreview(toAbsUrl(existingImage));

        const rawFaqs = blog.faqs ?? blog.faq ?? [];
        const parsedFaqs =
          typeof rawFaqs === "string"
            ? (() => {
                try {
                  return JSON.parse(rawFaqs);
                } catch {
                  return [];
                }
              })()
            : rawFaqs;
        setFaqs(
          Array.isArray(parsedFaqs)
            ? parsedFaqs.map((f) => ({
                question: f?.question || "",
                answer: f?.answer || "",
              }))
            : [],
        );

        // Related blogs may arrive as an array, a JSON string, or a
        // comma-separated string, of ids or of {id, ...} objects.
        let rawRelated = blog.relatedBlogs ?? blog.related_blogs ?? [];
        if (typeof rawRelated === "string") {
          const t = rawRelated.trim();
          if (t.startsWith("[")) {
            try {
              rawRelated = JSON.parse(t);
            } catch {
              rawRelated = [];
            }
          } else {
            rawRelated = t ? t.split(",") : [];
          }
        }
        const relatedIds = [];
        (Array.isArray(rawRelated) ? rawRelated : []).forEach((r) => {
          const rid = r && typeof r === "object" ? r.id : r;
          const key = String(rid ?? "").trim();
          if (!key || key === String(id) || relatedIds.includes(key)) return;
          relatedIds.push(key);
        });
        setRelatedBlogs(relatedIds);
      } catch (e) {
        console.error(e);
        showError("Failed to load blog");
      } finally {
        setInitializing(false);
      }
    };

    load();
  }, [isEdit, blogId]);

  // -------- validations --------
  const requiredFieldsCreate = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "shortdes", label: "Short Description" },
    { key: "content", label: "Content" },
    { key: "category", label: "Category" },
    { key: "author", label: "Author" },
    { key: "publishdate", label: "Publish Date" },
    { key: "metatitle", label: "Meta Title" },
    { key: "metadescription", label: "Meta Description" },
    { key: "keywords", label: "Keywords" },
  ];

  const requiredFieldsEdit = [...requiredFieldsCreate];

  async function submitToApi(payload) {
    const fd = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      const value = v && typeof v === "object" ? JSON.stringify(v) : (v ?? "");
      fd.append(k, value);
    });
    if (image) fd.append("featuredimage", image);

    // Log the exact payload being sent (faqs included) so it's easy to
    // verify in devtools what the API actually receives.
    console.log("[uploadblogs] API payload:", {
      ...payload,
      faqs: payload.faqs,
      featuredimage: image ? image.name : undefined,
      id: isEdit ? blogId : undefined,
    });

    if (!isEdit) {
      const res = await callApiWithFile(constant.API.BLOG, "POST", fd);
      const ok =
        (res && (res.status === true || res.status === "1")) || res === 1;
      if (!ok) throw new Error((res && res.message) || "Failed to save blog");
      return res;
    }

    fd.append("id", blogId);
    const res = await callApiWithFile(constant.API.BLOG, "POST", fd);
    const ok =
      (res && (res.status === true || res.status === "1")) || res === 1;
    if (!ok) throw new Error((res && res.message) || "Failed to update blog");
    return res;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const fields = isEdit ? requiredFieldsEdit : requiredFieldsCreate;
    for (const field of fields) {
      if (!formData[field.key] || String(formData[field.key]).trim() === "") {
        showError(`${field.label} is required`);
        return;
      }
    }
    if (!isEdit && !image) {
      showError("Featured Image is required");
      return;
    }
    // FAQs are optional overall, but any FAQ that was added must be filled
    // in completely before submitting.
    for (const [i, f] of faqs.entries()) {
      if (isHtmlEmpty(f.question) || isHtmlEmpty(f.answer)) {
        showError(`FAQ #${i + 1} needs both a question and an answer`);
        return;
      }
    }

    try {
      setSubmitting(true);
      await submitToApi({
        ...formData,
        faqs,
        relatedBlogs: relatedBlogs.map(String),
        isFeatured: formData.featured,
        status: "published",
      });
      showSuccess(
        isEdit ? "Blog updated successfully" : "Blog saved successfully",
      );

      // Only one blog may be featured at a time. The backend doesn't
      // enforce that itself, so clear the flag on every other blog now that
      // this one is saved as featured.
      if (formData.featured) {
        try {
          const { cleared, failed } = await unfeatureOtherBlogs({
            keepId: isEdit ? blogId : null,
            keepSlug: formData.slug,
          });
          if (cleared.length > 0) {
            showSuccess("This is now the only Featured Blog.");
          }
          if (failed.length > 0) {
            showError(
              "Saved, but couldn't un-feature " +
                failed.length +
                " other blog(s). Edit them and untick “Set as Featured Blog”."
            );
          }
        } catch {
          showError(
            "Saved, but couldn't check for other Featured Blogs. Please verify on the Blogs page."
          );
        }
        setCurrentFeatured({
          id: isEdit ? blogId : null,
          slug: formData.slug,
          title: formData.title,
        });
      } else if (
        isEdit &&
        currentFeatured &&
        String(currentFeatured.id) === String(blogId)
      ) {
        setCurrentFeatured(null);
      }

      resetAll();

      if (isEdit) {
        router.replace(router.pathname, undefined, { shallow: true });
      }
    } catch (err) {
      console.error(err);
      showError(err.message || "Network or server error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraftClick = async () => {
    if (submitting) return;
    if (!formData.title.trim()) {
      showError("Title is required for a draft");
      return;
    }
    try {
      setSubmitting(true);
      await submitToApi({
        ...formData,
        faqs,
        relatedBlogs: relatedBlogs.map(String),
        isFeatured: formData.featured,
        status: "draft",
      });
      showSuccess(isEdit ? "Draft updated" : "Draft saved");
    } catch (err) {
      console.error(err);
      showError(err.message || "Network or server error");
    } finally {
      setSubmitting(false);
    }
  };

  // ------------------- UI -------------------
  if (initializing) {
    return (
      <div className="min-h-screen grid place-items-center text-sm text-gray-500">
        Loading blog…
      </div>
    );
  }

  return (
    <div className="relative min-h-screen ">
      <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(60%_60%_at_50%_10%,black,transparent)]">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl bg-sky-100" />
        <div className="absolute -top-10 right-0 h-72 w-72 rounded-full blur-3xl bg-indigo-100" />
      </div>

      <div className="pt-10 sm:pt-12 md:pt-15">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                {isEdit ? "Edit Blog" : "Create a New Blog"}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-500">
                {isEdit
                  ? "Update your post and save changes."
                  : "Craft your post, add SEO, and publish when you’re ready."}
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border bg-white/70 backdrop-blur px-3 py-1 text-xs text-gray-600 shadow-sm">
              ✨ Health Square Blog
            </span>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="mt-6 mb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-2xl border border-gray-300 bg-white/80 backdrop-blur shadow-xl ring-1 ring-black/5">
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-gray-300 bg-gradient-to-r from-white to-sky-50/50 rounded-t-2xl">
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-gray-700">
                  Editor
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100">
                  ⌘S <span className="hidden md:inline">to save</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100">
                  ⌘/ <span className="hidden md:inline">shortcuts</span>
                </span>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-8"
            >
              {/* LEFT SIDE */}
              <div className="lg:col-span-2 space-y-3">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a compelling blog title"
                    className="inputcls"
                  />
                  <p className="text-xs text-gray-500">
                    Keep it clear and keyword-rich.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Slug <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="auto-generated or custom"
                    className="inputcls"
                  />
                  <p className="text-xs text-gray-500">
                    Example:{" "}
                    <span className="font-mono">best-dental-plans</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold text-gray-700">
                      Short Description <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-xs text-gray-400">
                      150–200 characters
                    </span>
                  </div>
                  <textarea
                    name="shortdes"
                    value={formData.shortdes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="A quick teaser of the blog…"
                    className="inputcls"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Content <span className="text-rose-500">*</span>
                  </label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(html) =>
                      setFormData((prev) => ({ ...prev, content: html }))
                    }
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      Tip: Use headings, bullets, and short paragraphs.
                    </span>
                    <span className="hidden sm:inline">
                      Autosave coming soon 💾
                    </span>
                  </div>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[800px] bg-white">
                  <div className="flex items-center justify-start mt-1">
                    <label className="block text-sm font-semibold text-gray-700">
                      Frequently Asked Questions{" "}
                      <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                  </div>

                  {faqs.length > 0 && (
                    <div className="space-y-3">
                      {faqs.map((faq, i) => (
                        <div
                          key={i}
                          className="space-y-2 rounded-xl border border-[#e5e7eb] bg-white shadow-sm p-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-500">
                              FAQ #{i + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFaq(i)}
                              className="inline-flex items-center gap-1 rounded-full pl-2 pr-2.5 py-1 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 transition-colors"
                              title="Remove FAQ"
                            >
                              <HiX className="h-3.5 w-3.5" />
                              Remove
                            </button>
                          </div>
                          <div>
                            <span className="block text-xs text-gray-500 mb-1">
                              Question — select text and use the link icon to
                              link just that word/phrase
                            </span>
                            <RichTextEditor
                              value={faq.question}
                              onChange={(html) =>
                                updateFaq(i, "question", html)
                              }
                              minimal
                              height={90}
                              placeholder="Question"
                            />
                          </div>
                          <div>
                            <span className="block text-xs text-gray-500 mb-1">
                              Answer — select text and use the link icon to
                              link just that word/phrase
                            </span>
                            <RichTextEditor
                              value={faq.answer}
                              onChange={(html) => updateFaq(i, "answer", html)}
                              minimal
                              height={140}
                              placeholder="Answer"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                <div className="flex items-center justify-end mt-1">
                  <button
                    type="button"
                    onClick={addFaq}
                    className="px-3 py-1.5 cursor-pointer thmbtn rounded-2xl text-sm"
                  >
                    + Add
                  </button>
                </div>
                </div>
              </div>

              <div className="space-y-8 lg:pl-2">
                <div className="space-y-3 rounded-xl border border-[#e5e7eb] bg-white shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">
                      Featured Image{" "}
                      {isEdit ? "" : <span className="text-rose-500">*</span>}
                    </label>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                      Auto-resized to 1200×800
                    </span>
                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4
                      file:rounded-lg file:border-0 file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100
                      cursor-pointer"
                  />

                  {preview ? (
                    <Image
                      src={preview}
                      alt="Preview"
                      width={800}
                      height={450}
                      className="mt-3 aspect-[16/9] w-full rounded-lg border border-[#e5e7eb] object-cover shadow-sm"
                      unoptimized
                    />
                  ) : (
                    <div className="mt-3 aspect-[16/9] w-full rounded-lg border border-dashed grid place-items-center text-gray-400">
                      <div className="text-center text-xs">
                        No image selected
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="inputcls"
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={newCat}
                      onChange={(e) => setNewCat(e.target.value)}
                      placeholder="Add new category"
                      className="flex-1 inputcls"
                    />
                    <button
                      type="button"
                      onClick={addCategory}
                      className="px-3 py-2 cursor-pointer thmbtn rounded-2xl"
                    >
                      Add
                    </button>
                  </div>

                  {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {categories.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs shadow-sm"
                        >
                          {c}
                          <button
                            type="button"
                            onClick={() => deleteCategory(c)}
                            className="rounded-full p-0.5 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors"
                            title="Delete category"
                          >
                            <HiX className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g. dental, pharmacy"
                    className="inputcls"
                  />
                  <p className="text-xs text-gray-500">
                    Separate with commas:{" "}
                    <span className="font-mono">dental, health,pharmacy</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Related Blogs{" "}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <RelatedBlogsSelect
                    options={blogOptions}
                    value={relatedBlogs}
                    onChange={setRelatedBlogs}
                    excludeId={blogId}
                    loading={blogOptionsLoading}
                    error={blogOptionsError}
                  />
                  <p className="text-xs text-gray-500">
                    Pick other posts readers might want to see next.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Author <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="inputcls"
                  >
                    <option value="">Select author</option>
                    {authors.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="Add new author"
                      className="flex-1 inputcls"
                    />
                    <button
                      type="button"
                      onClick={addAuthor}
                      className="px-3 py-2 cursor-pointer thmbtn rounded-2xl"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Publish Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="publishdate"
                    value={formData.publishdate}
                    onChange={handleChange}
                    className="inputcls"
                  />
                </div>

                <div className="space-y-3 rounded-xl border border-[#e5e7eb] bg-white shadow-sm p-4">
                  <h2 className="text-sm font-semibold text-gray-700">
                    SEO Settings
                  </h2>

                  <label className="block text-xs font-medium text-gray-700">
                    Meta Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="metatitle"
                    value={formData.metatitle}
                    onChange={handleChange}
                    placeholder="Meta Title"
                    className="inputcls"
                  />

                  <label className="block text-xs font-medium text-gray-700">
                    Meta Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="metadescription"
                    value={formData.metadescription}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Meta Description"
                    className="inputcls"
                  />

                  <label className="block text-xs font-medium text-gray-700">
                    Keywords <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    placeholder="Keywords (comma separated)"
                    className="inputcls"
                  />
                </div>

                <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm divide-y divide-[#e5e7eb]">
                  <div className="p-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="w-4 h-4 shrink-0 accent-[#04A868] cursor-pointer rounded border-gray-300"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Set as Featured Blog
                      </span>
                    </label>
                    <p className="mt-1.5 pl-6 text-xs leading-relaxed text-gray-500">
                      {formData.featured &&
                      currentFeatured &&
                      String(currentFeatured.id) !== String(blogId) &&
                      currentFeatured.slug !== formData.slug ? (
                        <>
                          Replaces the current Featured Blog:{" "}
                          <span className="font-semibold text-blue-500">
                            “{currentFeatured.title}”
                          </span>
                          .
                        </>
                      ) : (
                        "Shown at the top of the Blogs page. Only one blog can be featured at a time."
                      )}
                    </p>
                  </div>

                  <div className="p-4 flex items-center justify-between gap-3">
                    <label
                      htmlFor="blog-status"
                      className="text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <select
                      id="blog-status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="inputcls !w-40"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Publish</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 border-t border-[#e5e7eb] pt-6 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handleSaveDraftClick}
                  disabled={submitting}
                  className="px-6 py-2 thmbtn rounded-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isEdit ? "Save Draft (Update)" : "Save Draft"}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 thmbtn rounded-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? isEdit
                      ? "Updating…"
                      : "Publishing…"
                    : isEdit
                      ? "Update"
                      : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
