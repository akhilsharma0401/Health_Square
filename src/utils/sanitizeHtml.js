import constant from "@/src/env";

// Resolve a possibly-relative asset path (e.g. from the CMS) to an absolute
// URL against the API's base URL.
export const toAbs = (url) => {
  if (!url || typeof url !== "string") return "";
  if (url.startsWith("http")) return url;
  const clean = url.startsWith("/") ? url : `/${url}`;
  return `${constant.BASE_URL}${clean}`;
};

export const stripHtml = (s = "") =>
  s
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Lightly sanitizes CMS-authored HTML (strips <script>, inline event
// handlers, and null/undefined src|href) and makes relative asset paths
// absolute — without stripping normal formatting or <a> links, which must
// stay intact and clickable.
export const sanitizeAndAbsolutize = (html = "") => {
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

  html = html.replace(/<h1([^>]*)>/gi, (match, attrs) => {
    const tailwind = "text-2xl md:text-4xl font-semibold mb-2";
    if (/class=/i.test(attrs)) {
      return match.replace(
        /class=(["'])(.*?)\1/i,
        (m, q, cls) => `class=${q}${cls} ${tailwind}${q}`
      );
    }
    return `<h2${attrs} class="${tailwind}">`;
  });
  html = html.replace(/<h2([^>]*)>/gi, (match, attrs) => {
    const tailwind = "text-xl md:text-3xl font-semibold mb-2";
    if (/class=/i.test(attrs)) {
      return match.replace(
        /class=(["'])(.*?)\1/i,
        (m, q, cls) => `class=${q}${cls} ${tailwind}${q}`
      );
    }
    return `<h2${attrs} class="${tailwind}">`;
  });

  return html;
};

// The CMS wraps question/answer text in its own outer <p>...</p>. That's
// fine inside a <div> (the answer panel), but a question renders inside an
// <h3>/<button> where a block-level <p> isn't valid nested content — so
// unwrap a single outer <p> wrapper, keeping inner markup (like <a> links)
// intact, before injecting it there.
export const unwrapOuterP = (html = "") => {
  const trimmed = String(html || "").trim();
  const match = trimmed.match(/^<p[^>]*>([\s\S]*)<\/p>$/i);
  return match ? match[1] : trimmed;
};

// Same idea, scoped for short FAQ question/answer HTML: strips script/event
// handlers and null hrefs, keeps <a> links and inline formatting intact, but
// skips the heading-restyling rules (irrelevant for a one-line question or a
// short answer) and forces external links to open safely in a new tab.
export const sanitizeFaqHtml = (html = "") => {
  if (!html || typeof html !== "string") return "";

  html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "");
  html = html.replace(/(src|href)=["'](null|undefined)["']/gi, '$1="#"');
  html = html.replace(
    /src=["'](?!https?:|data:|\/)([^"']+)["']/gi,
    (m, path) => `src="${constant.BASE_URL}/${path}"`
  );

  // Any <a> that doesn't already declare a target opens in a new tab, with
  // rel="noopener noreferrer" for safety.
  html = html.replace(/<a\s+(?![^>]*target=)([^>]*)>/gi, (m, attrs) => {
    const withRel = /rel=/i.test(attrs)
      ? attrs
      : `${attrs} rel="noopener noreferrer"`;
    return `<a ${withRel} target="_blank">`;
  });

  return html;
};
