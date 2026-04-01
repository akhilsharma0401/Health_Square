import Head from "next/head";

export default function Seo({ title = "DigiBima", description, currentUrl }) {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
}
