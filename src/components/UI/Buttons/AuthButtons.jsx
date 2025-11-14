import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/AuthActions";

function LoginButton() {
  const token = useSelector((state) => state?.auth?.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      {
        token ? (
          <div className="flex justify-evenly items-center" >
            <button className="bg-[var(--danger-color)] w-25 h-8 rounded-full p-1 mx-2 hover:bg-[var(--danger-color-hover)]" onClick={handleLogout}>
              سجل الخروج
            </button>

          </div>
        ) : (

          <div className="flex justify-evenly items-center">
            <button
              className="bg-[var(--primary-color)] text-sm text-[--text-color] w-25 h-8 rounded-full p-1 mx-2 hover:bg-[var(--primary-color-hover)]"
              onClick={() => navigate("/Auth/Login")}
            >
              تسجيل الدخول
            </button>
            <button
              className="text-[--text-color] text-sm w-25 h-8 round mx-2 p-1 rounded-full hover:bg-[var(--primary-color-hover)]"
              onClick={() => navigate("/Auth/Login")}
            >
              إنشاء حساب
            </button>

          </div>
        )
      }
    </>
  );
}

export default LoginButton;
