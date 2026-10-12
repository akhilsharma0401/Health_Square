"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HiX, HiChevronDown, HiSearch } from "react-icons/hi";

/**
 * Searchable multi-select for picking related blogs.
 *
 * Props
 *  - options:   [{ id, title }] — every blog that can be picked
 *  - value:     array of selected blog ids (strings or numbers)
 *  - onChange:  (nextIds[]) => void
 *  - excludeId: id of the blog being edited, never offered as an option
 *  - loading / error: state of the options fetch
 *
 * The panel stays open while ticking boxes, closes on outside click or
 * Escape. Selected ids that aren't in `options` (e.g. a related blog that
 * was since deleted or is a draft) still render as a chip so edit mode
 * always reflects what's actually saved, and can be removed.
 */
export default function RelatedBlogsSelect({
  options = [],
  value = [],
  onChange = () => {},
  excludeId = "",
  loading = false,
  error = "",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef(null);

  const selected = useMemo(() => value.map((v) => String(v)), [value]);
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const available = useMemo(
    () => options.filter((o) => String(o.id) !== String(excludeId)),
    [options, excludeId]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return available;
    return available.filter((o) => String(o.title).toLowerCase().includes(q));
  }, [available, query]);

  const titleById = useMemo(() => {
    const m = new Map();
    options.forEach((o) => m.set(String(o.id), o.title));
    return m;
  }, [options]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (id) => {
    const key = String(id);
    if (selectedSet.has(key)) {
      onChange(value.filter((v) => String(v) !== key));
    } else {
      // Set-based check above already prevents duplicates.
      onChange([...value, id]);
    }
  };

  const remove = (id) => onChange(value.filter((v) => String(v) !== String(id)));

  return (
    <div ref={rootRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inputcls w-full flex items-center justify-between gap-2 text-left"
      >
        <span className="text-gray-500 text-sm truncate">
          {loading
            ? "Loading blogs…"
            : selected.length > 0
            ? `${selected.length} blog${selected.length > 1 ? "s" : ""} selected`
            : "Select related blogs"}
        </span>
        <HiChevronDown
          className={`shrink-0 h-4 w-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-30 mt-2 w-full rounded-xl border border-[#e5e7eb] bg-white shadow-lg">
          <div className="flex items-center gap-2 border-b border-[#e5e7eb] px-3 py-2">
            <HiSearch className="h-4 w-4 text-gray-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blogs by title…"
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>

          <ul
            role="listbox"
            aria-multiselectable="true"
            className="max-h-64 overflow-y-auto py-1"
          >
            {loading ? (
              <li className="px-3 py-3 text-sm text-gray-500">Loading blogs…</li>
            ) : error ? (
              <li className="px-3 py-3 text-sm text-rose-600">{error}</li>
            ) : available.length === 0 ? (
              <li className="px-3 py-3 text-sm text-gray-500">
                No other blogs available to relate yet.
              </li>
            ) : filtered.length === 0 ? (
              <li className="px-3 py-3 text-sm text-gray-500">
                No blogs match “{query}”.
              </li>
            ) : (
              filtered.map((o) => {
                const checked = selectedSet.has(String(o.id));
                return (
                  <li key={o.id} role="option" aria-selected={checked}>
                    <label className="flex items-start gap-3 px-3 py-2 cursor-pointer hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(o.id)}
                        className="mt-0.5 h-4 w-4 accent-[#0E76CD] shrink-0"
                      />
                      <span className="text-sm text-gray-800 leading-snug">
                        {o.title}
                      </span>
                    </label>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-3">
          {selected.map((id) => (
            <span
              key={id}
              className="inline-flex max-w-full items-center gap-1.5 rounded-full border bg-white pl-3 pr-1.5 py-1 text-xs shadow-sm"
            >
              <span className="truncate">
                {titleById.get(id) || `Blog #${id}`}
              </span>
              <button
                type="button"
                onClick={() => remove(id)}
                className="rounded-full p-0.5 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors shrink-0"
                title="Remove related blog"
                aria-label={`Remove ${titleById.get(id) || `blog ${id}`}`}
              >
                <HiX className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
