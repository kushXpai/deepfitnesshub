"use client";

import React, { useState } from "react";

export default function AddBlogPage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    author: "",
    date: "",
    read_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/add-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add blog");
      setMessage("✅ Blog added successfully!");
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        image: "",
        author: "",
        date: "",
        read_time: "",
      });
    } catch (err: any) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">📝 Add Blog</h1>
          <p className="text-purple-100 mt-2 text-sm">
            Write and publish a new blog post for Deep Fitness Hub.
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {Object.entries(form).map(([key, value]) => (
              <div key={key}>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-1 capitalize"
                  htmlFor={key}
                >
                  {key.replace("_", " ")}
                </label>
                {["excerpt", "content"].includes(key) ? (
                  <textarea
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 
                               focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                               hover:border-purple-400 transition-all shadow-sm"
                    rows={key === "content" ? 6 : 3}
                  />
                ) : (
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 
                               focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                               hover:border-purple-400 transition-all shadow-sm"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 
                         hover:from-purple-700 hover:to-purple-800 text-white 
                         font-semibold py-3 px-4 rounded-lg shadow-md transition-all"
            >
              {loading ? "Saving..." : "Add Blog"}
            </button>
          </form>

          {message && (
            <p className="mt-6 text-center text-sm font-medium text-gray-700">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
