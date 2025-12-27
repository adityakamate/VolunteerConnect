"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/api";
import { motion } from "framer-motion";
import { Building2, Mail, MapPin, Phone, FileText, Users, Upload, ArrowLeft, Save, X } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    type: "",
    address: "",
    contact: "",
    description: "",
    image: null
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await postRequest("/organization/get", {}, { headers: { Authorization: `Bearer ${token}` } });
        setProfile(res.data);
      } catch (e) {
        console.error("Failed to fetch profile:", e);
      }
    };
    fetchProfile();
  }, []);

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

    // Create the profile object
    const profileData = {
      name: data.name,
      email: data.email,
      type: data.type,
      address: data.address,
      contact: data.contact,
      description: data.description
    };

    // Create new FormData for the API request
    const requestFormData = new FormData();
    requestFormData.append('profile', JSON.stringify(profileData));

    if (selectedImage) {
      requestFormData.append('image', selectedImage);
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const res = await postRequest("/organization/profile/update",
        requestFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

      // Check for success
      const isSuccess = res.status === 200 || res.status === 201 ||
        (res.data && res.data.success) ||
        (res.data && res.data.status === 'success');

      if (isSuccess) {
        alert("Profile updated successfully!");
        router.push("/ngo");
      } else {
        alert("Profile update failed. Please try again.");
      }
    } catch (err) {
      alert("Failed to update profile. Please try again.");
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
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-3xl font-bold text-slate-900">Edit Profile</h1>
            <p className="text-slate-500 mt-1">Update your organization's information and public profile</p>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-white space-y-8"
        >
          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">Organization Logo</label>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative group shrink-0">
                <div className="w-32 h-32 rounded-3xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center overflow-hidden">
                  {imagePreview || profile.image ? (
                    <img
                      src={imagePreview || profile.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 size={40} className="text-slate-300" />
                  )}
                </div>
                {(imagePreview || profile.image) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                      const input = document.getElementById('image-upload');
                      if (input) input.value = '';
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex-1 w-full">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-indigo-200 rounded-3xl cursor-pointer bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-400 transition-all group"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm text-indigo-500 mb-3 group-hover:scale-110 transition-transform">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Organization Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Organization Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={profile.name}
                  placeholder="e.g. Hope Foundation"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Organization Type */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Organization Type</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <select
                  name="type"
                  required
                  defaultValue={profile.type}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 appearance-none cursor-pointer"
                >
                  <option value="">Select Organization Type</option>
                  <option value="OLDAGE">Old Age Care</option>
                  <option value="CHILDREN">Children Care</option>
                  <option value="DISABLED">Disabled Care</option>
                  <option value="EDUCATION">Education</option>
                  <option value="HEALTH">Health</option>
                  <option value="ENVIRONMENT">Environment</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={profile.email}
                  placeholder="e.g. contact@org.com"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Contact Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  name="contact"
                  type="tel"
                  required
                  defaultValue={profile.contact}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">Location Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  name="address"
                  type="text"
                  required
                  defaultValue={profile.address}
                  placeholder="e.g. 123 Main St, New York, NY"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">About Organization</label>
              <div className="relative">
                <FileText className="absolute left-4 top-6 h-5 w-5 text-slate-400" />
                <textarea
                  name="description"
                  required
                  rows="5"
                  defaultValue={profile.description}
                  placeholder="Tell us about your organization's mission, goals, and impact..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 placeholder:text-slate-400 resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse md:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3.5 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
            >
              <Save size={18} />
              {submitting ? "Saving changes..." : "Save Changes"}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}