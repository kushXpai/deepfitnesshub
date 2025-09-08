"use client";

import React, { useState } from "react";
import Link from "next/link";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm({ 
      ...form, 
      title,
      slug: generateSlug(title)
    });
  };

  const categories = [
    "Fitness Tips",
    "Nutrition",
    "Weight Loss",
    "Muscle Building",
    "Wellness",
    "Yoga",
    "Cardio",
    "Strength Training",
    "Mental Health",
    "Lifestyle"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600">
      {/* Header */}
      <div className="pt-8 pb-6 px-6">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/admin" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Create New Blog Post
            </h1>
            <p className="text-purple-100 text-lg">
              Share valuable fitness knowledge with your community
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 md:p-10">
              {/* Basic Information */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-orange-500/30 rounded-xl flex items-center justify-center mr-3">
                    📝
                  </span>
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="lg:col-span-2 space-y-2">
                    <label className="flex items-center text-white font-semibold text-sm" htmlFor="title">
                      <span className="text-lg mr-2">📰</span>
                      Blog Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={form.title}
                      onChange={handleTitleChange}
                      placeholder="Enter an engaging title for your blog post"
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-4 
                                 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 
                                 hover:bg-white/25 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-white font-semibold text-sm" htmlFor="slug">
                      <span className="text-lg mr-2">🔗</span>
                      URL Slug
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      placeholder="url-friendly-slug"
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-4 
                                 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 
                                 hover:bg-white/25 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-white font-semibold text-sm" htmlFor="category">
                      <span className="text-lg mr-2">🏷️</span>
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-4 
                                 text-white focus:ring-2 focus:ring-white/50 focus:border-white/50 
                                 hover:bg-white/25 transition-all duration-300"
                      required
                    >
                      <option value="" className="bg-purple-800">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-purple-800">{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="lg:col-span-2 space-y-2">
                    <label className="flex items-center text-white font-semibold text-sm" htmlFor="excerpt">
                      <span className="text-lg mr-2">✨</span>
                      Excerpt
                    </label>
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      value={form.excerpt}
                      onChange={handleChange}
                      placeholder="Write a compelling summary that will appear in blog previews..."
                      rows={3}
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-4 
                                 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 
                                 hover:bg-white/25 transition-all duration-300 resize-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-blue-500/30 rounded-xl flex items-center justify-center mr-3">
                    📄
                  </span>
                  Content
                </h2>
                
                <div className="space-y-2">
                  <label className="flex items-center text-white font-semibold text-sm" htmlFor="content">
                    <span className="text-lg mr-2">📖</span>
                    Blog Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Write your full blog content here. Use markdown for formatting..."
                    rows={12}
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-4 
                               text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 
                               hover:bg-white/25 transition-all duration-300 resize-y"
                    required
                  />
                </div>
              </div>

              {/* Media & Metadata */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-pink-500/30 rounded-xl flex items-center justify-center mr-3">
                    🎨
                  </span>
                  Media & Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center text-white font-semibold text-sm" htmlFor="image">
                      <span className="text-lg mr-2">🖼️</span>
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      id="image"
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-4 
                                 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 
                                 hover:bg-white/25 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-white font-semibold text-sm" htmlFor="author">
                      <span className="text-lg mr-2">👤</span>
                      Author Name
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={form.author}
                      onChange={handleChange}
                      placeholder="Author's full name"
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-4 
                                 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 
                                 hover:bg-white/25 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-white font-semibold text-sm" htmlFor="date">
                      <span className="text-lg mr-2">📅</span>
                      Publication Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-4 
                                 text-white focus:ring-2 focus:ring-white/50 focus:border-white/50 
                                 hover:bg-white/25 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-white font-semibold text-sm" htmlFor="read_time">
                      <span className="text-lg mr-2">⏱️</span>
                      Read Time (minutes)
                    </label>
                    <input
                      type="number"
                      id="read_time"
                      name="read_time"
                      value={form.read_time}
                      onChange={handleChange}
                      placeholder="5"
                      min="1"
                      max="60"
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-4 
                                 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 
                                 hover:bg-white/25 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 
                             text-white font-bold py-4 px-12 rounded-2xl shadow-lg transition-all duration-300 
                             transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed 
                             disabled:transform-none flex items-center justify-center min-w-[200px]"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing Blog...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Publish Blog Post
                    </>
                  )}
                </button>

                {/* Success/Error Message */}
                {message && (
                  <div className={`p-4 rounded-2xl border ${
                    message.includes('✅') 
                      ? 'bg-green-500/20 border-green-400/30 text-green-100' 
                      : 'bg-red-500/20 border-red-400/30 text-red-100'
                  } backdrop-blur-sm`}>
                    <p className="text-center font-medium">{message}</p>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Writing Tips */}
          <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Writing Tips for Engaging Blogs</h3>
                <ul className="text-purple-100 text-sm space-y-1">
                  <li>• Start with a compelling hook to grab readers' attention</li>
                  <li>• Use subheadings to break up content and improve readability</li>
                  <li>• Include actionable tips that readers can implement immediately</li>
                  <li>• Add relevant examples and personal experiences when possible</li>
                  <li>• End with a clear call-to-action or question for engagement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}