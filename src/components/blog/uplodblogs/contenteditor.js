"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";

// lazy-load editor on client only
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// Default toolbar for the main blog content editor.
const FULL_BUTTONS = [
  "source", "|",
  "bold", "italic", "underline", "strikethrough", "|",
  "ul", "ol", "indent", "outdent", "|",
  "font", "fontsize", "brush", "paragraph", "|",
  "align", "link", "image", "table", "hr", "|",
  "undo", "redo", "fullsize", "selectall", "print", "eraser",
];

// Compact toolbar for short fields (e.g. FAQ question/answer) where only
// basic formatting and linking are needed — select text, add/edit/remove a
// link on just that selection, no images/tables/source clutter.
const COMPACT_BUTTONS = [
  "bold", "italic", "underline", "|",
  "link", "unlink", "|",
  "undo", "redo", "eraser",
];

export default function RichTextEditor({
  value = "",
  onChange = () => {},
  height = 400,
  minimal = false,
  placeholder = "Write your blog content here…",
}) {
  const editorRef = useRef(null);
  const [activeTab, setActiveTab] = useState("visual");
  const [textValue, setTextValue] = useState(value);

  // sync text tab with external value
  useEffect(() => {
    if (activeTab === "text") {
      setTextValue(value);
    }
  }, [value, activeTab]);

  // editor config
  const config = useMemo(
    () => ({
      readonly: false,
      height,
      toolbarAdaptive: false,
      toolbarSticky: false,
      placeholder,
      disablePlugins: ["powered-by-jodit", "autosave"],
      uploader: { insertImageAsBase64URI: true },
      // Jodit's link dialog already covers: entering/pasting a URL, only
      // wrapping the current selection (not the whole block), editing an
      // existing link by re-opening the dialog on it, removing a link via
      // "unlink", and an "open in new tab" checkbox that sets target="_blank".
      buttons: minimal ? COMPACT_BUTTONS : FULL_BUTTONS,
    }),
    [height, minimal, placeholder]
  );

  // tab button (reusable)
  const TabButton = ({ id, children }) => {
    const isActive = activeTab === id;
    return (
      <button
        type="button"
        onClick={() => setActiveTab(id)}
        className={[
          "px-3 py-1.5 text-sm cursor-pointer rounded-lg border transition",
          isActive
            ? "thmbtn  shadow-sm"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
        ].join(" ")}
      >
        {children}
      </button>
    );
  };

  // Minimal mode skips the Visual/Text tab switcher (raw-HTML editing isn't
  // useful for a one-line question or short answer) and just renders the
  // Jodit editor directly with the compact toolbar.
  if (minimal) {
    return (
      <div className="w-full rounded-xl overflow-hidden border border-[#e5e7eb]">
        <JoditEditor
          ref={editorRef}
          value={value}
          config={config}
          onBlur={(newContent) => onChange(newContent)}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="mb-3 flex items-center gap-2">
        <TabButton id="visual">Visual</TabButton>
        <TabButton id="text">Text</TabButton>
      </div>

      {/* Editors */}
      {activeTab === "visual" ? (
        <div className="rounded-xl overflow-hidden border border-[#e5e7eb]">
          <JoditEditor
            ref={editorRef}
            value={value}
            config={config}
            onBlur={(newContent) => onChange(newContent)}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-[#e5e7eb]">
          <textarea
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value);
              onChange(e.target.value);
            }}
            style={{ height: typeof height === "number" ? height : 400 }}
            className="w-full p-3 font-mono text-sm bg-white outline-none rounded-xl"
            placeholder="Edit raw HTML here…"
          />
        </div>
      )}
    </div>
  );
}
