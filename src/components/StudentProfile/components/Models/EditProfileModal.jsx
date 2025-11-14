import React, { useState } from "react";
import {
  Close,
  CloudUpload,
  Add,
  Delete,
  Save,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";

// مكون فرعي لتمثيل مهارة واحدة
const SkillTag = ({ skill, onRemove }) => (
  <div className="flex items-center px-3 py-2 rounded-full text-sm border border-blue-200 bg-blue-50 text-blue-700">
    {skill}
    <button
      onClick={() => onRemove(skill)}
      className="mr-1 text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-200 p-1 rounded-full hover:bg-red-100"
      title="حذف المهارة"
    >
      <Close fontSize="small" />
    </button>
  </div>
);

const EditProfileModal = ({ isOpen, onClose, profileData, onSave }) => {
  const [formData, setFormData] = useState({
    name: profileData.name || "الاسم الكامل",
    phone: profileData.phone || "",
    bio: profileData.bio || "",
    links: profileData.links ? [...profileData.links] : [],
    techSkills: profileData.techSkills ? [...profileData.techSkills] : [],
    currentStatus: profileData.currentStatus
      ? { ...profileData.currentStatus }
      : { isAvailable: "true", semester: "" },
    graduationYear: profileData.graduationYear || "",
    photo: profileData.photo || "",
  });

  const [newSkill, setNewSkill] = useState("");
  // قائمة المهارات المتاحة للاختيار
  const availableSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "HTML/CSS",
    "SQL",
    "MongoDB",
    "TypeScript",
    "Vue.js",
    "Angular",
    "PHP",
    "C++",
    "Swift",
    "Kotlin",
    "Docker",
    "AWS",
    "Git",
    "UI/UX Design",
    "Data Analysis",
  ];

  // قائمة الفصول الدراسية
  const semesterOptions = [
    { value: "", label: "اختر الفصل الدراسي" },
    { value: "الفصل الأول", label: "الفصل الأول" },
    { value: "الفصل الثاني", label: "الفصل الثاني" },
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

  const addSkill = () => {
    if (newSkill.trim() && !formData.techSkills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        techSkills: [...prev.techSkills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      techSkills: prev.techSkills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSkillSelect = (skill) => {
    if (!formData.techSkills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        techSkills: [...prev.techSkills, skill],
      }));
    }
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

  // الحصول على رابط جيت هاب أو لينكد إن من البيانات
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
                  تعديل الملف الشخصي
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  قم بتحديث معلوماتك الشخصية والمهنية
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
                rows="3"
                className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none resize-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                placeholder="اكتب سيرتك الذاتية هنا..."
              />
            </div>

            {/* Status Information */}
            <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border-color)] mt-5">
              <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
                المعلومات الأكاديمية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    حالة التوفر
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
                    <option value="true">متاح للبحث عن فريق</option>
                    <option value="false">غير متاح</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    الفصل الدراسي
                  </label>
                  <select
                    value={formData.currentStatus.semester}
                    onChange={(e) =>
                      handleStatusChange("semester", e.target.value)
                    }
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                  >
                    {semesterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                    سنة التخرج
                  </label>
                  <input
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) =>
                      handleInputChange("graduationYear", e.target.value)
                    }
                    className="w-full p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                    placeholder="2024"
                    min="2020"
                    max="2030"
                  />
                </div>
              </div>
            </div>

            {/* Skills Management */}
            <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border-color)] mt-5">
              <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
                المهارات التقنية
              </h3>
              <div className="flex flex-wrap gap-2 mb-4 p-3 rounded-lg bg-[var(--bg-light)] min-h-[60px] border border-dashed border-[var(--border-color)]">
                {formData.techSkills.map((skill, index) => (
                  <SkillTag key={index} skill={skill} onRemove={removeSkill} />
                ))}
                {formData.techSkills.length === 0 && (
                  <p className="text-gray-500 text-sm italic">
                    لا توجد مهارات مضافة
                  </p>
                )}
              </div>

              {/* قائمة المهارات المتاحة للاختيار */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-[var(--text-color)]">
                  اختر من المهارات المتاحة:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-2 border border-[var(--border-color)] rounded-xl">
                  {availableSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillSelect(skill)}
                      disabled={formData.techSkills.includes(skill)}
                      className={`p-2 text-sm rounded-lg border transition-all duration-200 ${
                        formData.techSkills.includes(skill)
                          ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)] cursor-not-allowed"
                          : "bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--border-color)] hover:bg-[var(--primary-color-hover)] hover:text-white cursor-pointer"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* إضافة مهارة يدويًا */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="أضف مهارة جديدة..."
                  className="flex-1 p-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/30 outline-none transition-all duration-200 bg-[var(--bg-color)] text-[var(--text-color)]"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <button
                  onClick={addSkill}
                  className="bg-[var(--primary-color)] text-white px-6 rounded-xl hover:bg-[var(--primary-color-hover)] transition-all duration-200 cursor-pointer flex items-center shadow-md"
                  title="إضافة المهارة"
                >
                  <Add />
                  <span className="mr-2">إضافة</span>
                </button>
              </div>
            </div>

            {/* Links Management */}
            <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border-color)] mt-5">
              <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
                الروابط الخارجية
              </h3>
              <div className="space-y-4">
                {/* رابط جيت هاب */}
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

                {/* رابط لينكد إن */}
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
