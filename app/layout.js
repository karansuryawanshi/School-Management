import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
// import { motion } from "framer-motion";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "School Management System",
  description: "Manage and view schools in your area",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar></Navbar>
        <PageTransition className="min-h-screen bg-gray-50">
          {children}
        </PageTransition>

        <Footer></Footer>
      </body>
    </html>
  );
}
