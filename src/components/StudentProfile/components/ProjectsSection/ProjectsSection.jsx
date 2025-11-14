import React, { useState } from "react";
import SectionCard from "../../shared/SectionCard";
import ActiveProject from "./ActiveProject";
import PastProjects from "./PastProjects";
import TerminalIcon from "@mui/icons-material/Terminal";
import CreatProjectBottun from "../../../UI/Buttons/CreateProjectButton";

const ProjectsSection = ({ activeProject, pastProjects }) => {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <SectionCard title="مشاريعي" icon={<TerminalIcon />}>
      {/* Tabs Navigation */}
      <CreatProjectBottun />
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`flex-1 py-2 px-4 text-center font-medium transition-all duration-200 cursor-pointer ${
            activeTab === "active"
              ? "border-b-2 text-primary"
              : "text-gray-500 hover:text-primary hover:border-b-2 hover:border-primary"
          }`}
          onClick={() => setActiveTab("active")}
          style={{
            borderColor:
              activeTab === "active" ? "var(--primary-color)" : "transparent",
            color: activeTab === "active" ? "var(--primary-color)" : "",
          }}
        >
          المشاريع النشطة
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center font-medium transition-all duration-200 cursor-pointer ${
            activeTab === "past"
              ? "border-b-2 text-primary"
              : "text-gray-500 hover:text-primary hover:border-b-2 hover:border-primary"
          }`}
          onClick={() => setActiveTab("past")}
          style={{
            borderColor:
              activeTab === "past" ? "var(--primary-color)" : "transparent",
            color: activeTab === "past" ? "var(--primary-color)" : "",
          }}
        >
          المشاريع السابقة
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "active" ? (
          <ActiveProject activeProject={activeProject} />
        ) : (
          <PastProjects pastProjects={pastProjects} />
        )}
      </div>
    </SectionCard>
  );
};

export default ProjectsSection;
