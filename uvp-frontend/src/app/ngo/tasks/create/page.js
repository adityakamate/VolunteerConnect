"use client";

import { useState } from "react";
import { postRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, X, Calendar, Users, MapPin, Type, AlignLeft, Plus } from "lucide-react";

export default function NGOCreateTaskPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const task = {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      capacity: parseInt(data.capacity),
      locationLink: data.locationLink || null
    };

    const requestFormData = new FormData();
    requestFormData.append(
      "task",
      new Blob([JSON.stringify(task)], { type: "application/json" })
    );

    if (selectedImage) {
      requestFormData.append('image', selectedImage);
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const res = await postRequest("/organization/task/create",
        requestFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

      const isSuccess = res.status === 200 || res.status === 201 ||
        (res.data && res.data.success) ||
        (res.data && res.data.status === 'success');

      if (isSuccess) {
        alert("Task created successfully!");
        router.push("/ngo/tasks");
      } else {
        alert("Task creation failed. Please try again.");
      }
    } catch (err) {
      alert("Failed to create task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full font-sans text-slate-900 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-2 font-medium"
            >
              <ArrowLeft size={18} />
              <span>Back to Tasks</span>
            </button>
            <h1 className="text-3xl font-bold text-slate-900">Create Task</h1>
            <p className="text-slate-500 mt-1">Publish a new volunteering opportunity</p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-white space-y-8"
        >
          {/* Image Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">Cover Image</label>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {imagePreview && (
                <div className="relative group shrink-0 w-full md:w-48 aspect-video rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                      document.getElementById('image-upload').value = '';
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              <div className="flex-1 w-full">
                <label
                  htmlFor="image-upload"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-3xl cursor-pointer transition-all group ${imagePreview ? 'border-slate-200 bg-slate-50/50' : 'border-indigo-200 bg-indigo-50/50 hover:border-indigo-400 hover:bg-indigo-50'
                    }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className={`p-2.5 rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform ${imagePreview ? 'bg-white text-slate-400' : 'bg-white text-indigo-500'
                      }`}>
                      <Upload size={20} />
                    </div>
                    <p className="mb-1 text-sm font-medium text-slate-700">
                      <span className="text-indigo-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">PNG, JPG or GIF (MAX. 10MB)</p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Task Title</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  name="title"
                  required
                  placeholder="e.g. Community Beach Cleanup"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Description</label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-6 h-5 w-5 text-slate-400" />
                <textarea
                  name="description"
                  rows={5}
                  required
                  placeholder="Describe what volunteers will be doing, requirements, etc."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 placeholder:text-slate-400 resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dates */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="date"
                    name="startDate"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="date"
                    name="endDate"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Capacity & Location */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Capacity</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="number"
                    min="1"
                    name="capacity"
                    required
                    placeholder="Max volunteers"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Location Link</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="url"
                    name="locationLink"
                    placeholder="Optional map URL"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 mt-4"
          >
            <Plus size={24} />
            {submitting ? "Creating Task..." : "Create Task"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
