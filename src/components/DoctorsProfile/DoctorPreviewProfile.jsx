import { useState } from "react";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import AvailabilityStatus from "./components/AvailabilityStatus/AvailabilityStatus";
import SupervisedProjectsSection from "./components/SupervisedProjectsSection/SupervisedProjectsSection";
import StatisticsSection from "./components/StatisticsSection/StatisticsSection";
import DoctorRatingSection from "./components/DoctorRatingSection/DoctorRatingSection";
import ContactDoctorSection from "./components/ContactDoctorSection/ContactDoctorSection";
import { Folder, Assessment, Star, Share } from "@mui/icons-material";

const DoctorPreviewProfile = ({ profileData }) => {
  const [currentData, setCurrentData] = useState(profileData);
  const [activeTab, setActiveTab] = useState("projects");

  const {
    name,
    id,
    gender,
    phone,
    email,
    bio,
    academicRank,
    department,
    specialization,
    officeLocation,
    officeHours,
    rating,
    links,
    currentStatus,
    supervisedProjects,
    completedProjects,
  } = currentData;

  const scholarUrl = links?.find(
    (link) => link.label === "Google Scholar"
  )?.url;
  const researchGateUrl = links?.find(
    (link) => link.label === "ResearchGate"
  )?.url;
  const linkedinUrl = links?.find((link) => link.label === "LinkedIn")?.url;
  const universityUrl = links?.find(
    (link) => link.label === "الصفحة الجامعية"
  )?.url;

  const tabs = [
    { id: "projects", label: "المشاريع", icon: Folder },
    { id: "statistics", label: "الإحصائيات", icon: Assessment },
    { id: "ratings", label: "التقييمات", icon: Star },
    { id: "contact", label: "التواصل", icon: Share },
  ];

  return (
    <div
      className="min-h-screen p-4 md:p-6 relative"
      style={{ backgroundColor: "var(--bg-light)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Profile Header - Always Visible */}
        <div className="mb-6">
          <ProfileHeader
            name={name}
            id={id}
            gender={gender}
            phone={phone}
            email={email}
            bio={bio}
            academicRank={academicRank}
            department={department}
            specialization={specialization}
            officeLocation={officeLocation}
            officeHours={officeHours}
            rating={rating}
            scholarUrl={scholarUrl}
            researchGateUrl={researchGateUrl}
            linkedinUrl={linkedinUrl}
            universityUrl={universityUrl}
            role="doctor"
          />
        </div>

        {/* Availability Status */}
        <div className="mb-6">
          <AvailabilityStatus currentStatus={currentStatus} />
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[var(--border-color)] mb-6 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-b-2 text-[var(--primary-color)]"
                    : "text-[var(--text-color-secondary)] hover:text-[var(--primary-color)]"
                }`}
                style={{
                  borderColor:
                    activeTab === tab.id
                      ? "var(--primary-color)"
                      : "transparent",
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent fontSize="small" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === "projects" && (
            <SupervisedProjectsSection
              supervisedProjects={supervisedProjects}
              completedProjects={completedProjects}
            />
          )}

          {activeTab === "statistics" && (
            <StatisticsSection
              supervisedProjects={supervisedProjects}
              completedProjects={completedProjects}
            />
          )}

          {activeTab === "ratings" && <DoctorRatingSection />}

          {activeTab === "contact" && (
            <ContactDoctorSection
              department={department}
              phoneNumber={phone}
              doctorId={id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPreviewProfile;
