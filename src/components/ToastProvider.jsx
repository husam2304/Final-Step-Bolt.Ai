import { ToastContainer } from "react-toastify";
import React from "react";
import { useSelector } from "react-redux";

const ToastProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);

  // Optional: Custom toast function that enforces the limit

  return (
    <>
      {children}
      <ToastContainer
        position="top-left"
        autoClose={1000}
        closeOnClick={true}
        pauseOnHover={true}
        hideProgressBar={false}
        limit={1} // Maximum toasts shown
        newestOnTop
        rtl={true}
        pauseOnFocusLoss
        draggable
        theme={theme === "light" ? `light` : `dark`}
        enableMultiContainer={false}
        stacked
      />
    </>
  );
};

export default ToastProvider;
