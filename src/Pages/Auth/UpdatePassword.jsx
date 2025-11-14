import React, { useState } from "react";
import logo from "./../../assets/Images/logo/logo-finalstep-removebg-preview.png";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../../services";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePassword() {
  const { "*": token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [formdata, serFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const email = localStorage.getItem("Email");
  const UpdatePass = useMutation({
    mutationFn: () => AuthService.ResetPassword({ ...formdata, token }, email),
    onSuccess: () => navigate("/Auth/Login"),
  });
  const handelSubment = async () => {
    if (formdata.newPassword != formdata.confirmPassword) {
      setError("كلمة السر غير متطابة ");
      return;
    }
    await UpdatePass.mutateAsync();
  };
  return (
    <div className="forget-password-page">
      <div className="forget-password-card">
        {/* Logo */}
        <div className="logo-container" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="forget-password-logo" />
        </div>
        {/* Title */}
        <h2 className="forget-password-title">تعيين كلمة مرور جديدة</h2>

        {/* password inputs  */}
        <input
          type="password"
          value={formdata.newPassword}
          onChange={(e) =>
            serFormData((prev) => ({ ...prev, newPassword: e.target.value }))
          }
          placeholder="تعين كلمة سر جديدة "
          className="forget-password-input"
        />
        <input
          type="password"
          value={formdata.confirmPassword}
          onChange={(e) =>
            serFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          placeholder="تأكيد كلمة السر"
          className="forget-password-input"
        />
        {/* Submit Button */}
        {(UpdatePass.isError || error) && (
          <p className="Error">{error || UpdatePass.error}</p>
        )}
        <button
          className="forget-password-button"
          onClick={handelSubment}
          disabled={UpdatePass.isPending}
        >
          تغير كلمة السر
        </button>
      </div>
    </div>
  );
}

export default UpdatePassword;
