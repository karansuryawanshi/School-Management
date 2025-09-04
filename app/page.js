"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Search } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-[#fffaf7d4]">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
          >
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Welcome to</span>{" "}
                  <span className="block bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text xl:inline">
                    SchoolHub
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Your comprehensive platform for managing and discovering
                  educational institutions. Add your school or explore schools
                  in your area with our intuitive interface.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button className="p-8 text-lg">
                      <Link href="/addSchool">Add Your School</Link>
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button variant="outline" className="p-8 text-lg">
                      <Link href="/showSchools">Browse Schools</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </motion.div>
        </div>
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
        >
          <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="text-white text-center">
              <Image
                width={750}
                height={750}
                alt="Banner_image"
                src="/image.png"
                className="shadow-neutral-400 shadow-lg rounded-lg mr-8"
              ></Image>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="py-12 bg-[#fffaf7d4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:text-center"
          >
            <Badge
              variant="secondary"
              className="text-base font-semibold tracking-wide uppercase"
            >
              Features
            </Badge>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage schools
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides comprehensive tools for educational
              institution management.
            </p>
          </motion.div>

          <div className="mt-10">
            <motion.dl
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"
            >
              <motion.div variants={itemVariants} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md fancy-icon-bg text-white">
                    <p className="h-6 w-6">
                      <Plus />
                    </p>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Easy School Registration
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Quick and intuitive form to add your educational institution
                  with all necessary details.
                </dd>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md fancy-icon-bg text-white">
                    <p className="h-6 w-6">
                      <Search />
                    </p>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    School Discovery
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Browse through a comprehensive list of schools with detailed
                  information and images.
                </dd>
              </motion.div>
            </motion.dl>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="fancy-bg"
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Join our educational community today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Whether you are adding your institution or looking for schools, we
            have got you covered.
          </p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              className="mt-8 w-full inline-flex items-center justify-center p-8 border border-transparent text-base font-medium rounded-md bg-white sm:w-auto transition-colors duration-200"
            >
              <Link href="/addSchool" className="">
                Get Started Now
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
