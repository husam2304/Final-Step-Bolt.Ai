import React, { useState } from "react";
import SectionCard from "../../shared/SectionCard";
import {
  Group,
  Share,
  Message,
  WhatsApp,
  Phone,
  Link as LinkIcon,
  ContentCopy,
  Check,
} from "@mui/icons-material";

const ContactStudentSection = ({ studentName, studentId, phoneNumber }) => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate profile share link
  const profileLink = `${window.location.origin}/student/${studentId}`;

  // Generate WhatsApp link
  const whatsappLink = `https://wa.me/${phoneNumber}?text=مرحباً، أنا مهتم بالتواصل معك بخصوص مشروعك`;

  // Handle share profile
  const handleShareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ملف ${studentName}`,
          text: `تعرف على ${studentName} ومشاريعه`,
          url: profileLink,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(profileLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle copy phone number
  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SectionCard
        title={`التواصل مع ${studentName}`}
        icon={<Message sx={{ color: "var(--primary-color)" }} />}
      >
        <div className="space-y-4 mt-4">
          {" "}
          {/* Added margin top and reduced spacing */}
          {/* Invite to Team Button */}
          <button
            onClick={() => {
              /* Handle invite logic */
            }}
            className="w-full bg-[var(--btn-primary-bg)] text-white px-4 py-3 rounded-lg hover:bg-[var(--btn-primary-hover)] transition-all duration-300 flex items-center justify-center gap-2 text-base font-medium shadow-md hover:shadow-lg transform hover:scale-105"
            style={{
              backgroundColor: "var(--btn-primary-bg)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--btn-primary-hover)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--btn-primary-bg)";
            }}
          >
            <Group className="text-lg" />
            دعوة للانضمام إلى فريقي
          </button>
          {/* Share Profile Button */}
          <button
            onClick={handleShareProfile}
            className="w-full bg-[var(--bg-light)] text-[var(--text-color)] border border-[var(--border-color)] px-4 py-3 rounded-lg hover:bg-[var(--hover-bg)] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all duration-300 flex items-center justify-center gap-2 text-base font-medium shadow-sm hover:shadow-md transform hover:scale-105 mt-3"
          >
            <Share className="text-lg" />
            مشاركة الملف الشخصي
            {copied && (
              <span className="flex items-center gap-1 text-xs text-green-500">
                <Check fontSize="small" />
                تم النسخ
              </span>
            )}
          </button>
          {/* Send Message Button */}
          <button
            onClick={() => setShowMessageModal(true)}
            className="w-full bg-[var(--btn-success-bg)] text-white px-4 py-3 rounded-lg hover:bg-[var(--btn-success-hover)] transition-all duration-300 flex items-center justify-center gap-2 text-base font-medium shadow-md hover:shadow-lg transform hover:scale-105 mt-3"
            style={{
              backgroundColor: "var(--btn-success-bg)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--btn-success-hover)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--btn-success-bg)";
            }}
          >
            <Message className="text-lg" />
            إرسال رسالة
          </button>
        </div>
      </SectionCard>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--modal-bg)] rounded-xl p-6 max-w-md w-full border border-[var(--border-color)] mt-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[var(--text-color)] flex items-center mt-4">
                <Message className="ml-2 text-[var(--primary-color)]" />
                التواصل مع {studentName}
              </h3>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-[var(--text-color-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Phone Number Section */}
              <div className="bg-[var(--bg-light)] rounded-lg p-4 border border-[var(--border-color)] mb-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center text-[var(--text-color)]">
                    <Phone className="ml-2 text-[var(--primary-color)]" />
                    <span className="font-medium">رقم الهاتف</span>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="text-[var(--text-color-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200 flex items-center gap-1 text-sm"
                  >
                    {copied ? (
                      <>
                        <Check fontSize="small" />
                        تم النسخ
                      </>
                    ) : (
                      <>
                        <ContentCopy fontSize="small" />
                        نسخ
                      </>
                    )}
                  </button>
                </div>
                <p className="text-lg font-semibold text-[var(--text-color)] text-center">
                  {phoneNumber}
                </p>
              </div>

              {/* WhatsApp Section */}
              <div className="bg-[var(--bg-light)] rounded-lg p-4 border border-[var(--border-color)] mb-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center text-[var(--text-color)]">
                    <WhatsApp className="ml-2 text-green-500" />
                    <span className="font-medium">واتساب</span>
                  </div>
                  <LinkIcon className="text-[var(--text-color-secondary)]" />
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg text-sm"
                >
                  <WhatsApp className="text-lg" />
                  فتح محادثة واتساب
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-[var(--border-color)]">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 px-4 py-2 text-[var(--text-color-secondary)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--hover-bg)] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all duration-200 cursor-pointer font-medium text-sm"
                >
                  إغلاق
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg text-center text-sm"
                >
                  <WhatsApp className="text-lg" />
                  بدء المحادثة
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactStudentSection;
