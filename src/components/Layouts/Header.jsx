import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Images/logo/logo-finalstep-removebg-preview.png";
import LoginButton from "../UI/Buttons/AuthButtons";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import ThemeToggle from "../../components/ThemeToggle";
import NotificationMenu from "./NotificationMenu";

export default function Header() {
  const defaultNavItems = [
    { path: "/", text: "الرئيسية" },
    { path: "/Projects", text: "المشاريع" },
    { path: "/HowToStartPage", text: "كيف ابدأ" },
    { path: "/Doctors/DoctorProfilepage", text: "ملف الدكتور" },
    { path: "/Students/StudantPreviewPage", text: " معاينة ملف الطالب" },
    { path: "/Doctors/DoctorPreviewpage", text: " معاينة ملف الدكتور" },
  ];

  const token = useSelector((state) => state?.auth?.token);
  const isLoggedIn = !!token;

  const navItems = isLoggedIn
    ? [
      ...defaultNavItems,
      {
        path: "/Students/StudentProfilePage",
        text: "ملفي",
        icon: (
          <AccountCircleIcon
            fontSize="medium"
            sx={{ color: "var(--primary-color)" }}
          />
        ),
      },
    ]
    : defaultNavItems;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-[var(--bg-color)] shadow-sm border-b border-[var(--border-color)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo - Smaller and better positioned */}
        <div className="flex-shrink-0">
          {logo && (
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-auto object-contain" // Reduced from h-25 to h-16
            />
          )}
        </div>

        {/* Desktop Navigation - Better spacing and organization */}
        <nav
          className="hidden md:flex items-center justify-center flex-1 mx-8"
          role="navigation"
          aria-label="القائمة الرئيسية"
        >
          <div className="flex items-center gap-6">
            {" "}
            {/* Reduced gap */}
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `relative text-base font-medium text-[var(--text-color)] hover:text-[var(--primary-color)] transition-all duration-200
                  py-2 px-3 rounded-lg no-underline
                  ${isActive
                    ? "text-[var(--primary-color)] bg-[var(--primary-color--overlay)] font-semibold"
                    : "hover:bg-[var(--hover-bg)]"
                  }`
                }
              >
                <div className="flex items-center gap-2">
                  {item.text}
                  {item.icon && <span>{item.icon}</span>}
                </div>

                {/* Active indicator */}
                {({ isActive }) =>
                  isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--primary-color)] rounded-full"></div>
                  )
                }
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Right Section - Better organized */}
        <div className="flex items-center gap-3">
          {" "}
          {/* Reduced gap */}
          {/* Theme Toggle - Moved here for better organization */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          {/* Login Button */}
          <div className="hidden sm:block">
            <LoginButton />
          </div>
          {token && (

            <NotificationMenu />
          )}
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[var(--text-color)] hover:text-[var(--primary-color)] hover:bg-[var(--hover-bg)] p-2 rounded-lg transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <CloseIcon fontSize="medium" /> // Reduced size
            ) : (
              <MenuIcon fontSize="medium" /> // Reduced size
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Improved design */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-color)] border-t border-[var(--border-color)] shadow-lg">
          <div className="px-4 py-3">
            {/* Mobile Theme Toggle and Login */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-color)]">
              <ThemeToggle />
              <div className="sm:hidden">
                <LoginButton />
              </div>
            </div>

            {/* Mobile Navigation Items */}
            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full text-base font-medium py-3 px-4 rounded-lg transition-all duration-200 no-underline
                    ${isActive
                      ? "text-[var(--primary-color)] bg-[var(--primary-color--overlay)] font-semibold"
                      : "text-[var(--text-color)] hover:text-[var(--primary-color)] hover:bg-[var(--hover-bg)]"
                    }`
                  }
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.text}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
