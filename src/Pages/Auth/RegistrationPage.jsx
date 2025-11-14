import React, { useState } from "react";
import authImage from "./../../assets/Images/Tset.png";
import logo from "./../../assets/Images/logo/logo-finalstep-removebg-preview.png";
import { useDispatch } from "react-redux";
import { Regerster } from "../../store/AuthActions";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    Selectmajor: localStorage.getItem("Selectmajor") || "",
    Gender: localStorage.getItem("Gender") || "",
    Graduationsemester: localStorage.getItem("Graduationsemester") || "",
    GraduationYear: localStorage.getItem("GraduationYear") || "",
    DataBarith: localStorage.getItem("DataBarith") || "",
    LastName: localStorage.getItem("LastName") || "",
    FirstName: localStorage.getItem("FirstName") || "",
    Email: localStorage.getItem("Email") || "",
    PhoneNumber: localStorage.getItem("PhoneNumber") || "",
    Conformpassword: "",
    Password: "",
  });
  const [studentRegister, setStudentRegister] = useState(true);

  const validateForm = () => {
    if (registerData.Password !== registerData.Conformpassword) {
      setError("كلمة السر غير متطابقة");
      return false;
    }

    // Add more validations as needed
    if (registerData.Password.length < 6) {
      setError("كلمة المرور يجب أن تكون على الأقل 6 أحرف");
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    if (!validateForm()) return;

    setLoading(true);
    try {
      const registerRes = await dispatch(
        Regerster({ registerData, studentRegister })
      );
      if (!registerRes.error) {
        for (const key in registerData) {
          localStorage.removeItem(key); // Clear localStorage for each field
        }
        navigate("/", { state: { showWelcome: true } });
      } else {
        setError(registerRes.payload || "حدث خطأ ما، حاول لاحقاً");
      }
    } catch (err) {
      setError(err.message || "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name != "Conformpassword" && name != "Password") {
      localStorage.setItem(name, value); // Save to localStorage
    }
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : type === "checkbox" ? checked : value,
    }));
  };

  // Helper function to render error messages
  const renderError = (fieldName) => {
    if (error?.errors?.[fieldName]) {
      return <p className="Error">{error.errors[fieldName]}</p>;
    }
    return null;
  };

  return (
    <>
      <section className="hero-image">
        <img src={authImage} alt="الحرم الجامعي" />
      </section>

      <section className="registration-form">
        <div className="logo-container" onClick={() => navigate("/")}>
          <img src={logo} alt="شعار الجامعة" />
        </div>
        <section>
          <section
            className="flex gap-4 justify-center items-center  mt-6"
            style={{ marginTop: "24px" }}
          >
            <button
              className={`${studentRegister
                ? "bg-[var(--primary-color)] text-[var(--bg-color)]"
                : null
                }  px-6 py-2 rounded-2xl shadow-md hover:bg-[var(--primary-color)] transition border border-[var(--primary-color)]`}
              onClick={() => setStudentRegister(true)}
            >
              تسجيل الدخول كطالب
            </button>
            <button
              className={`${!studentRegister
                ? "bg-[var(--primary-color)] text-[var(--bg-color)]"
                : null
                }  px-6 py-2 rounded-2xl shadow-md hover:bg-[var(--primary-color)] transition border border-[var(--primary-color)]`}
              onClick={() => setStudentRegister(false)}
            >
              تسجيل الدخول كمشرف
            </button>
          </section>
        </section>
        <form onSubmit={handleFormSubmit} className="my-4">
          <section className="min-h-102">
            <div className="form-row">
              <div className="input-group">
                <input
                  type="text"
                  name="FirstName"
                  required
                  value={registerData.FirstName}
                  onChange={handleChange}
                  placeholder="الإسم الأول"
                />
                {renderError("FirstName")}
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="LastName"
                  required
                  value={registerData.LastName}
                  onChange={handleChange}
                  placeholder="اسم العائلة"
                />
                {renderError("LastName")}
              </div>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="Email"
                required
                value={registerData.Email}
                onChange={handleChange}
                placeholder="البريد الإلكتروني"
              />
              {renderError("Email")}
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="PhoneNumber"
                required
                value={registerData.PhoneNumber}
                onChange={handleChange}
                placeholder="رقم الهاتف"
              />
              {renderError("PhoneNumber")}
            </div>

            <div className="form-row">
              <div className="select-container">
                <label htmlFor="Selectmajor">التخصص الجامعي</label>
                <select
                  name="Selectmajor"
                  id="Selectmajor"
                  value={registerData.Selectmajor}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- اختر التخصص --</option>
                  <option value="علم الحاسوب">علم الحاسوب</option>
                  <option value="هندسة البرمجيات">هندسة البرمجيات</option>
                  <option value="نظم المعلومات">نظم المعلومات حاسوبية</option>
                  <option value="الذكاء الاصطناعي">الذكاء الاصطناعي</option>
                </select>
                {renderError("Selectmajor")}
              </div>

              <div className="input-group">
                <div className="gender-selection">
                  <label>الجنس:</label>
                  <div className="radio-options">
                    <label>
                      <input
                        type="radio"
                        name="Gender"
                        value="male"
                        onChange={handleChange}
                        checked={registerData.Gender === "male"}
                      />
                      ذكر
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="Gender"
                        value="female"
                        onChange={handleChange}
                        checked={registerData.Gender === "female"}
                      />
                      أنثى
                    </label>
                  </div>
                </div>
                {renderError("Gender")}
              </div>
            </div>
            {studentRegister && (
              <div className="form-row">
                <div className="date-input">
                  <label>تاريخ الميلاد</label>
                  <input
                    type="date"
                    name="DataBarith"
                    required
                    value={registerData.DataBarith}
                    onChange={handleChange}
                  />
                  {renderError("DataBarith")}
                </div>

                {/* Separate Graduation Year and Semester */}
                <div className="date-input">
                  <label>سنة التخرج المتوقعة</label>
                  <input
                    type="number"
                    name="GraduationYear"
                    required
                    min="2025"
                    max="2100"
                    value={registerData.GraduationYear || ""}
                    onChange={handleChange}
                    placeholder="مثال: 2025"
                  />
                  {renderError("GraduationYear")}
                </div>
                <div className="date-input">
                  <label>الفصل المتوقع للتخرج</label>
                  <select
                    name="Graduationsemester"
                    required
                    value={registerData.Graduationsemester || ""}
                    onChange={handleChange}
                  >
                    <option value="">-- اختر الفصل --</option>
                    <option value="1">الأول</option>
                    <option value="2">الثاني</option>
                  </select>
                  {renderError("GraduationSemester")}
                </div>
              </div>
            )}

            <div className="form-row">
              <div className="input-group">
                <input
                  type="password"
                  name="Password"
                  value={registerData.Password}
                  onChange={handleChange}
                  placeholder="كلمة المرور"
                  required
                  minLength={6}
                />
                {renderError("Password")}
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="Conformpassword"
                  value={registerData.Conformpassword}
                  onChange={handleChange}
                  placeholder="تأكيد كلمة المرور"
                  required
                  minLength={6}
                />
                {renderError("Conformpassword")}
              </div>
            </div>

            {error?.title && <p className="Error">{error.title}</p>}
            {error && typeof error === "string" && (
              <p className="Error">{error}</p>
            )}
          </section>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "جاري المعالجة..." : "إنشاء حساب"}
          </button>
        </form>
      </section>
    </>
  );
}

export default RegistrationPage;
