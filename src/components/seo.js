import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = "https://healthsquare.in";

export default function Seo({ title = "Health Square", description, currentUrl, image, noindex = false }) {
  const router = useRouter();
  // Always emit a non-www, https canonical — fall back to the current path when a page doesn't pass one.
  const path = (router?.asPath || "/").split(/[?#]/)[0].replace(/\/+$/, "");
  const canonical = currentUrl || `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Health Square" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
    </Head>
  );
}
