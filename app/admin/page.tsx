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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600">
      {/* Header Section */}
      <div className="pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Admin Dashboard
          </h1>
          <p className="text-purple-100 text-lg">
            Manage your fitness platform with ease
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Link
              href="/admin/trainers"
              className="group bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Add Trainer</h3>
                  <p className="text-purple-100 text-sm">Expand your team</p>
                </div>
              </div>
              <p className="text-purple-100/80 leading-relaxed">
                Register new fitness trainers and add them to your platform. Build your expert team to help more clients achieve their goals.
              </p>
              <div className="mt-6 flex items-center text-green-300 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>Get Started</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/admin/blogs"
              className="group bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Add Blog</h3>
                  <p className="text-purple-100 text-sm">Share knowledge</p>
                </div>
              </div>
              <p className="text-purple-100/80 leading-relaxed">
                Create engaging blog posts about fitness, nutrition, and wellness. Share valuable insights with your community.
              </p>
              <div className="mt-6 flex items-center text-orange-300 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>Start Writing</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Stats Section */}
          {/* <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">24</div>
                <div className="text-purple-100">Active Trainers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">156</div>
                <div className="text-purple-100">Published Blogs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-1">1.2k</div>
                <div className="text-purple-100">Total Users</div>
              </div>
            </div>
          </div> */}

          {/* Logout Section */}
          <div className="text-center">
            <button
              onClick={logout}
              className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-2xl border border-white/30 transition-all duration-300 backdrop-blur-lg hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}