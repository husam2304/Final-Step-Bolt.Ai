import React, { useState } from "react";
// import "./ForgetPassword.css";
import logo from "./../../assets/Images/logo/logo-finalstep-removebg-preview.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services";
import { useMutation } from "@tanstack/react-query";
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const SendOtp = useMutation({
    mutationFn: () => AuthService.ForgotPassword(email),
    // onSuccess: () => navigate("/Auth/MailSend", { state: { email: email } }),
    onSuccess: (data) => {
      localStorage.setItem("Email", email)
      navigate(`/Auth/UpdatePassword/${data.token}`)
    }
  },
  );
  const handleSendOtp = async () => {
    await SendOtp.mutateAsync()
    console.log(SendOtp)
  }
  return (
    <div className="forget-password-page">
      <div className="forget-password-card">
        {/* Logo */}
        <div className='logo-container' onClick={() => navigate("/")}>

          <img src={logo} alt="Logo" className="forget-password-logo" />
        </div>
        {/* Title */}
        <h2 className="forget-password-title"> هل نسيت كلمة المرور ؟ </h2>
        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="البريد الإلكتروني"
          className="forget-password-input"
        />
        {/* Submit Button */}
        {SendOtp.isError && (<p className="Error">{SendOtp.error}</p>)}
        <button className="forget-password-button" onClick={handleSendOtp} disabled={SendOtp.isPending}>
          إرسال رابط التعيين
        </button>

        {/* Remember Password Link */}
        <div className="forget-password-remember">
          تذكرت كلمة المرور؟{" "}
          <span className="forget-password-link">
            {" "}
            <Link to="/Auth/Login">العودة لتسجيل الدخول </Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
