import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { defaultContent } from "../data/defaultContent";

const ContentContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || "/api";

// Helper: get JWT from sessionStorage
function getToken() {
  return sessionStorage.getItem("admin_token") || null;
}

// Helper: set JWT
function setToken(token) {
  if (token) sessionStorage.setItem("admin_token", token);
  else sessionStorage.removeItem("admin_token");
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState({
    ...defaultContent,
    theme: { ...defaultContent.theme, mode: "night" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load story from MongoDB on mount
  useEffect(() => {
    async function fetchStory() {
      try {
        const resp = await fetch(`${API_BASE}/story`);
        if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
        const data = await resp.json();
        if (data && data.couple) {
          setContent((prev) => ({
            ...prev,
            ...data,
            theme: { ...prev.theme, ...data.theme, mode: "night" },
          }));
        }
      } catch (err) {
        console.warn("Could not load story from server, using defaults:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
        // Always ensure dark mode
        document.documentElement.classList.add("night");
      }
    }
    fetchStory();
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
    return data.url; // Returns Cloudinary secure URL
  }, []);

  // Content updaters
  const update = useCallback((path, value) => {
    setContent((prev) => ({ ...prev, [path]: value }));
  }, []);

  const updateField = useCallback((section, field, value) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  }, []);

  const addItem = useCallback((listName, item) => {
    setContent((prev) => ({ ...prev, [listName]: [...(prev[listName] || []), item] }));
  }, []);

  const updateItem = useCallback((listName, id, patch) => {
    setContent((prev) => ({
      ...prev,
      [listName]: (prev[listName] || []).map((it) =>
        it.id === id ? { ...it, ...patch } : it
      ),
    }));
  }, []);

  const deleteItem = useCallback((listName, id) => {
    setContent((prev) => ({
      ...prev,
      [listName]: (prev[listName] || []).filter((it) => it.id !== id),
    }));
  }, []);

  const toggleTheme = useCallback(() => {
    // Always night mode
  }, []);

  const resetToDefaults = useCallback(() => {
    setContent(defaultContent);
  }, []);

  const replaceContent = useCallback((next) => {
    setContent(next);
  }, []);

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        error,
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
