import React, { useState } from "react";
import SectionCard from "../../shared/SectionCard";
import GroupsIcon from "@mui/icons-material/Groups";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import MarkProject from "../../../UI/Buttons/MarkProject";

const SupervisedProjectsSection = ({
  supervisedProjects = [],
  completedProjects = [],
}) => {
  const [activeTab, setActiveTab] = useState("active"); // 'active', 'completed'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // إحصائيات متقدمة
  const stats = {
    active: supervisedProjects.length,
    completed: completedProjects.length,
    total: supervisedProjects.length + completedProjects.length,
    students: [
      ...new Set([
        ...supervisedProjects.flatMap((p) => p.students),
        ...completedProjects.flatMap((p) => p.students),
      ]),
    ].length,
    publications: completedProjects.filter((p) => p.publication).length,
    completionRate:
      completedProjects.length > 0
        ? Math.round(
          (completedProjects.length /
            (completedProjects.length + supervisedProjects.length)) *
          100
        )
        : 0,
    avgStudentsPerProject:
      supervisedProjects.length + completedProjects.length > 0
        ? Math.round(
          ([...supervisedProjects, ...completedProjects].reduce(
            (acc, project) => acc + project.students.length,
            0
          ) /
            (supervisedProjects.length + completedProjects.length)) *
          10
        ) / 10
        : 0,
  };

  const tabs = [
    {
      id: "active",
      label: "المشاريع النشطة",
      count: stats.active,
      icon: PlayArrowIcon,
    },
    {
      id: "completed",
      label: "المشاريع المكتملة",
      count: stats.completed,
      icon: CheckCircleIcon,
    },
  ];

  const ProjectCard = ({ project, type }) => (
    <div
      className={`p-4 rounded-xl  transition-all duration-300 cursor-pointer group relative overflow-hidden bg-var[--card-bg] ${type === "active"
        ? " hover:border-[var(--primary-color)] hover:shadow-lg"
        : "  hover:border-[var(--primary-color)] hover:shadow-lg"
        } ${viewMode === "list" ? "mb-4" : "h-full"
        } hover:scale-[1.02] hover:bg-[var(--hover-bg)] dark:hover:bg-[var(--card-bg)]`}
      style={{
        boxShadow: "var(--btn-shadow)",
        transition: "var(--btn-transition)",
      }}
    >
      {/* Hover Overlay Effect */}
      <div className="absolute inset-0 bg-[var(--card-bg)]  transition-opacity duration-300 rounded-xl"></div>

      <div className="flex justify-between items-start mb-3 relative z-10">
        <h5 className="font-bold text-[var(--text-color)] text-lg flex-1 group-hover:text-[var(--primary-color)] transition-colors duration-300">
          {project.title}
        </h5>
        <span
          className={`text-xs px-2 py-1 rounded-full ml-2 transition-all duration-300 ${type === "active"
            ? "bg-green-500 text-[var(text-color)] group-hover:bg-[var(--primary-color)] group-hover:scale-110"
            : "bg-[var(--primary-color--overlay)] text-[var(text-color)] group-hover:bg-[var(--primary-color)] group-hover:scale-110"
            }`}
        >
          {project.status}
        </span>
      </div>

      {/* معلومات الطلاب */}
      <div className="mb-3 relative z-10">
        <div className="flex items-center mb-2">
          <PersonIcon
            fontSize="small"
            className="ml-1 text-[var(text-color)] group-hover:text-[var(--primary-color)] transition-colors duration-300"
          />
          <span className="text-sm font-medium text-[var(text-color)]  group-hover:text-[var(--primary-color)] transition-colors duration-300">
            الطلاب:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.students.map((student, studentIndex) => (
            <span
              key={studentIndex}
              className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${type === "active"
                ? "bg-[var(--primary-color--overlay)] text-[var(--text-color)]  group-hover:bg-[var(--primary-color)] group-hover:text-[var(--text-color)]"
                : "bg-[var(--primary-color--overlay)] text-[var(--text-color)]  group-hover:bg-[var(--primary-color)] group-hover:text-[var(--text-color)]"
                }`}
            >
              {student}
            </span>
          ))}
        </div>
      </div>

      {/* التواريخ */}
      <div className="grid grid-cols-2 gap-4 text-sm relative z-10">
        <div className="flex items-center">
          <CalendarTodayIcon
            fontSize="small"
            className="ml-1 text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors duration-300"
          />
          <div>
            <div className="text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors duration-300">
              البداية
            </div>
            <div className="font-medium text-[var(--text-color)]">
              {project.startDate}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <CalendarTodayIcon
            fontSize="small"
            className="ml-1 text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors duration-300"
          />
          <div>
            <div className="text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors duration-300">
              {type === "active" ? "متوقع الانتهاء" : "تاريخ الإكمال"}
            </div>
            <div
              className={`font-medium ${type === "active"
                ? " text-[var(--text-color)] group-hover:text-[var(--primary-color)]"
                : "text-[var(--text-color)] group-hover:text-[var(--primary-color)]"
                } transition-colors duration-300`}
            >
              {type === "active"
                ? project.expectedCompletion
                : project.completionDate}
            </div>
          </div>
        </div>
      </div>

      {/* معلومات النشر للمشاريع المكتملة */}
      {type === "completed" && project.publication && (
        <div className="mt-3 flex items-center relative z-10">
          <ArticleIcon
            fontSize="small"
            className="ml-1 text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors duration-300"
          />
          <span className="text-[var(--text-dark)]  text-sm group-hover:text-[var(--primary-color)] transition-colors duration-300">
            <strong>النشر:</strong> {project.publication}
          </span>
          <MarkProject projectId={project.Id} />
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* قسم المشاريع */}
      <SectionCard
        title="المشاريع المشرف عليها"
        icon={<GroupsIcon sx={{ color: "var(--primary-color)" }} />}
      >
        {/* شريط التنقل الرئيسي */}
        <div className="flex border-b border-[var(--border-color)] mb-6">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${activeTab === tab.id
                  ? "border-b-2 text-[var(--primary-color)]"
                  : "text-[var(--text-color-secondary)] hover:text-[var(--primary-color)] hover:border-b-2 hover:border-[var(--primary-color)]"
                  }`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  borderColor:
                    activeTab === tab.id
                      ? "var(--primary-color)"
                      : "transparent",
                }}
              >
                <IconComponent className="ml-2" />
                {tab.label}
                <span
                  className={`text-xs px-2 py-1 rounded-full mr-2 transition-colors duration-200 ${activeTab === tab.id
                    ? "bg-[var(--primary-color)] text-white"
                    : "bg-[var(--card-bg)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white"
                    }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* شريط التحكم في طريقة العرض */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)]">
          <div className="text-sm text-[var(--text-color-secondary)]">
            {activeTab === "active"
              ? `عرض ${stats.active} مشروع نشط`
              : `عرض ${stats.completed} مشروع مكتمل`}
          </div>

          {/* View Mode Controls */}
          <div className="flex gap-1 bg-[var(--card-bg)]  p-1 rounded-lg border border-[var(--border-color)]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all duration-200 ${viewMode === "grid"
                ? "bg-[var(--card-bg)] text-white shadow-md"
                : "text-[var(--text-color-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--primary-color)]"
                }`}
              style={{
                transition: "var(--btn-transition)",
              }}
            >
              <ViewModuleIcon fontSize="small" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all duration-200 ${viewMode === "list"
                ? "bg-[var(--card-bg)] text-white shadow-md"
                : "text-[var(--text-color-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--primary-color)]"
                }`}
              style={{
                transition: "var(--btn-transition)",
              }}
            >
              <ViewListIcon fontSize="small" />
            </button>
          </div>
        </div>

        {/* محتوى المشاريع */}
        <div className="min-h-[300px]">
          {activeTab === "active" && (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "space-y-4"
              }
            >
              {supervisedProjects.map((project, index) => (
                <ProjectCard key={index} project={project} type="active" />
              ))}
              {supervisedProjects.length === 0 && (
                <div className="text-center py-12 col-span-2 text-[var(--text-color-secondary)]">
                  <PlayArrowIcon className="text-gray-400 text-4xl mb-2" />
                  <p>لا توجد مشاريع نشطة حالياً</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "completed" && (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "space-y-4"
              }
            >
              {completedProjects.map((project, index) => (
                <ProjectCard key={index} project={project} type="completed" />
              ))}
              {completedProjects.length === 0 && (
                <div className="text-center py-12 col-span-2 text-[var(--text-color-secondary)]">
                  <CheckCircleIcon className="text-gray-400 text-4xl mb-2" />
                  <p>لا توجد مشاريع مكتملة</p>
                </div>
              )}
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
};

export default SupervisedProjectsSection;
