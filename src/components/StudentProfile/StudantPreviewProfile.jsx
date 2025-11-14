import { useState } from "react";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import SkillsSection from "./components/SkillsSection/SkillsSection";
import AvailabilityStatus from "./components/AvailabilityStatus/AvailabilityStatus";
import ProjectSectionPreview from "./components/ProjectsSection/projectSectionPreivew";
import ContactStudent from "./components/ContactStudent/ContactStudent";
import { Folder, Code, Person, Share } from "@mui/icons-material";

const StudantPreviewProfile = ({ profileDate }) => {
  const [cuurntState, setcurruntState] = useState(profileDate);
  const [activeTab, setActiveTab] = useState("projects");

  const {
    name,
    id,
    gender,
    phone,
    bio,
    currentStatus,
    techSkills,
    activeProject,
    pastProjects,
  } = cuurntState;

  const tabs = [
    { id: "projects", label: "المشاريع", icon: Folder },
    { id: "skills", label: "المهارات", icon: Code },
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
            bio={bio}
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
            <ProjectSectionPreview
              pastProjects={pastProjects}
              activeProject={activeProject}
            />
          )}

          {activeTab === "skills" && <SkillsSection techSkills={techSkills} />}

          {activeTab === "contact" && (
            <ContactStudent
              studentId={id}
              studentName={name}
              phoneNumber={phone}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudantPreviewProfile;
