import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ProjectService, TechnologyService } from "./../../services";
import { useSelector } from "react-redux";

// استيراد مكونات Material-UI المطلوبة
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";

// تعريف MenuProps للعنصر Select المتعدد
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CreateProject({ handleClose }) {
  const User = useSelector((state) => state?.auth?.user);
  const CreateProjects = useMutation({
    mutationFn: () =>
      ProjectService.CreateProject({
        ...formData,
        studentIds: [User.email.substring(0, 12)],
      }),
    onSuccess: () => {
      toast.success("تم إنشاء المشروع بنجاح");
      for (let key in formData) {
        localStorage.removeItem(key);
      }
      handleClose();
    },
    onError: () => toast.error("حدث خطأ أثناء إنشاء المشروع"),
  });

  const { data: Technologies } = useQuery({
    queryKey: ["Technology"],
    queryFn: () => TechnologyService.GetTechnology(),
  });

  const [formData, setFormData] = useState({
    Title: localStorage.getItem("Title") || "",
    ShortDescription: localStorage.getItem("ShortDescription") || "",
    LongDescription: localStorage.getItem("LongDescription") || "",
    NumberOfUsers: localStorage.getItem("NumberOfUsers") || "",
    technologyIds: localStorage.getItem("technologyIds")
      ? JSON.parse(localStorage.getItem("technologyIds"))
      : [],
    Year: localStorage.getItem("Year") || "",
    Semester: localStorage.getItem("Semester") || "",
  });

  const [errors, setErrors] = useState({
    Title: null,
    ShortDescription: null,
    LongDescription: null,
    NumberOfUsers: null,
    technologyIds: null,
    Year: null,
    Semester: null,
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.Title) {
      newErrors.Title = "هذا الحقل مطلوب";
      isValid = false;
    }
    if (!formData.ShortDescription) {
      newErrors.ShortDescription = "هذا الحقل مطلوب";
      isValid = false;
    }
    if (!formData.LongDescription) {
      newErrors.LongDescription = "هذا الحقل مطلوب";
      isValid = false;
    }
    if (!formData.NumberOfUsers) {
      newErrors.NumberOfUsers = "هذا الحقل مطلوب";
      isValid = false;
    }
    if (formData.technologyIds.length === 0) {
      newErrors.technologyIds = "هذا الحقل مطلوب";
      isValid = false;
    }
    if (!formData.Year) {
      newErrors.Year = "هذا الحقل مطلوب";
      isValid = false;
    }
    if (!formData.Semester) {
      newErrors.Semester = "هذا الحقل مطلوب";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    localStorage.setItem(name, value);
  };

  const handleTechnologyChange = (event) => {
    const {
      target: { value },
    } = event;

    // عند استخدام Select متعدد، القيمة تكون مصفوفة
    const selectedIds = typeof value === "string" ? value.split(",") : value;

    setFormData((prev) => ({
      ...prev,
      technologyIds: selectedIds,
    }));

    localStorage.setItem("technologyIds", JSON.stringify(selectedIds));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      Title: null,
      ShortDescription: null,
      LongDescription: null,
      NumberOfUsers: null,
      technologyIds: null,
      Year: null,
      Semester: null,
    });

    if (!validateForm()) return;
    await CreateProjects.mutateAsync();
  };

  return (
    <div className="create-project-container">
      <div className="form-container">
        <button
          className="close-btn"
          onClick={handleClose}
          title="إغلاق النموذج"
          aria-label="Close form"
        >
          ×
        </button>

        <form id="projectForm" noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Title">عنوان المشروع</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="Title"
                name="Title"
                placeholder="أدخل عنوان المشروع"
                required
                value={formData.Title}
                onChange={handleChange}
              />
            </div>
            {errors.Title && <div className="error">{errors.Title}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="ShortDescription">وصف مختصر</label>
            <div className="input-wrapper">
              <textarea
                id="ShortDescription"
                name="ShortDescription"
                placeholder="اكتب وصفاً مختصراً للمشروع..."
                required
                maxLength="200"
                value={formData.ShortDescription}
                onChange={handleChange}
              ></textarea>
              <div className="textarea-decoration">✏️</div>
              <div className="char-counter">
                {formData.ShortDescription.length}/200
              </div>
            </div>
            {errors.ShortDescription && (
              <div className="error">{errors.ShortDescription}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="LongDescription">تفاصيل المشروع</label>
            <div className="input-wrapper">
              <textarea
                id="LongDescription"
                name="LongDescription"
                placeholder="اكتب التفاصيل الكاملة للمشروع..."
                required
                maxLength="500"
                value={formData.LongDescription}
                onChange={handleChange}
              ></textarea>
              <div className="textarea-decoration">📋</div>
              <div className="char-counter">
                {formData.LongDescription.length}/500
              </div>
            </div>
            {errors.LongDescription && (
              <div className="error">{errors.LongDescription}</div>
            )}
          </div>

          <div className="row">
            <div className="form-group">
              <InputLabel id="NumberOfUsers_label">العدد المطلوب</InputLabel>{" "}
              <div className="input-wrapper">
                <Select
                  size="sm"
                  labelId="NumberOfUsers_label"
                  id="NumberOfUsers"
                  name="NumberOfUsers"
                  value={formData.NumberOfUsers}
                  onChange={handleChange}
                  className="select-input"
                >
                  <MenuItem value="">اختر العدد</MenuItem>
                  <MenuItem value="1">1 شخص</MenuItem>
                  <MenuItem value="2">2 أشخاص</MenuItem>
                  <MenuItem value="3">3 أشخاص</MenuItem>
                  <MenuItem value="4">4 أشخاص</MenuItem>
                  <MenuItem value="5">5 أشخاص</MenuItem>
                </Select>
              </div>
              {errors.NumberOfUsers && (
                <div className="error">{errors.NumberOfUsers}</div>
              )}
            </div>

            <div className="form-group">
              <InputLabel id="demo-multiple-name-label">التقنيات</InputLabel>{" "}
              <div className="input-wrapper">
                <Select
                  size="sm"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={formData.technologyIds}
                  onChange={handleTechnologyChange}
                  // MenuProps={MenuProps}
                  className="select-input"
                >
                  {Technologies?.map((tech) => (
                    <MenuItem key={tech.id} value={tech.id}>
                      {tech.technologyName || tech.TechnologyName}
                    </MenuItem>
                  ))}
                  <MenuItem value={7}> test</MenuItem>
                  <MenuItem value={3}> test</MenuItem>
                  <MenuItem value={4}> test</MenuItem>
                  <MenuItem value={5}> test</MenuItem>
                </Select>
              </div>
              {errors.technologyIds && (
                <div className="error">{errors.technologyIds}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="Year">السنة المتوقعة للتخرج</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="Year"
                  name="Year"
                  required
                  min="2026"
                  max="2100"
                  placeholder="مثلا 2026"
                  value={formData.Year}
                  onChange={handleChange}
                />
              </div>
              {errors.Year && <div className="error">{errors.Year}</div>}
            </div>

            <div className="form-group">
              <InputLabel id="Semester_label">الفصل الدراسي</InputLabel>{" "}
              <div className="input-wrapper">
                <Select
                  size="sm"
                  labelId="Semester_label"
                  id="Semester"
                  name="Semester"
                  value={formData.Semester}
                  onChange={handleChange}
                  className="select-input"
                >
                  <MenuItem value="">اختر الفصل</MenuItem>
                  <MenuItem value="1">الفصل الأول</MenuItem>
                  <MenuItem value="2">الفصل الثاني</MenuItem>
                </Select>
              </div>
              {errors.Semester && (
                <div className="error">{errors.Semester}</div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="outlined"
            className="submit-btn"
            sx={{ borderRadius: "16px", marginTop: "10px" }}
          >
            إنشاء المشروع
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
