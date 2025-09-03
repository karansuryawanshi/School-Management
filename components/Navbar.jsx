"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-lg z-50 sticky top-0 border-b rounded-b-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <a
              href="/"
              className="text-2xl font-bold text-neutral-700 hover:text-neutral-950 flex gap-2 items-center transition-colors"
            >
              <span className="">
                <GraduationCap size={30}></GraduationCap>
              </span>
              SchoolHub
            </a>
            <div className="hidden md:flex space-x-6">
              <a
                href="/"
                className="text-neutral-700 hover:text-neutral-950 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="/addSchool"
                className="text-neutral-700 hover:text-neutral-950 transition-colors font-medium"
              >
                Add School
              </a>
              <a
                href="/showSchools"
                className="text-neutral-700 hover:text-neutral-950 transition-colors font-medium"
              >
                View Schools
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden border-t border-gray-200 py-4">
          <div className="flex flex-col space-y-3">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="/addSchool"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Add School
            </a>
            <a
              href="/showSchools"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              View Schools
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
