// Layout-matched skeleton for the blog post page (src/pages/blog/[slug].js).
// Same grid / container / spacing as the real page so the content swaps in
// without a layout shift. Pure placeholders — no spinner, no progress bar.
const Bar = ({ className = "" }) => (
  <div className={`rounded bg-slate-200 ${className}`} />
);

export default function BlogDetailSkeleton() {
  return (
    <main
      className="relative w-full overflow-hidden animate-pulse"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading blog post…</span>

      {/* Hero: text column + image (same grid as the page) */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 grid-cols-1 items-center justify-between gap-5 px-4 py-2 md:py-10">
        <div className="relative z-10 flex flex-col gap-6 max-w-2xl w-full">
          {/* Category + tags */}
          <div className="space-y-2 md:order-1 order-3 flex flex-col items-center md:items-start">
            <div className="h-6 w-28 rounded-lg bg-slate-200" />
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <div className="h-5 w-10 rounded bg-slate-200" />
              <div className="h-5 w-20 rounded-md bg-slate-200" />
              <div className="h-5 w-16 rounded-md bg-slate-200" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3 md:order-2 order-1">
            <Bar className="h-7 md:h-8 w-full" />
            <Bar className="h-7 md:h-8 w-4/5" />
            <Bar className="h-7 md:h-8 w-2/5" />
          </div>

          {/* Author / date / read time */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:order-3 order-2">
            <div className="h-7 w-24 rounded-full bg-slate-200" />
            <div className="h-7 w-32 rounded-full bg-slate-200" />
            <div className="h-7 w-28 rounded-full bg-slate-200" />
          </div>

          {/* Share / Copy */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:order-4 order-4">
            <div className="h-10 w-28 rounded-full bg-slate-200" />
            <div className="h-10 w-32 rounded-full bg-slate-200" />
          </div>
        </div>

        {/* Featured image */}
        <div className="relative w-full aspect-[3/2] rounded-2xl bg-slate-200 shadow-xl" />
      </section>

      {/* Breadcrumb + article */}
      <section className="relative bg-gradient-to-b from-[#f8fbff] to-white py-5 md:py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-2 md:mb-10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bar className="h-4 w-12" />
              <Bar className="h-4 w-3" />
              <Bar className="h-4 w-14" />
              <Bar className="h-4 w-3" />
              <Bar className="h-4 w-40" />
            </div>
            <Bar className="h-4 w-14" />
          </div>

          <div className="bg-white/80 border border-slate-100 rounded-[28px] shadow-lg ring-1 ring-slate-200/30 p-4 md:p-12">
            <Bar className="h-8 w-3/4 mb-6" />
            <div className="space-y-3 mb-8">
              <Bar className="h-4 w-full" />
              <Bar className="h-4 w-full" />
              <Bar className="h-4 w-11/12" />
              <Bar className="h-4 w-2/3" />
            </div>

            <Bar className="h-6 w-1/2 mb-5" />
            <div className="space-y-3 mb-8">
              <Bar className="h-4 w-full" />
              <Bar className="h-4 w-10/12" />
              <Bar className="h-4 w-full" />
              <Bar className="h-4 w-3/4" />
            </div>

            <Bar className="h-48 md:h-64 w-full rounded-2xl mb-8" />

            <Bar className="h-6 w-2/5 mb-5" />
            <div className="space-y-3">
              <Bar className="h-4 w-full" />
              <Bar className="h-4 w-11/12" />
              <Bar className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
