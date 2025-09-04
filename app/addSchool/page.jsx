"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { Check } from "lucide-react";
import { Ban } from "lucide-react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverMsg, setServerMsg] = useState(null);

  const onSubmit = async (data) => {
    try {
      setServerMsg(null);
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (k === "image" && v?.[0]) fd.append("image", v[0]);
        else fd.append(k, v);
      });

      const res = await fetch("/api/schools", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!json.success)
        throw new Error(json.message || "Failed to add school");
      setServerMsg({ type: "success", text: "School added successfully!" });
      reset();
    } catch (e) {
      setServerMsg({ type: "error", text: e.message });
    }
  };

  const imageFile = watch("image");

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[#fffaf7d4]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Add New School
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Fill in the details below to register your educational institution
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-8">
            <AnimatePresence mode="wait">
              {serverMsg && (
                <motion.div
                  key={serverMsg.text}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-6 p-4 rounded-md ${
                    serverMsg.type === "success"
                      ? "bg-green-50 border border-green-200 text-green-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {serverMsg.type === "success" ? (
                        <p className="h-5 w-5 text-green-400">
                          <Check />
                        </p>
                      ) : (
                        <p className="h-5 w-5 text-red-400">
                          <Ban />
                        </p>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{serverMsg.text}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  School Name *
                </label>
                <Input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "School name is required",
                    minLength: {
                      value: 2,
                      message: "School name must be at least 2 characters",
                    },
                  })}
                  className={"text-lg"}
                  placeholder="Enter school name"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Address *
                </label>
                <Textarea
                  id="address"
                  rows={3}
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 10,
                      message: "Address must be at least 10 characters",
                    },
                  })}
                  placeholder="Enter complete address"
                />
                <AnimatePresence>
                  {errors.address && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.address.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    City *
                  </label>
                  <Input
                    type="text"
                    id="city"
                    {...register("city", {
                      required: "City is required",
                      minLength: {
                        value: 2,
                        message: "City name must be at least 2 characters",
                      },
                    })}
                    placeholder="Enter city"
                  />

                  <AnimatePresence>
                    {errors.city && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.city.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    State *
                  </label>
                  <Input
                    type="text"
                    id="state"
                    {...register("state", {
                      required: "State is required",
                      minLength: {
                        value: 2,
                        message: "State name must be at least 2 characters",
                      },
                    })}
                    placeholder="Enter state"
                  />
                  <AnimatePresence>
                    {errors.state && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.state.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Contact Number *
                  </label>
                  <Input
                    type="tel"
                    id="contact"
                    {...register("contact", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Contact number must be 10 digits",
                      },
                    })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.contact ? "" : "border-gray-300"
                    }`}
                    placeholder="Enter 10-digit contact number"
                  />
                  <AnimatePresence>
                    {errors?.contact && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors?.contact?.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label
                    htmlFor="email_id"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email ID *
                  </label>
                  <Input
                    type="email"
                    id="email_id"
                    {...register("email_id", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    placeholder="Enter email address"
                  />
                  <AnimatePresence>
                    {errors.email_id && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.email_id.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  School Image *
                </label>
                <div className="mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-neutral-900 transition-colors">
                  <div className="space-y-1 text-center">
                    <ImagePlus className="mx-auto text-neutral-600" size={60} />
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-neutral-600 hover:text-neutral-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-neutral-800"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          {...register("image", {
                            required: "School image is required",
                          })}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG up to 10MB
                    </p>
                  </div>
                  {imageFile && imageFile.length > 0 && (
                    <p className="mt-2 text-sm text-gray-700 text-center">
                      Selected file:{" "}
                      <span className="font-medium">{imageFile[0].name}</span>
                    </p>
                  )}
                </div>
                <AnimatePresence>
                  {errors.image && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.image.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-6 flex items-center justify-center">
                <Button
                  variant={"default"}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <p className="animate-spin text-white">
                        <LoaderCircle />
                      </p>
                      Adding School...
                    </>
                  ) : (
                    "Add School"
                  )}
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
