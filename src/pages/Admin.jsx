import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLock,
  FiTrash2,
  FiPlus,
  FiUpload,
  FiLogOut,
  FiRefreshCcw,
  FiSave,
  FiImage,
  FiVideo,
  FiMusic,
  FiCheck,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import { useContent } from "../context/ContentContext.jsx";
import { defaultContent } from "../data/defaultContent.js";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TABS = [
  "General",
  "Timeline",
  "Gallery",
  "Videos",
  "Letters",
  "Quotes",
  "Playlist",
];

const inputClass =
  "w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors";

function Field({ label, children }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs uppercase tracking-widest text-rose-300 mb-1.5 font-medium">
        {label}
      </span>
      {children}
    </label>
  );
}

// ─── Media Upload Components ──────────────────────────────────────────────────

function UploadButton({ accept, icon: Icon, label, onUpload, uploading }) {
  const inputRef = useRef();

  async function handleChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    await onUpload(file);
    e.target.value = "";
  }

  return (
    <label
      className={`shrink-0 flex items-center gap-1.5 cursor-pointer px-3 py-2 rounded-lg border transition-all text-xs font-medium
        ${
          uploading
            ? "border-rose-400/50 text-rose-300 bg-rose-400/10 cursor-not-allowed"
            : "border-white/20 text-white/70 hover:border-rose-400 hover:text-rose-300 hover:bg-rose-400/10"
        }`}
    >
      {uploading ? (
        <span className="animate-spin">
          <FiLoader size={12} />
        </span>
      ) : (
        <Icon size={12} />
      )}
      {uploading ? "Uploading…" : label}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        disabled={uploading}
      />
    </label>
  );
}

function ImageInput({ value, onChange }) {
  const { uploadFile } = useContent();
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  async function handleFile(file) {
    setErr("");
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (e) {
      setErr(e.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {value && (
          <img
            src={value}
            alt="preview"
            className="w-14 h-14 rounded-lg object-cover border border-white/20 shrink-0"
          />
        )}
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or upload below"
          className={inputClass + " flex-1"}
        />
        <UploadButton
          accept="image/*"
          icon={FiImage}
          label="Upload"
          onUpload={handleFile}
          uploading={uploading}
        />
      </div>
      {err && <p className="text-red-400 text-xs">{err}</p>}
    </div>
  );
}

function VideoInput({ value, onChange }) {
  const { uploadFile } = useContent();
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  async function handleFile(file) {
    setErr("");
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (e) {
      setErr(e.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Video URL or upload (mp4, mov…)"
          className={inputClass + " flex-1"}
        />
        <UploadButton
          accept="video/*"
          icon={FiVideo}
          label="Upload"
          onUpload={handleFile}
          uploading={uploading}
        />
      </div>
      {value && (
        <video
          src={value}
          controls
          className="w-full max-h-32 rounded-lg object-cover border border-white/20"
        />
      )}
      {err && <p className="text-red-400 text-xs">{err}</p>}
    </div>
  );
}

function AudioInput({ value, onChange }) {
  const { uploadFile } = useContent();
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  async function handleFile(file) {
    setErr("");
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (e) {
      setErr(e.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Audio URL or upload (mp3, wav…)"
          className={inputClass + " flex-1"}
        />
        <UploadButton
          accept="audio/*"
          icon={FiMusic}
          label="Upload"
          onUpload={handleFile}
          uploading={uploading}
        />
      </div>
      {value && <audio src={value} controls className="w-full rounded-lg" />}
      {err && <p className="text-red-400 text-xs">{err}</p>}
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // সরাসরি Render-এর সঠিক এপিআই লিংকে হিট করবে
      const res = await fetch(
        "https://love-story-9e55.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: pass }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        // টোকেন সেভ করে সাকসেস ফাংশন রান করবে
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("token", data.token);
        onSuccess();
      } else {
        setError(data.message || "Incorrect password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 px-6">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl"
      >
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center">
          <FiLock className="text-rose-300" size={28} />
        </div>
        <h1 className="text-white font-bold text-2xl mb-1">Admin Access</h1>
        <p className="text-white/50 text-sm mb-6">
          Enter password to manage your love story
        </p>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm mb-3 text-center text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors"
          autoFocus
        />
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-xs mb-3 justify-center">
            <FiAlertCircle size={12} />
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all text-white text-sm font-semibold tracking-wide shadow-lg disabled:opacity-60"
        >
          {loading ? "Verifying…" : "Enter"}
        </button>
        <p className="text-white/30 text-[10px] mt-4">
          Default password: <span className="text-white/50">ourlovestory</span>
        </p>
        <Link
          to="/"
          className="block mt-3 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          ← back to site
        </Link>
      </motion.form>
    </div>
  );
}

// ─── List Editor ─────────────────────────────────────────────────────────────

function ListEditor({ listName, itemShape, renderFields, addLabel }) {
  const { content, addItem, updateItem, deleteItem } = useContent();
  const items = content[listName] || [];

  function handleAdd() {
    addItem(listName, { id: `${listName}-${Date.now()}`, ...itemShape });
  }

  return (
    <div>
      <AnimatePresence>
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4"
          >
            {renderFields(item, (patch) =>
              updateItem(listName, item.id, patch),
            )}
            <button
              onClick={() => deleteItem(listName, item.id)}
              className="mt-3 flex items-center gap-1 text-xs text-red-400/70 hover:text-red-400 transition-colors"
            >
              <FiTrash2 size={12} /> Remove
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <button
        onClick={handleAdd}
        className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-dashed border-white/20 hover:border-rose-400 hover:text-rose-300 text-white/60 w-full justify-center transition-colors"
      >
        <FiPlus size={14} /> {addLabel}
      </button>
    </div>
  );
}

// ─── Tab Panels ───────────────────────────────────────────────────────────────

function GeneralTab() {
  const { content, updateField, update, resetToDefaults } = useContent();
  return (
    <div>
      <h3 className="text-white/90 font-semibold text-lg mb-4">
        Couple Details
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Your name">
          <input
            className={inputClass}
            value={content.couple?.nameA || ""}
            onChange={(e) => updateField("couple", "nameA", e.target.value)}
          />
        </Field>
        <Field label="Her / His name">
          <input
            className={inputClass}
            value={content.couple?.nameB || ""}
            onChange={(e) => updateField("couple", "nameB", e.target.value)}
          />
        </Field>
      </div>
      <Field label="Tagline">
        <input
          className={inputClass}
          value={content.couple?.tagline || ""}
          onChange={(e) => updateField("couple", "tagline", e.target.value)}
        />
      </Field>

      <h3 className="text-white/90 font-semibold text-lg mb-4 mt-8">
        Hero Section
      </h3>
      <Field label="Eyebrow text">
        <input
          className={inputClass}
          value={content.hero?.eyebrow || ""}
          onChange={(e) => updateField("hero", "eyebrow", e.target.value)}
        />
      </Field>
      <Field label="Hero heading">
        <input
          className={inputClass}
          value={content.hero?.heading || ""}
          onChange={(e) => updateField("hero", "heading", e.target.value)}
        />
      </Field>
      <Field label="Hero image">
        <ImageInput
          value={content.hero?.heroImage || ""}
          onChange={(v) => updateField("hero", "heroImage", v)}
        />
      </Field>
      <Field label="Typed messages (one per line)">
        <textarea
          className={inputClass}
          rows={4}
          value={(content.hero?.typedMessages || []).join("\n")}
          onChange={(e) =>
            updateField(
              "hero",
              "typedMessages",
              e.target.value.split("\n").filter(Boolean),
            )
          }
        />
      </Field>

      <h3 className="text-white/90 font-semibold text-lg mb-4 mt-8">
        Countdown & Footer
      </h3>
      <Field label="Anniversary date & time">
        <input
          type="datetime-local"
          className={inputClass}
          value={content.countdownDate?.slice(0, 16) || ""}
          onChange={(e) => update("countdownDate", e.target.value)}
        />
      </Field>
      <Field label="Footer message">
        <input
          className={inputClass}
          value={content.footerMessage || ""}
          onChange={(e) => update("footerMessage", e.target.value)}
        />
      </Field>

      <h3 className="text-white/90 font-semibold text-lg mb-4 mt-8">
        Security
      </h3>
      <Field label="Admin password">
        <input
          type="text"
          className={inputClass}
          value={content.adminPassword || ""}
          onChange={(e) => update("adminPassword", e.target.value)}
          placeholder="Change your admin password"
        />
      </Field>

      <button
        onClick={() =>
          window.confirm("Reset ALL content to starter defaults?") &&
          resetToDefaults()
        }
        className="flex items-center gap-2 text-xs text-red-400/70 hover:text-red-400 mt-6 transition-colors"
      >
        <FiRefreshCcw size={12} /> Reset everything to defaults
      </button>
    </div>
  );
}

function TimelineTab() {
  return (
    <ListEditor
      listName="timeline"
      itemShape={{
        date: "New date",
        title: "New memory",
        description: "Tell the story…",
        image: "",
      }}
      addLabel="Add timeline memory"
      renderFields={(item, patch) => (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Date label">
              <input
                className={inputClass}
                value={item.date || ""}
                onChange={(e) => patch({ date: e.target.value })}
              />
            </Field>
            <Field label="Title">
              <input
                className={inputClass}
                value={item.title || ""}
                onChange={(e) => patch({ title: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Description">
            <textarea
              className={inputClass}
              rows={3}
              value={item.description || ""}
              onChange={(e) => patch({ description: e.target.value })}
            />
          </Field>
          <Field label="Photo">
            <ImageInput
              value={item.image || ""}
              onChange={(v) => patch({ image: v })}
            />
          </Field>
        </>
      )}
    />
  );
}

function GalleryTab() {
  return (
    <ListEditor
      listName="gallery"
      itemShape={{ src: "", category: "us", caption: "New memory" }}
      addLabel="Add photo"
      renderFields={(item, patch) => (
        <>
          <Field label="Photo">
            <ImageInput
              value={item.src || ""}
              onChange={(v) => patch({ src: v })}
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Category">
              <input
                className={inputClass}
                value={item.category || ""}
                onChange={(e) => patch({ category: e.target.value })}
              />
            </Field>
            <Field label="Caption">
              <input
                className={inputClass}
                value={item.caption || ""}
                onChange={(e) => patch({ caption: e.target.value })}
              />
            </Field>
          </div>
        </>
      )}
    />
  );
}

function VideosTab() {
  return (
    <ListEditor
      listName="videos"
      itemShape={{ title: "New video", thumbnail: "", videoUrl: "" }}
      addLabel="Add video"
      renderFields={(item, patch) => (
        <>
          <Field label="Title">
            <input
              className={inputClass}
              value={item.title || ""}
              onChange={(e) => patch({ title: e.target.value })}
            />
          </Field>
          <Field label="Thumbnail image">
            <ImageInput
              value={item.thumbnail || ""}
              onChange={(v) => patch({ thumbnail: v })}
            />
          </Field>
          <Field label="Video file (upload to Cloudinary or paste URL)">
            <VideoInput
              value={item.videoUrl || ""}
              onChange={(v) => patch({ videoUrl: v })}
            />
          </Field>
        </>
      )}
    />
  );
}

function LettersTab() {
  return (
    <ListEditor
      listName="letters"
      itemShape={{
        title: "New letter",
        date: "Today",
        body: "Write your heart out…",
      }}
      addLabel="Add love letter"
      renderFields={(item, patch) => (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title">
              <input
                className={inputClass}
                value={item.title || ""}
                onChange={(e) => patch({ title: e.target.value })}
              />
            </Field>
            <Field label="Date / occasion">
              <input
                className={inputClass}
                value={item.date || ""}
                onChange={(e) => patch({ date: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Letter body">
            <textarea
              className={inputClass}
              rows={5}
              value={item.body || ""}
              onChange={(e) => patch({ body: e.target.value })}
            />
          </Field>
        </>
      )}
    />
  );
}

function QuotesTab() {
  return (
    <ListEditor
      listName="quotes"
      itemShape={{ text: "A new quote about love", author: "Unknown" }}
      addLabel="Add quote"
      renderFields={(item, patch) => (
        <>
          <Field label="Quote text">
            <textarea
              className={inputClass}
              rows={2}
              value={item.text || ""}
              onChange={(e) => patch({ text: e.target.value })}
            />
          </Field>
          <Field label="Author">
            <input
              className={inputClass}
              value={item.author || ""}
              onChange={(e) => patch({ author: e.target.value })}
            />
          </Field>
        </>
      )}
    />
  );
}

function PlaylistTab() {
  return (
    <ListEditor
      listName="playlist"
      itemShape={{ title: "New song", artist: "Artist", src: "", cover: "" }}
      addLabel="Add song"
      renderFields={(item, patch) => (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Song title">
              <input
                className={inputClass}
                value={item.title || ""}
                onChange={(e) => patch({ title: e.target.value })}
              />
            </Field>
            <Field label="Artist">
              <input
                className={inputClass}
                value={item.artist || ""}
                onChange={(e) => patch({ artist: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Audio file (upload to Cloudinary or paste URL)">
            <AudioInput
              value={item.src || ""}
              onChange={(v) => patch({ src: v })}
            />
          </Field>
          <Field label="Cover art">
            <ImageInput
              value={item.cover || ""}
              onChange={(v) => patch({ cover: v })}
            />
          </Field>
        </>
      )}
    />
  );
}

// ─── Main Admin Component ─────────────────────────────────────────────────────

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("General");
  const { content, saveToServer, logout } = useContent();
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null); // { type: 'success'|'error', text: string }

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg(null);
    try {
      await saveToServer(content);
      setSaveMsg({ type: "success", text: "✓ Saved to MongoDB successfully!" });
      setTimeout(() => setSaveMsg(null), 4000);
    } catch (err) {
      setSaveMsg({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    logout();
    setAuthed(false);
  }

  const panels = {
    General: <GeneralTab />,
    Timeline: <TimelineTab />,
    Gallery: <GalleryTab />,
    Videos: <VideosTab />,
    Letters: <LettersTab />,
    Quotes: <QuotesTab />,
    Playlist: <PlaylistTab />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10 px-4 md:px-10 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-400/30 flex items-center justify-center">
              <FiLock size={14} className="text-rose-300" />
            </div>
            <h1 className="font-bold text-lg text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/"
              className="text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              ← View site
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <span className="animate-spin">
                    <FiLoader size={14} />
                  </span>{" "}
                  Saving…
                </>
              ) : (
                <>
                  <FiSave size={14} /> Save to MongoDB
                </>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-white/50 hover:text-red-400 transition-colors"
            >
              <FiLogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-10 py-8">
        {/* Save message */}
        <AnimatePresence>
          {saveMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-6 text-sm font-medium ${
                saveMsg.type === "success"
                  ? "bg-green-500/15 border border-green-500/30 text-green-300"
                  : "bg-red-500/15 border border-red-500/30 text-red-300"
              }`}
            >
              {saveMsg.type === "success" ? (
                <FiCheck size={14} />
              ) : (
                <FiAlertCircle size={14} />
              )}
              {saveMsg.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab bar */}
        <div className="flex gap-2 flex-wrap mb-8">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === t
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/25"
                  : "bg-white/5 border border-white/10 text-white/60 hover:border-rose-400/50 hover:text-white/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            {panels[tab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
