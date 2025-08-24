// app/blogs/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  description: string;
  content: string;
}

type PageType = "list" | "detail";

const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<PageType>("list");
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const categories: string[] = [
    "All Categories",
    "Abs and Core Exercises",
    "Arm Exercises",
    "Athletes & Celebrities",
    "Back Exercises",
    "Build Muscle",
    "Chest Exercises",
    "Client Case Studies",
    "Fitness",
    "From our Partners",
    "Full-Body Exercises",
    "Gear",
    "Glute Exercises",
    "Healthy Eating",
    "Hers Athletes & Celebrities",
    "Hers Features",
    "Hers Nutrition",
    "Hers Workouts",
    "Interviews",
    "Leg Exercises",
    "Life",
    "Muscle & Fitness Hers",
    "News",
    "Nutrition",
    "Pro Tips",
    "Reviews",
    "Shoulder Exercises",
    "Training",
    "Wellness",
    "Workout Routines",
    "Workout Tips",
  ];

  // 🔹 Fetch blogs from API route
  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogPosts(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const handleCategorySelect = (category: string): void => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const handleBlogClick = (blog: BlogPost): void => {
    setSelectedBlog(blog);
    setCurrentPage("detail");
  };

  const handleBackToList = (): void => {
    setCurrentPage("list");
    setSelectedBlog(null);
  };

  if (currentPage === "detail" && selectedBlog) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Blog Detail Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={handleBackToList}
            className="mb-6 text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Blogs
          </button>

          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-8">
              <div className="flex items-center mb-4">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {selectedBlog.category}
                </span>
                <span className="text-gray-500 text-sm ml-4">{selectedBlog.date}</span>
                <span className="text-gray-500 text-sm ml-4">{selectedBlog.readTime}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {selectedBlog.title}
              </h1>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedBlog.description}
                </p>

                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    This is blog opened
                  </h2>
                  <p className="text-gray-600">
                    Full blog content would be displayed here with detailed
                    information about {selectedBlog.title.toLowerCase()}.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Fitness Blogs</h1>
          <p className="text-gray-600">
            Expert articles and insights on fitness, nutrition, and wellness
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Articles
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full px-4 py-3 text-left bg-white border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none flex justify-between items-center"
                >
                  {selectedCategory}
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>

                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 text-gray-700"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 outline-none font-medium">
              Search Articles
            </button>
          </div>
        </div>

        {/* Articles Count */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {blogPosts.length} Articles Available
          </h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleBlogClick(post)}
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                  {post.category}
                </span>
              </div>

              <div className="p-4">
                <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
