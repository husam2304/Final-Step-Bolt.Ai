import React, { useState } from "react";
import {
  Close,
  CloudUpload,
  Add,
  Delete,
  Save,
  LinkedIn,
  GitHub,
  School,
  Work,
} from "@mui/icons-material";

const EditProfileModal = ({ isOpen, onClose, profileData, onSave }) => {
  const [formData, setFormData] = useState({
    name: profileData.name || "الاسم الكامل",
    phone: profileData.phone || "",
    email: profileData.email || "",
    bio: profileData.bio || "",
    academicRank: profileData.academicRank || "",
    department: profileData.department || "",
    specialization: profileData.specialization || "",
    officeLocation: profileData.officeLocation || "",
    officeHours: profileData.officeHours || "",
    links: profileData.links ? [...profileData.links] : [],
    currentStatus: profileData.currentStatus
      ? { ...profileData.currentStatus }
      : {
          isAvailable: "true",
          acceptingNewStudents: "true",
          maxSupervisionCapacity: 5,
          currentSupervisionCount: 0,
        },
    photo: profileData.photo || "",
  });

  // قائمة الرتب الأكاديمية
  const academicRanks = [
    { value: "", label: "اختر الرتبة الأكاديمية" },
    { value: "أستاذ", label: "أستاذ" },
    { value: "أستاذ مشارك", label: "أستاذ مشارك" },
    { value: "أستاذ مساعد", label: "أستاذ مساعد" },
    { value: "محاضر", label: "محاضر" },
  ];

  // قائمة الأقسام
  const departments = [
    { value: "", label: "اختر القسم" },
    { value: "هندسة البرمجيات", label: "هندسة البرمجيات" },
    { value: "علوم الحاسب", label: "علوم الحاسب" },
    { value: "هندسة الحاسب", label: "هندسة الحاسب" },
    { value: "نظم المعلومات", label: "نظم المعلومات" },
    { value: "الذكاء الاصطناعي", label: "الذكاء الاصطناعي" },
    { value: "الأمن السيبراني", label: "الأمن السيبراني" },
  ];

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStatusChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      currentStatus: {
        ...prev.currentStatus,
        [field]: value,
      },
    }));
  };

  const updateLink = (platform, url) => {
    setFormData((prev) => {
      const existingLinkIndex = prev.links.findIndex(
        (link) => link.platform === platform
      );

      if (existingLinkIndex >= 0) {
        // تحديث الرابط الموجود
        const updatedLinks = [...prev.links];
        updatedLinks[existingLinkIndex] = { platform, url };
        return { ...prev, links: updatedLinks };
      } else {
        // إضافة رابط جديد
        return { ...prev, links: [...prev.links, { platform, url }] };
      }
    });
  };

  const removeLink = (platform) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((link) => link.platform !== platform),
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          photo: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  // وظيفة للحصول على الأحرف الأولى من الاسم
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // الحصول على رابط من البيانات
  const getLinkUrl = (platform) => {
    const link = formData.links.find((link) => link.platform === platform);
    return link ? link.url : "";
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      style={{ zIndex: 5000 }}
    >
      <div className="relative rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100 border border-[var(--border-color)]">
        <div className="p-6 bg-[var(--modal-bg)] rounded-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b border-[var(--border-color)] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--primary-color-hover)]/20 flex items-center justify-center">
                <span className="text-[var(--primary-color)] text-lg">✏️</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--text-color)]">
                  تعديل الملف الشخصي - الدكتور
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  قم بتحديث معلوماتك الأكاديمية والمهنية
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition-all duration-200 cursor-pointer p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50"
            >
              <Close />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Photo Upload */}
            <div className="text-center bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border-color)] shadow-inner">
              <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
                الصورة الشخصية
              </h3>
              <div className="relative inline-block">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto border-4 border-[var(--primary-color)] shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto border-4 border-[var(--primary-color)] shadow-lg bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-white">
                    {getInitials(formData.name)}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="absolute bottom-0 right-0 bg-[var(--primary-color)] text-white p-2 rounded-full cursor-pointer hover:bg-[var(--primary-color-hover)] transition-all duration-200 shadow-lg"
                  title="تغيير الصورة"
                >
                  <CloudUpload fontSize="small" />
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border-color)] mt-5">
              <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
                المعلومات الأساسية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                    placeholder="example@university.edu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    الرتبة الأكاديمية
                  </label>
                  <select
                    value={formData.academicRank}
                    onChange={(e) =>
                      handleInputChange("academicRank", e.target.value)
                    }
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                  >
                    {academicRanks.map((rank) => (
                      <option key={rank.value} value={rank.value}>
                        {rank.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border-color)] mt-5">
              <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
                المعلومات الأكاديمية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    القسم
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      handleInputChange("department", e.target.value)
                    }
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                  >
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    التخصص الدقيق
                  </label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) =>
                      handleInputChange("specialization", e.target.value)
                    }
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                    placeholder="مثال: الذكاء الاصطناعي، تعلم الآلة..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    موقع المكتب
                  </label>
                  <input
                    type="text"
                    value={formData.officeLocation}
                    onChange={(e) =>
                      handleInputChange("officeLocation", e.target.value)
                    }
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                    placeholder="مثال: مبنى الهندسة - الطابق الثالث - مكتب 305"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    أوقات الدوام
                  </label>
                  <input
                    type="text"
                    value={formData.officeHours}
                    onChange={(e) =>
                      handleInputChange("officeHours", e.target.value)
                    }
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                    placeholder="مثال: الأحد، الثلاثاء، الخميس - 10:00 صباحاً إلى 12:00 ظهراً"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border-color)] mt-5">
              <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
                السيرة الذاتية
              </h3>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows="4"
                className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none resize-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                placeholder="اكتب سيرتك الذاتية الأكاديمية والمهنية هنا..."
              />
            </div>

            {/* Status Information */}
            <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border-color)] mt-5">
              <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
                حالة الإشراف
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    حالة التوفر للإشراف
                  </label>
                  <select
                    value={formData.currentStatus.isAvailable}
                    onChange={(e) =>
                      handleStatusChange(
                        "isAvailable",
                        e.target.value === "true"
                      )
                    }
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                  >
                    <option value="true">متاح للإشراف</option>
                    <option value="false">غير متاح للإشراف</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    قبول طلاب جدد
                  </label>
                  <select
                    value={formData.currentStatus.acceptingNewStudents}
                    onChange={(e) =>
                      handleStatusChange(
                        "acceptingNewStudents",
                        e.target.value === "true"
                      )
                    }
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                  >
                    <option value="true">يقبل طلاب جدد</option>
                    <option value="false">لا يقبل طلاب جدد</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    السعة القصوى للإشراف
                  </label>
                  <input
                    type="number"
                    value={formData.currentStatus.maxSupervisionCapacity}
                    onChange={(e) =>
                      handleStatusChange(
                        "maxSupervisionCapacity",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                    min="1"
                    max="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    عدد الطلاب الحاليين
                  </label>
                  <input
                    type="number"
                    value={formData.currentStatus.currentSupervisionCount}
                    onChange={(e) =>
                      handleStatusChange(
                        "currentSupervisionCount",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                    min="0"
                    max={formData.currentStatus.maxSupervisionCapacity}
                  />
                </div>
              </div>
            </div>

            {/* Research Links Management */}
            <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border-color)] mt-5">
              <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
                الروابط البحثية والأكاديمية
              </h3>
              <div className="space-y-4">
                {/* Google Scholar Link */}
                <div className="flex items-center gap-3 p-3 bg-[var(--bg-light)] rounded-lg border border-[var(--border-color)]">
                  <School className="text-green-600" fontSize="medium" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-[var(--text-color)]">
                      Google Scholar
                    </label>
                    <input
                      type="url"
                      value={getLinkUrl("scholar")}
                      onChange={(e) => updateLink("scholar", e.target.value)}
                      placeholder="https://scholar.google.com/citations?user=example"
                      className="w-full p-2 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                    />
                  </div>
                  {getLinkUrl("scholar") && (
                    <button
                      onClick={() => removeLink("scholar")}
                      className="text-red-500 hover:text-red-700 cursor-pointer p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200"
                      title="حذف الرابط"
                    >
                      <Delete fontSize="small" />
                    </button>
                  )}
                </div>

                {/* ResearchGate Link */}
                <div className="flex items-center gap-3 p-3 bg-[var(--bg-light)] rounded-lg border border-[var(--border-color)]">
                  <Work className="text-blue-600" fontSize="medium" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-[var(--text-color)]">
                      ResearchGate
                    </label>
                    <input
                      type="url"
                      value={getLinkUrl("researchgate")}
                      onChange={(e) =>
                        updateLink("researchgate", e.target.value)
                      }
                      placeholder="https://researchgate.net/profile/username"
                      className="w-full p-2 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                    />
                  </div>
                  {getLinkUrl("researchgate") && (
                    <button
                      onClick={() => removeLink("researchgate")}
                      className="text-red-500 hover:text-red-700 cursor-pointer p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200"
                      title="حذف الرابط"
                    >
                      <Delete fontSize="small" />
                    </button>
                  )}
                </div>

                {/* University Profile Link */}
                <div className="flex items-center gap-3 p-3 bg-[var(--bg-light)] rounded-lg border border-[var(--border-color)]">
                  <School className="text-purple-600" fontSize="medium" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-[var(--text-color)]">
                      الصفحة الجامعية
                    </label>
                    <input
                      type="url"
                      value={getLinkUrl("university")}
                      onChange={(e) => updateLink("university", e.target.value)}
                      placeholder="https://university.edu/faculty/username"
                      className="w-full p-2 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                    />
                  </div>
                  {getLinkUrl("university") && (
                    <button
                      onClick={() => removeLink("university")}
                      className="text-red-500 hover:text-red-700 cursor-pointer p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200"
                      title="حذف الرابط"
                    >
                      <Delete fontSize="small" />
                    </button>
                  )}
                </div>

                {/* LinkedIn Link */}
                <div className="flex items-center gap-3 p-3 bg-[var(--bg-light)] rounded-lg border border-[var(--border-color)]">
                  <LinkedIn className="text-blue-600" fontSize="medium" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-[var(--text-color)]">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={getLinkUrl("linkedin")}
                      onChange={(e) => updateLink("linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full p-2 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                    />
                  </div>
                  {getLinkUrl("linkedin") && (
                    <button
                      onClick={() => removeLink("linkedin")}
                      className="text-red-500 hover:text-red-700 cursor-pointer p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200"
                      title="حذف الرابط"
                    >
                      <Delete fontSize="small" />
                    </button>
                  )}
                </div>

                {/* GitHub Link */}
                <div className="flex items-center gap-3 p-3 bg-[var(--bg-light)] rounded-lg border border-[var(--border-color)]">
                  <GitHub className="text-gray-700" fontSize="medium" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-[var(--text-color)]">
                      GitHub
                    </label>
                    <input
                      type="url"
                      value={getLinkUrl("github")}
                      onChange={(e) => updateLink("github", e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full p-2 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                    />
                  </div>
                  {getLinkUrl("github") && (
                    <button
                      onClick={() => removeLink("github")}
                      className="text-red-500 hover:text-red-700 cursor-pointer p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200"
                      title="حذف الرابط"
                    >
                      <Delete fontSize="small" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[var(--border-color)] ">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-500"
            >
              إلغاء
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-xl hover:bg-[var(--btn-primary-hover)] transition-all duration-200 font-medium flex items-center gap-2 shadow-md"
            >
              <Save fontSize="small" />
              حفظ التغييرات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
