"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHomePage() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-purple-700 mb-6">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/admin/trainers"
            className="block rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition"
          >
            <div className="text-lg font-semibold text-gray-900">
              ➕ Add Trainer
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Insert a new trainer into the database.
            </p>
          </Link>

          <Link
            href="/admin/blogs"
            className="block rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition"
          >
            <div className="text-lg font-semibold text-gray-900">📝 Add Blog</div>
            <p className="text-sm text-gray-600 mt-2">
              Publish a new blog post.
            </p>
          </Link>
        </div>

        <button
          onClick={logout}
          className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
