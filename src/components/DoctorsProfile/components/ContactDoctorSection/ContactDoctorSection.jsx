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
  School,
  Email,
} from "@mui/icons-material";

const ContactDoctorSection = ({
  doctorName,
  doctorId,
  phoneNumber,
  email,
  department,
}) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate profile share link
  const profileLink = `${window.location.origin}/doctor/${doctorId}`;

  // Generate WhatsApp link
  const whatsappLink = `https://wa.me/${phoneNumber}?text=مرحباً دكتور، أنا مهتم بالتواصل معك بخصوص الإشراف على مشروعي`;

  // Handle share profile
  const handleShareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ملف د. ${doctorName}`,
          text: `تعرف على د. ${doctorName} - ${department}`,
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

  // Handle copy contact info
  const handleCopyContact = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SectionCard
        title={`التواصل مع د. ${doctorName}`}
        icon={<Message sx={{ color: "var(--primary-color)" }} />}
      >
        <div className="space-y-4 mt-4">
          {/* Request Supervision Button */}
          <button
            onClick={() => {
              /* Handle supervision request logic */
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
            <School className="text-lg" />
            طلب الإشراف على مشروعي
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
            onClick={() => setShowContactModal(true)}
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

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--modal-bg)] rounded-xl p-6 max-w-md w-full border border-[var(--border-color)] mt-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[var(--text-color)] flex items-center mt-4">
                <Message className="ml-2 text-[var(--primary-color)]" />
                التواصل مع د. {doctorName}
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-[var(--text-color-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Department Info */}
              <div className="bg-[var(--bg-light)] rounded-lg p-4 border border-[var(--border-color)]">
                <div className="flex items-center text-[var(--text-color)] mb-2">
                  <School className="ml-2 text-[var(--primary-color)]" />
                  <span className="font-medium">القسم</span>
                </div>
                <p className="text-lg font-semibold text-[var(--text-color)] text-center">
                  {department}
                </p>
              </div>

              {/* Phone Number Section */}
              <div className="bg-[var(--bg-light)] rounded-lg p-4 border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-[var(--text-color)]">
                    <Phone className="ml-2 text-[var(--primary-color)]" />
                    <span className="font-medium">رقم الهاتف</span>
                  </div>
                  <button
                    onClick={() => handleCopyContact(phoneNumber)}
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

              {/* Email Section */}
              <div className="bg-[var(--bg-light)] rounded-lg p-4 border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-[var(--text-color)]">
                    <Email className="ml-2 text-[var(--primary-color)]" />
                    <span className="font-medium">البريد الإلكتروني</span>
                  </div>
                  <button
                    onClick={() => handleCopyContact(email)}
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
                <p className="text-lg font-semibold text-[var(--text-color)] text-center break-all">
                  {email}
                </p>
              </div>

              {/* WhatsApp Section */}
              <div className="bg-[var(--bg-light)] rounded-lg p-4 border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-3">
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

              {/* Additional Contact Methods */}
              <div className="bg-[var(--bg-light)] rounded-lg p-4 border border-[var(--border-color)]">
                <h4 className="font-medium text-[var(--text-color)] mb-3 flex items-center">
                  <LinkIcon className="ml-2 text-[var(--primary-color)]" />
                  روابط إضافية
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[var(--text-color-secondary)]">
                      الملف الشخصي:
                    </span>
                    <button
                      onClick={() => handleCopyContact(profileLink)}
                      className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] transition-colors duration-200 flex items-center gap-1 text-xs"
                    >
                      <ContentCopy fontSize="small" />
                      نسخ الرابط
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-[var(--border-color)]">
                <button
                  onClick={() => setShowContactModal(false)}
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

export default ContactDoctorSection;
