import React from "react";
import ManIcon from "@mui/icons-material/Man";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import personalImage from "../../../../assets/Images/PersonalImage.jpeg";
const ProfileHeader = ({
  name,
  id,
  gender,
  phone,
  bio,
  githubUrl = "https://github.com/hasasnh/Interns-Net-Training",
  linkedinUrl = "https://github.com/hasasnh/Interns-Net-Training",
}) => {
  const handleLinkClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-[var(--bg-color)] p-6 rounded-xl shadow-xl text-center animate-fade-in-up">
      {/* Profile Image */}
      <img
        src={personalImage}
        alt={`${name}'s profile`}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary"
        style={{ borderColor: "var(--primary-color)" }}
      />

      {/* Name */}
      <h2
        className="text-2xl font-extrabold mb-2"
        style={{ color: "var(--text-color)" }}
      >
        {name}
      </h2>

      {/* ID */}
      <p className="text-sm text-gray-500 mb-6">{id}</p>

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
        {/* Social Links Section */}
        <div className="pt-4 border-t border-[var(--border-color)]">
          <div className="mb-4">
            <LinkIcon
              className="inline-block ml-2"
              sx={{ color: "var(--primary-color)" }}
            />
            <strong className="text-[var(--text-color)]">الروابط</strong>
          </div>

          {/* Social Links Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            {/* GitHub Link Button */}
            {githubUrl && (
              <button
                onClick={() => handleLinkClick(githubUrl)}
                disabled={!githubUrl}
                className="flex items-center justify-between p-3 bg-[var(--primary-color--overlay)] hover:bg-[var(--primary-color-hover)] rounded-lg border border-[var(--border-color)] transition-all duration-200 disabled:opacity-50  cursor-pointer"
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

            {/* LinkedIn Link Button */}
            {linkedinUrl && (
              <button
                onClick={() => handleLinkClick(linkedinUrl)}
                disabled={!linkedinUrl}
                className="flex items-center justify-between p-3 bg-[var(--primary-color--overlay)] hover:bg-[var(--primary-color-hover)] rounded-lg border border-[var(--border-color)] transition-all duration-200 disabled:opacity-50  cursor-pointer"
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

            {/* Empty State Message */}
            {!githubUrl && !linkedinUrl && (
              <p className="text-gray-500 text-sm py-2">لا توجد روابط متاحة</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
