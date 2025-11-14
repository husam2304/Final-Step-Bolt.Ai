import React from "react";
import ManIcon from "@mui/icons-material/Man";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import personalImage from "../../../../assets/Images/PersonalImage.jpeg";

const ProfileHeader = ({
  // Basic Info
  name,
  id,
  gender,
  phone,
  email,
  bio,

  // Academic Info
  academicRank,

  specialization,

  // Rating
  rating = { average: 0, totalReviews: 0 },

  // Links

  githubUrl,
  linkedinUrl,
  scholarUrl,
  researchGateUrl,
  universityUrl,

  // Role detection
  role = "student",
}) => {
  const handleLinkClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const isDoctor = role === "doctor";

  // دالة لعرض النجوم
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <StarIcon key={i} sx={{ color: "#FFD700", fontSize: 20 }} />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <StarHalfIcon key={i} sx={{ color: "#FFD700", fontSize: 20 }} />
        );
      } else {
        stars.push(
          <StarBorderIcon key={i} sx={{ color: "#FFD700", fontSize: 20 }} />
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-[var(--bg-color)] p-6 rounded-xl shadow-xl text-center animate-fade-in-up">
      {/* Profile Image */}
      <div className="relative inline-block">
        <img
          src={personalImage}
          alt={`${name}'s profile`}
          className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-primary"
          style={{ borderColor: "var(--primary-color)" }}
        />
        {/* Academic Badge for Doctor */}
        {isDoctor && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[var(--primary-color)] text-white px-3 py-1 rounded-full text-xs font-bold">
            {academicRank}
          </div>
        )}
      </div>

      {/* Name */}
      <h2
        className="text-2xl font-extrabold mb-1"
        style={{ color: "var(--text-color)" }}
      >
        {name}
      </h2>

      {/* Rating Section - للدكتور فقط */}
      {isDoctor && rating && (
        <div className="mb-3 flex flex-col items-center">
          <div className="flex items-center gap-1 mb-1">
            {renderStars(rating.average)}
            <span className="text-lg font-bold text-[var(--text-color)] mr-2">
              {rating.average.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({rating.totalReviews} تقييم)
          </span>
        </div>
      )}

      {/* Academic Info */}
      <div className="mb-4 space-y-1">
        <p className="text-sm text-[var(--primary-color)] font-medium">
          {specialization}
        </p>
        <p className="text-xs text-gray-400">{id}</p>
      </div>

      {/* Personal Information */}
      <div className="space-y-4 text-right">
        {/* Gender */}
        <div className="text-var(--text-color)">
          <ManIcon
            className="inline-block ml-2"
            sx={{ color: "var(--primary-color)" }}
          />
          <strong>الجنس:</strong> {gender}
        </div>

        {/* Phone */}
        <div className="text-var(--text-color)">
          <LocalPhoneIcon
            className="inline-block ml-2"
            sx={{ color: "var(--primary-color)" }}
          />
          <strong>رقم الهاتف:</strong> {phone}
        </div>

        {/* Email */}
        {email && (
          <div className="text-var(--text-color)">
            <EmailIcon
              className="inline-block ml-2"
              sx={{ color: "var(--primary-color)" }}
            />
            <strong>البريد الإلكتروني:</strong> {email}
          </div>
        )}

        {/* Bio */}
        <div className="text-var(--text-color)">
          <PersonIcon
            className="inline-block ml-2"
            sx={{ color: "var(--primary-color)" }}
          />
          <strong>السيرة الذاتية:</strong>
          <p className="text-sm text-var(--text-color) leading-relaxed mt-2 text-justify">
            {bio}
          </p>
        </div>

        <br />

        {/* Academic & Social Links Section */}
        <div className="pt-4 border-t border-[var(--border-color)]">
          <div className="mb-4">
            <LinkIcon
              className="inline-block ml-2"
              sx={{ color: "var(--primary-color)" }}
            />
            <strong className="text-[var(--text-color)]">
              الروابط الأكاديمية والمهنية
            </strong>
          </div>

          {/* Social Links Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            {/* Google Scholar Link */}
            {scholarUrl && (
              <button
                onClick={() => handleLinkClick(scholarUrl)}
                className="flex items-center justify-between p-3 bg-[var(--primary-color--overlay)] hover:bg-[var(--primary-color-hover)] rounded-lg border border-[var(--border-color)] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center">
                  <SchoolIcon
                    sx={{ color: "var(--primary-color)", marginLeft: "8px" }}
                  />
                  <span className="text-gray-700 font-medium">
                    Google Scholar
                  </span>
                </div>
                <OpenInNewIcon
                  sx={{ fontSize: 16, color: "var(--primary-color)" }}
                />
              </button>
            )}

            {/* ResearchGate Link */}
            {researchGateUrl && (
              <button
                onClick={() => handleLinkClick(researchGateUrl)}
                className="flex items-center justify-between p-3 bg-[var(--primary-color--overlay)] hover:bg-[var(--primary-color-hover)] rounded-lg border border-[var(--border-color)] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center">
                  <WorkIcon
                    sx={{ color: "var(--primary-color)", marginLeft: "8px" }}
                  />
                  <span className="text-gray-700 font-medium">
                    ResearchGate
                  </span>
                </div>
                <OpenInNewIcon
                  sx={{ fontSize: 16, color: "var(--primary-color)" }}
                />
              </button>
            )}

            {/* University Profile Link */}
            {universityUrl && (
              <button
                onClick={() => handleLinkClick(universityUrl)}
                className="flex items-center justify-between p-3 bg-[var(--primary-color--overlay)] hover:bg-[var(--primary-color-hover)] rounded-lg border border-[var(--border-color)] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center">
                  <SchoolIcon
                    sx={{ color: "var(--primary-color)", marginLeft: "8px" }}
                  />
                  <span className="text-gray-700 font-medium">
                    الصفحة الجامعية
                  </span>
                </div>
                <OpenInNewIcon
                  sx={{ fontSize: 16, color: "var(--primary-color)" }}
                />
              </button>
            )}

            {/* LinkedIn Link */}
            {linkedinUrl && (
              <button
                onClick={() => handleLinkClick(linkedinUrl)}
                className="flex items-center justify-between p-3 bg-[var(--primary-color--overlay)] hover:bg-[var(--primary-color-hover)] rounded-lg border border-[var(--border-color)] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center">
                  <LinkedInIcon
                    sx={{ color: "var(--primary-color)", marginLeft: "8px" }}
                  />
                  <span className="text-gray-700 font-medium">LinkedIn</span>
                </div>
                <OpenInNewIcon
                  sx={{ fontSize: 16, color: "var(--primary-color)" }}
                />
              </button>
            )}

            {/* GitHub Link */}
            {githubUrl && (
              <button
                onClick={() => handleLinkClick(githubUrl)}
                className="flex items-center justify-between p-3 bg-[var(--primary-color--overlay)] hover:bg-[var(--primary-color-hover)] rounded-lg border border-[var(--border-color)] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center">
                  <GitHubIcon
                    sx={{ color: "var(--primary-color)", marginLeft: "8px" }}
                  />
                  <span className="text-gray-700 font-medium">GitHub</span>
                </div>
                <OpenInNewIcon
                  sx={{ fontSize: 16, color: "var(--primary-color)" }}
                />
              </button>
            )}

            {/* Empty State Message */}
            {!githubUrl &&
              !linkedinUrl &&
              !scholarUrl &&
              !researchGateUrl &&
              !universityUrl && (
                <p className="text-gray-500 text-sm py-2">
                  لا توجد روابط متاحة
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
