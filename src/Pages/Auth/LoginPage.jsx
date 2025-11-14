import React from "react";
import { useState } from "react";
import logo from "./../../assets/Images/logo/logo-finalstep-removebg-preview.png";
import authImage from "./../../assets/Images/Tset.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/AuthActions";
import OutLook from "./../../assets/Images/OutLook.svg";

// MUI Icons //
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
// MUI Icons //

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passVisiple, setPassVisiple] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const loginRes = await dispatch(login(formData));
      if (!loginRes.error) navigate("/");
      else {
        setError(loginRes.payload || "حدث خطأ ما حاول لاحقا");
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message || "حدث خطأ ما حاول لاحقا");
    } finally {
      setLoading(false);
    }
  };
  const handlecreateAccount = () => {
    navigate("/Auth/Registration");
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "radio" ? value : type === "checkbox" ? checked : value,
    }));
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

        <h2>تسجيل الدخول </h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label className="label-cont" htmlFor="email">
              الحساب الجامعي
              <EmailOutlinedIcon
                style={{
                  top: "45%",
                  left: "5%",
                  position: "absolute",
                  transform: "translate(-50 %, 0)",
                }}
              />
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="120220@st.ahu.edo.jo "
              />
            </label>
          </div>
          <div>
            <label className="label-cont" htmlFor="password">
              كلمة السر
              {passVisiple ? (
                <VisibilityIcon
                  className="icon-for-mobile"
                  style={{
                    top: "45%",
                    left: "5%",
                    position: "absolute",
                    transform: "translate(-50 %, 0)",
                    cursor: "pointer ",
                  }}
                  onClick={() => setPassVisiple(!passVisiple)}
                />
              ) : (
                <VisibilityOffIcon
                  style={{
                    top: "45%",
                    left: "5%",
                    position: "absolute",
                    transform: "translate(-50 %, 0)",
                    cursor: "pointer ",
                  }}
                  onClick={() => setPassVisiple(!passVisiple)}
                />
              )}
              <input
                name="password"
                id="password"
                required
                type={passVisiple ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-row">
            <label htmlFor="rememberMe" className="RememberMe">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                value={formData.rememberMe}
                onChange={handleChange}
              />
              <span> تذكرني </span>
            </label>
            <Link to="/Auth/ForgetPassword" style={{ textAlign: "left" }}>
              هل نسيت كلمة السر{" "}
            </Link>
          </div>
          {error && <p className="Error">{error}</p>}
          <button type="submit" className="submit-button" disabled={loading}>
            تسجيل الدخول
          </button>
        </form>
        <div className="seprater">
          <span>أو سجل باستخدام </span>
        </div>
        <div className="Login-option">
          <button className="create-account " onClick={handlecreateAccount}>
            انشاء حساب جديد{" "}
          </button>
          <button className="outlook-button ">
            {" "}
            <img src={OutLook} alt="Outlook Icon" width="20px" />{" "}
            <span
              style={{
                textalign: "center",
                margin: "10px",
                padding: "5px",
                position: "relative",
                bottom: "3px",
              }}
            >
              Outlook
            </span>{" "}
          </button>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
