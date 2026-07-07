import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { defaultContent } from "../data/defaultContent";

const ContentContext = createContext(null);

const API_BASE = "https://love-story-9e55.onrender.com/api";

function getToken() {
  return (
    sessionStorage.getItem("admin_token") || 
    localStorage.getItem("adminToken") || 
    localStorage.getItem("token") || 
    null
  );
}

function setToken(token) {
  if (token) {
    sessionStorage.setItem("admin_token", token);
    localStorage.setItem("adminToken", token);
    localStorage.setItem("token", token);
  } else {
    sessionStorage.removeItem("admin_token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
  }
}

export function ContentProvider({ children }) {
  // ১. শুরুতে কন্টেন্ট null থাকবে যাতে ভুল বা ডিফল্ট ডাটা ফ্লাশ না করে
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ২. মেইন পেজের পাসওয়ার্ড অথরাইজেশন স্টেট (একবার পাসওয়ার্ড দিলে ব্রাউজারে সেভ থাকবে)
  const [isMainAuthed, setIsMainAuthed] = useState(
    () => localStorage.getItem("main_page_access") === "true"
  );

  // Load story from MongoDB on mount
  useEffect(() => {
    let timer;
    async function fetchStory() {
      try {
        const resp = await fetch(`${API_BASE}/story`);
        if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
        const data = await resp.json();
        if (data && data.couple) {
          setContent({
            ...defaultContent,
            ...data,
            theme: { ...defaultContent.theme, ...data.theme, mode: "night" },
          });
          setError(null);
          setLoading(false); // ডাটা সফলভাবে আসলেই কেবল লোডিং শেষ হবে
        } else {
          setContent(defaultContent);
          setLoading(false);
        }
      } catch (err) {
        console.warn("Server cold start or error, retrying in 3 seconds...", err.message);
        setError(err.message);
        // সার্ভার ফ্রি টায়ারের কারণে ঘুমে থাকলে প্রতি ৩ সেকেন্ড পর পর ব্যাকগ্রাউন্ডে অটো ট্রাই করবে
        timer = setTimeout(fetchStory, 3000);
      } finally {
        document.documentElement.classList.add("night");
      }
    }
    fetchStory();
    return () => clearTimeout(timer);
  }, []);

  // Save story to MongoDB (requires JWT)
  const saveToServer = useCallback(async (contentToSave) => {
    const token = getToken();
    if (!token) throw new Error("Not authenticated — please log in first");

    const resp = await fetch(`${API_BASE}/story`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contentToSave),
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || "Save failed");
    return data;
  }, []);

  // Login: post to auth endpoint, store JWT
  const login = useCallback(async (password) => {
    const resp = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || "Login failed");
    setToken(data.token);
    return data.token;
  }, []);

  // Logout: clear JWT
  const logout = useCallback(() => {
    setToken(null);
  }, []);

  // Upload file to Cloudinary via backend
  const uploadFile = useCallback(async (file) => {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");

    const formData = new FormData();
    formData.append("file", file);

    const resp = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || "Upload failed");
    return data.url;
  }, []);

  // ৩. মেইন পেজ লক খোলার ফাংশন
  const verifyMainPassword = useCallback((password) => {
    if (password === "ourlovestory") { // এখানে তোমার মেইন পেজের পাসওয়ার্ড সেট করা
      localStorage.setItem("main_page_access", "true");
      setIsMainAuthed(true);
      return true;
    }
    return false;
  }, []);

  // Content updaters
  const update = useCallback((path, value) => {
    setContent((prev) => (prev ? { ...prev, [path]: value } : prev));
  }, []);

  const updateField = useCallback((section, field, value) => {
    setContent((prev) =>
      prev
        ? {
            ...prev,
            [section]: { ...prev[section], [field]: value },
          }
        : prev
    );
  }, []);

  const addItem = useCallback((listName, item) => {
    setContent((prev) => (prev ? { ...prev, [listName]: [...(prev[listName] || []), item] } : prev));
  }, []);

  const updateItem = useCallback((listName, id, patch) => {
    setContent((prev) =>
      prev
        ? {
            ...prev,
            [listName]: (prev[listName] || []).map((it) =>
              it.id === id ? { ...it, ...patch } : it
            ),
          }
        : prev
    );
  }, []);

  const deleteItem = useCallback((listName, id) => {
    setContent((prev) =>
      prev
        ? {
            ...prev,
            [listName]: (prev[listName] || []).filter((it) => it.id !== id),
          }
        : prev
    );
  }, []);

  const toggleTheme = useCallback(() => {}, []);
  const resetToDefaults = useCallback(() => setContent(defaultContent), []);
  const replaceContent = useCallback((next) => setContent(next), []);

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        error,
        isMainAuthed,
        verifyMainPassword,
        update,
        updateField,
        addItem,
        updateItem,
        deleteItem,
        toggleTheme,
        resetToDefaults,
        replaceContent,
        saveToServer,
        login,
        logout,
        uploadFile,
        getToken,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}