import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  BookOpen,
  Users,
  Folder,
  Home,
} from "lucide-react";

import { Link } from "react-router-dom";
import AboutUs from "../../utils/AboutUs";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[var(--Footer-background-color)] pt-12 pb-6 px-4 border-t border-[var(--card-border-color)]"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-light)] mb-4">
              التواصل{" "}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail
                  className="text-[var(--primary-color)] mt-1 mr-3"
                  size={18}
                />
                <span className="text-[var(--text-light)]">
                  {AboutUs.Email}
                </span>
              </div>
              <div className="flex items-start">
                <Phone
                  className="text-[var(--primary-color)] mt-1 mr-3"
                  size={18}
                />
                <span className="text-[var(--text-light)]">
                  {AboutUs.Phone}
                </span>
              </div>
              <div className="flex items-start">
                <MapPin
                  className="text-[var(--primary-color)] mt-1 mr-3"
                  size={18}
                />
                <span className="text-[var(--text-light)]">
                  {AboutUs.Location}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-light)] mb-4">
              الاقسام
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/projects"
                  className="text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors duration-300 flex items-center mt-1.5"
                >
                  <Folder size={16} className="mr-2 mt-1.5" />
                  المشاريع المعروضة{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors duration-300 flex items-center mt-1.5"
                >
                  <Users size={16} className="mr-2 mt-1.5" />
                  مشاريع مقترحة من قبل الدكتور
                </Link>
              </li>
              <li>
                <Link
                  to="/students"
                  className="text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors duration-300 flex items-center mt-1.5"
                >
                  <BookOpen size={16} className="mr-2" />
                  طلاب يبحثون عن مشروع{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/ai"
                  className="text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors duration-300 flex items-center mt-1.5"
                >
                  <MessageCircle size={16} className="mr-2" />
                  إسأل الذكاء الاصطناعي
                </Link>
              </li>
              <li>
                <Link
                  to="/how-to-start"
                  className="text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors duration-300 r mt-1.5"
                >
                  كيف ابدأ مشروعي{" "}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links - FIXED SPACING */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-light)] mb-4">
              روابط سريعة{" "}
            </h3>
            <div className="flex flex-col">
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors duration-300 flex items-center "
                  >
                    <Home size={16} className="mr-2" />
                    الصفحة الرئيسية{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aboutUS"
                    className="text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors duration-300 "
                  >
                    عن المنصة{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors duration-300 mt-1.5"
                  >
                    المشاريع
                  </Link>
                </li>
                <li>
                  <Link
                    to="/How-to-start"
                    className="text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors duration-300 mt-1.5"
                  >
                    كيف أبدأ{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* About FinalStep */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-light)] mb-4">
              FinalStep
            </h3>
            <p className="text-[var(--text-light)] leading-relaxed">
              منصة finalstep تهدف إلى تسهيل التعاون الأكاديمي بين الطلاب
              والدكاترة في مختلف المجالات والاختصاصات.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {/* Social media icons would go here */}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`border-t border-[var(--card-border-color)] pt-6 text-center text-[var(--text-light)] text-sm transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          © {new Date().getFullYear()} FinalStep. جميع الحقوق محفوظة.
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-entrance {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
