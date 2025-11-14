import React from "react";
import SectionCard from "../../shared/SectionCard";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";

const StatisticsSection = ({
  supervisedProjects = [],
  completedProjects = [],
}) => {
  // حساب الإحصائيات من البيانات الممررة
  const stats = {
    active: supervisedProjects.length,
    completed: completedProjects.length,
    total: supervisedProjects.length + completedProjects.length,
    students: [
      ...new Set([
        ...supervisedProjects.flatMap((p) => p.students || []),
        ...completedProjects.flatMap((p) => p.students || []),
      ]),
    ].length,
    completionRate:
      supervisedProjects.length + completedProjects.length > 0
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
              (acc, project) => acc + (project.students?.length || 0),
              0
            ) /
              (supervisedProjects.length + completedProjects.length)) *
              10
          ) / 10
        : 0,
  };

  // Card configurations with CSS variables
  const cardConfigs = {
    active: {
      bg: "var(--status-pending-bg)",
      border: "var(--status-pending-border)",
      icon: (
        <PlayArrowIcon
          className="mr-2"
          style={{ color: "var(--status-pending-text)" }}
        />
      ),
      valueColor: "var(--status-pending-text)",
    },
    completed: {
      bg: "var(--status-accepted-bg)",
      border: "var(--status-accepted-border)",
      icon: (
        <CheckCircleIcon
          className="mr-2"
          style={{ color: "var(--status-accepted-text)" }}
        />
      ),
      valueColor: "var(--status-accepted-text)",
    },
    total: {
      bg: "var(--bg-light)",
      border: "var(--border-color)",
      icon: (
        <GroupsIcon
          className="mr-2"
          style={{ color: "var(--primary-color)" }}
        />
      ),
      valueColor: "var(--primary-color)",
    },
    students: {
      bg: "var(--card-bg)",
      border: "var(--border-color)",
      icon: (
        <SchoolIcon className="mr-2" style={{ color: "var(--text-color)" }} />
      ),
      valueColor: "var(--text-color)",
    },
    completionRate: {
      bg: "var(--status-accepted-bg)",
      border: "var(--status-accepted-border)",
      icon: (
        <TrendingUpIcon
          className="mr-2"
          style={{ color: "var(--status-accepted-text)" }}
        />
      ),
      valueColor: "var(--status-accepted-text)",
    },
    avgStudents: {
      bg: "var(--status-pending-bg)",
      border: "var(--status-pending-border)",
      icon: (
        <EmojiEventsIcon
          className="mr-2"
          style={{ color: "var(--status-pending-text)" }}
        />
      ),
      valueColor: "var(--status-pending-text)",
    },
  };

  return (
    <SectionCard
      title="إحصائيات المشاريع"
      icon={<BarChartIcon sx={{ color: "var(--primary-color)" }} />}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* البطاقة 1: المشاريع النشطة */}
        <div
          className="p-4 rounded-xl text-center transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: cardConfigs.active.bg,
            border: `1px solid ${cardConfigs.active.border}`,
          }}
        >
          <div className="flex justify-center items-center mb-2">
            {cardConfigs.active.icon}
            <div
              className="text-2xl font-bold"
              style={{ color: cardConfigs.active.valueColor }}
            >
              {stats.active}
            </div>
          </div>
          <div className="text-sm text-[var(--text-color-secondary)]">نشطة</div>
        </div>

        {/* البطاقة 2: المشاريع المكتملة */}
        <div
          className="p-4 rounded-xl text-center transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: cardConfigs.completed.bg,
            border: `1px solid ${cardConfigs.completed.border}`,
          }}
        >
          <div className="flex justify-center items-center mb-2">
            {cardConfigs.completed.icon}
            <div
              className="text-2xl font-bold"
              style={{ color: cardConfigs.completed.valueColor }}
            >
              {stats.completed}
            </div>
          </div>
          <div className="text-sm text-[var(--text-color-secondary)]">
            مكتملة
          </div>
        </div>

        {/* البطاقة 3: إجمالي المشاريع */}
        <div
          className="p-4 rounded-xl text-center transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: cardConfigs.total.bg,
            border: `1px solid ${cardConfigs.total.border}`,
          }}
        >
          <div className="flex justify-center items-center mb-2">
            {cardConfigs.total.icon}
            <div
              className="text-2xl font-bold"
              style={{ color: cardConfigs.total.valueColor }}
            >
              {stats.total}
            </div>
          </div>
          <div className="text-sm text-[var(--text-color-secondary)]">
            إجمالي
          </div>
        </div>

        {/* البطاقة 4: عدد الطلاب */}
        <div
          className="p-4 rounded-xl text-center transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: cardConfigs.students.bg,
            border: `1px solid ${cardConfigs.students.border}`,
          }}
        >
          <div className="flex justify-center items-center mb-2">
            {cardConfigs.students.icon}
            <div
              className="text-2xl font-bold"
              style={{ color: cardConfigs.students.valueColor }}
            >
              {stats.students}
            </div>
          </div>
          <div className="text-sm text-[var(--text-color-secondary)]">طالب</div>
        </div>

        {/* البطاقة 5: نسبة الإنجاز */}
        <div
          className="p-4 rounded-xl text-center transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: cardConfigs.completionRate.bg,
            border: `1px solid ${cardConfigs.completionRate.border}`,
          }}
        >
          <div className="flex justify-center items-center mb-2">
            {cardConfigs.completionRate.icon}
            <div
              className="text-2xl font-bold"
              style={{ color: cardConfigs.completionRate.valueColor }}
            >
              {stats.completionRate}%
            </div>
          </div>
          <div className="text-sm text-[var(--text-color-secondary)]">
            نسبة الإنجاز
          </div>
        </div>

        {/* البطاقة 6: متوسط الطلاب */}
        <div
          className="p-4 rounded-xl text-center transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: cardConfigs.avgStudents.bg,
            border: `1px solid ${cardConfigs.avgStudents.border}`,
          }}
        >
          <div className="flex justify-center items-center mb-2">
            {cardConfigs.avgStudents.icon}
            <div
              className="text-2xl font-bold"
              style={{ color: cardConfigs.avgStudents.valueColor }}
            >
              {stats.avgStudentsPerProject}
            </div>
          </div>
          <div className="text-sm text-[var(--text-color-secondary)]">
            متوسط طلاب/مشروع
          </div>
        </div>
      </div>

      {/* مخطط التوزيع */}
      <div
        className="mt-6 p-4 rounded-xl transition-all duration-300"
        style={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--border-color)",
        }}
      >
        <h6 className="font-semibold mb-4 text-[var(--text-color)] flex items-center">
          <BarChartIcon fontSize="small" className="ml-2" />
          توزيع المشاريع
        </h6>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--text-color-secondary)] flex items-center">
              <PlayArrowIcon
                fontSize="small"
                className="ml-1"
                style={{ color: "var(--status-pending-text)" }}
              />
              المشاريع النشطة
            </span>
            <div className="flex items-center gap-3">
              <div
                className="w-32 rounded-full h-3"
                style={{ backgroundColor: "var(--bg-light)" }}
              >
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      stats.total > 0 ? (stats.active / stats.total) * 100 : 0
                    }%`,
                    backgroundColor: "var(--status-pending-text)",
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium w-8 text-[var(--text-color)]">
                {stats.active}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--text-color-secondary)] flex items-center">
              <CheckCircleIcon
                fontSize="small"
                className="ml-1"
                style={{ color: "var(--status-accepted-text)" }}
              />
              المشاريع المكتملة
            </span>
            <div className="flex items-center gap-3">
              <div
                className="w-32 rounded-full h-3"
                style={{ backgroundColor: "var(--bg-light)" }}
              >
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      stats.total > 0
                        ? (stats.completed / stats.total) * 100
                        : 0
                    }%`,
                    backgroundColor: "var(--status-accepted-text)",
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium w-8 text-[var(--text-color)]">
                {stats.completed}
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default StatisticsSection;
