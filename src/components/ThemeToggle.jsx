// src/components/ThemeToggle.js
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun icon

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/Themestore";

export const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <button
      onClick={handleToggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="theme-toggle"
    >
      {theme === "light" ? (
        <Brightness4Icon size={20} />
      ) : (
        <Brightness7Icon size={20} />
      )}
      <span>{theme === "light" ? `الوضع المظلم` : `الوضع الفاتح`}</span>
    </button>
  );
};
export default ThemeToggle;
