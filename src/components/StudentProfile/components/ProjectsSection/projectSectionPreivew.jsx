import React, { useState } from "react";
import SectionCard from "../../shared/SectionCard";
import {
  Download,
  Folder,
  InsertDriveFile,
  Visibility,
  CalendarToday,
  Person,
  School,
  PlayArrow,
  CheckCircle,
  ArrowBack,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

const StudentProjectsPreview = ({ activeProject, pastProjects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [activeTab, setActiveTab] = useState("active"); // 'active' or 'past'
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2; // Show 3 projects per page in full width

  // Handle download click
  const handleDownloadClick = (project) => {
    setSelectedProject(project);
    setShowDownloadModal(true);
  };

  // Handle actual download
  const handleDownload = () => {
    if (selectedProject?.fileUrl) {
      // Simulate download
      const link = document.createElement("a");
      link.href = selectedProject.fileUrl;
      link.download = selectedProject.title + ".zip";
      link.click();
    }
    setShowDownloadModal(false);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      مكتمل: {
        bg: "var(--status-accepted-bg)",
        text: "var(--status-accepted-text)",
        border: "var(--status-accepted-border)",
        label: "مكتمل",
        icon: <CheckCircle fontSize="small" />,
      },
      قيد_التنفيذ: {
        bg: "var(--status-pending-bg)",
        text: "var(--status-pending-text)",
        border: "var(--status-pending-border)",
        label: "نشط",
        icon: <PlayArrow fontSize="small" />,
      },
    };

    const config = statusConfig[status] || statusConfig.مكتمل;

    return (
      <span
        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border gap-1"
        style={{
          backgroundColor: config.bg,
          color: config.text,
          borderColor: config.border,
        }}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  // Get current projects for pagination
  const getCurrentProjects = () => {
    if (activeTab === "active") {
      return activeProject ? [activeProject] : [];
    } else {
      const startIndex = (currentPage - 1) * projectsPerPage;
      const endIndex = startIndex + projectsPerPage;
      return pastProjects?.slice(startIndex, endIndex) || [];
    }
  };

  // Calculate total pages
  const getTotalPages = () => {
    if (activeTab === "active") {
      return 1;
    } else {
      return Math.ceil((pastProjects?.length || 0) / projectsPerPage);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Reset page when tab changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Full Width Project Card Component
  const FullWidthProjectCard = ({ project, isActive = false }) => (
    <div
      className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 hover:border-[var(--primary-color)] hover:shadow-lg transition-all duration-300 cursor-pointer group mb-4"
      onClick={() => setSelectedProject({ ...project, isActive })}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Left Section - Project Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="flex items-start gap-3">
              <Folder className="text-[var(--primary-color)] text-2xl mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xl text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors duration-300 mb-2">
                  {project.title}
                </h4>
                <p className="text-[var(--text-color-secondary)] leading-relaxed">
                  {project.description ||
                    `مشروع ${project.title} ${
                      isActive ? "قيد التنفيذ حالياً" : "الذي تم إنجازه بنجاح"
                    }`}
                </p>
              </div>
            </div>
            {getStatusBadge(isActive ? "قيد_التنفيذ" : "مكتمل")}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center text-[var(--text-color-secondary)] bg-[var(--bg-light)] rounded-lg p-3">
              <Person
                fontSize="small"
                className="ml-2 text-[var(--primary-color)]"
              />
              <div>
                <div className="text-xs text-[var(--text-color-secondary)]">
                  المشرف
                </div>
                <div className="font-medium text-[var(--text-color)]">
                  د. المشرف
                </div>
              </div>
            </div>
            <div className="flex items-center text-[var(--text-color-secondary)] bg-[var(--bg-light)] rounded-lg p-3">
              <School
                fontSize="small"
                className="ml-2 text-[var(--primary-color)]"
              />
              <div>
                <div className="text-xs text-[var(--text-color-secondary)]">
                  التخصص
                </div>
                <div className="font-medium text-[var(--text-color)]">
                  علوم الحاسب
                </div>
              </div>
            </div>
            <div className="flex items-center text-[var(--text-color-secondary)] bg-[var(--bg-light)] rounded-lg p-3">
              <CalendarToday
                fontSize="small"
                className="ml-2 text-[var(--primary-color)]"
              />
              <div>
                <div className="text-xs text-[var(--text-color-secondary)]">
                  السنة
                </div>
                <div className="font-medium text-[var(--text-color)]">2024</div>
              </div>
            </div>
            <div className="flex items-center text-[var(--text-color-secondary)] bg-[var(--bg-light)] rounded-lg p-3">
              <InsertDriveFile
                fontSize="small"
                className="ml-2 text-[var(--primary-color)]"
              />
              <div>
                <div className="text-xs text-[var(--text-color-secondary)]">
                  الحجم
                </div>
                <div className="font-medium text-[var(--text-color)]">
                  {isActive ? "12.5 MB" : "10.2 MB"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-48 lg:flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject({ ...project, isActive });
            }}
            className="bg-[var(--bg-light)] text-[var(--text-color)] px-4 py-3 rounded-lg hover:bg-[var(--hover-bg)] hover:text-[var(--primary-color)] transition-all duration-200 flex items-center justify-center text-sm font-medium"
          >
            <Visibility fontSize="small" className="ml-2" />
            عرض التفاصيل
          </button>

          {/* Show download button only for completed projects */}
          {!isActive && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadClick(project);
              }}
              className="bg-[var(--btn-success-bg)] text-white px-4 py-3 rounded-lg hover:bg-[var(--btn-success-hover)] transition-all duration-200 flex items-center justify-center text-sm font-medium shadow-md hover:shadow-lg"
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
              <Download fontSize="small" className="ml-2" />
              تحميل المشروع
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Calculate counts for tabs
  const activeCount = activeProject ? 1 : 0;
  const pastCount = pastProjects?.length || 0;
  const currentProjects = getCurrentProjects();
  const totalPages = getTotalPages();

  return (
    <>
      <SectionCard
        title="مشاريعي "
        icon={<Folder sx={{ color: "var(--primary-color)" }} />}
      >
        {/* Navigation Tabs */}
        <div className="flex border-b border-[var(--border-color)] mb-6">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${
              activeTab === "active"
                ? "border-b-2 text-[var(--primary-color)]"
                : "text-[var(--text-color-secondary)] hover:text-[var(--primary-color)] hover:border-b-2 hover:border-[var(--primary-color)]"
            }`}
            onClick={() => setActiveTab("active")}
            style={{
              borderColor:
                activeTab === "active" ? "var(--primary-color)" : "transparent",
            }}
          >
            <PlayArrow className="ml-2" />
            المشاريع النشطة
            <span
              className="text-xs px-2 py-1 rounded-full mr-2"
              style={{
                backgroundColor:
                  activeTab === "active"
                    ? "var(--primary-color)"
                    : "var(--bg-light)",
                color: activeTab === "active" ? "white" : "var(--text-color)",
              }}
            >
              {activeCount}
            </span>
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${
              activeTab === "past"
                ? "border-b-2 text-[var(--primary-color)]"
                : "text-[var(--text-color-secondary)] hover:text-[var(--primary-color)] hover:border-b-2 hover:border-[var(--primary-color)]"
            }`}
            onClick={() => setActiveTab("past")}
            style={{
              borderColor:
                activeTab === "past" ? "var(--primary-color)" : "transparent",
            }}
          >
            <CheckCircle className="ml-2" />
            المشاريع المكتملة
            <span
              className="text-xs px-2 py-1 rounded-full mr-2"
              style={{
                backgroundColor:
                  activeTab === "past"
                    ? "var(--primary-color)"
                    : "var(--bg-light)",
                color: activeTab === "past" ? "white" : "var(--text-color)",
              }}
            >
              {pastCount}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {activeTab === "active" ? (
            /* Active Projects Tab */
            <div>
              {activeProject ? (
                <div className="space-y-4">
                  <FullWidthProjectCard
                    project={activeProject}
                    isActive={true}
                  />
                </div>
              ) : (
                <div className="text-center py-16 text-[var(--text-color-secondary)]">
                  <PlayArrow className="text-6xl mb-6 mx-auto opacity-50" />
                  <p className="text-lg">لا توجد مشاريع نشطة حالياً</p>
                </div>
              )}
            </div>
          ) : (
            /* Past Projects Tab */
            <div>
              {pastProjects && pastProjects.length > 0 ? (
                <div className="space-y-4">
                  {currentProjects.map((project, index) => (
                    <FullWidthProjectCard
                      key={index}
                      project={project}
                      isActive={false}
                    />
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8 pt-6 border-t border-[var(--border-color)]">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-color-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                              currentPage === page
                                ? "bg-[var(--primary-color)] text-white shadow-md"
                                : "text-[var(--text-color-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--primary-color)]"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-color-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 text-[var(--text-color-secondary)]">
                  <CheckCircle className="text-6xl mb-6 mx-auto opacity-50" />
                  <p className="text-lg">لا توجد مشاريع مكتملة</p>
                </div>
              )}
            </div>
          )}
        </div>
      </SectionCard>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--modal-bg)] rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[var(--border-color)]">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-[var(--text-color-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200 p-1"
                >
                  <ArrowBack />
                </button>
                <h3 className="text-2xl font-bold text-[var(--text-color)] flex items-center">
                  <Folder className="ml-3 text-[var(--primary-color)] text-3xl" />
                  {selectedProject.title}
                </h3>
              </div>
              {getStatusBadge(
                selectedProject.isActive ? "قيد_التنفيذ" : "مكتمل"
              )}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center bg-[var(--bg-light)] rounded-xl p-4">
                  <Person className="ml-3 text-[var(--primary-color)] text-2xl" />
                  <div>
                    <div className="text-sm text-[var(--text-color-secondary)]">
                      المشرف
                    </div>
                    <div className="font-semibold text-[var(--text-color)] text-lg">
                      د. المشرف
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-[var(--bg-light)] rounded-xl p-4">
                  <School className="ml-3 text-[var(--primary-color)] text-2xl" />
                  <div>
                    <div className="text-sm text-[var(--text-color-secondary)]">
                      التخصص
                    </div>
                    <div className="font-semibold text-[var(--text-color)] text-lg">
                      علوم الحاسب
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-[var(--bg-light)] rounded-xl p-4">
                  <CalendarToday className="ml-3 text-[var(--primary-color)] text-2xl" />
                  <div>
                    <div className="text-sm text-[var(--text-color-secondary)]">
                      السنة
                    </div>
                    <div className="font-semibold text-[var(--text-color)] text-lg">
                      2024
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-[var(--bg-light)] rounded-xl p-4">
                  <InsertDriveFile className="ml-3 text-[var(--primary-color)] text-2xl" />
                  <div>
                    <div className="text-sm text-[var(--text-color-secondary)]">
                      الحجم
                    </div>
                    <div className="font-semibold text-[var(--text-color)] text-lg">
                      {selectedProject.isActive ? "12.5 MB" : "10.2 MB"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--bg-light)] rounded-xl p-6">
                <h4 className="font-semibold text-lg text-[var(--text-color)] mb-3">
                  الوصف:
                </h4>
                <p className="text-[var(--text-color-secondary)] leading-relaxed text-lg">
                  {selectedProject.description ||
                    `مشروع ${selectedProject.title} ${
                      selectedProject.isActive
                        ? "قيد التنفيذ حالياً"
                        : "الذي تم إنجازه بنجاح"
                    }`}
                </p>
              </div>

              <div className="flex gap-3 justify-end pt-6 border-t border-[var(--border-color)]">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 text-[var(--text-color-secondary)] border border-[var(--border-color)] rounded-xl hover:bg-[var(--hover-bg)] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all duration-200 cursor-pointer font-medium"
                >
                  إغلاق
                </button>

                {/* Show download button only for completed projects */}
                {!selectedProject.isActive && (
                  <button
                    onClick={() => {
                      handleDownloadClick(selectedProject);
                      setSelectedProject(null);
                    }}
                    className="bg-[var(--btn-success-bg)] text-white px-6 py-3 rounded-xl hover:bg-[var(--btn-success-hover)] transition-all duration-200 flex items-center shadow-md hover:shadow-lg cursor-pointer font-medium"
                    style={{
                      backgroundColor: "var(--btn-success-bg)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor =
                        "var(--btn-success-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "var(--btn-success-bg)";
                    }}
                  >
                    <Download className="ml-2" />
                    تحميل المشروع
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Confirmation Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--modal-bg)] rounded-xl p-6 max-w-md w-full border border-[var(--border-color)]">
            <h3 className="text-xl font-bold text-[var(--text-color)] mb-4">
              تأكيد التحميل
            </h3>
            <p className="text-[var(--text-color-secondary)] mb-6">
              هل تريد تحميل مشروع "{selectedProject?.title}"؟
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="px-4 py-2 text-[var(--text-color-secondary)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--hover-bg)] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all duration-200 cursor-pointer"
              >
                إلغاء
              </button>
              <button
                onClick={handleDownload}
                className="bg-[var(--btn-success-bg)] text-white px-4 py-2 rounded-lg hover:bg-[var(--btn-success-hover)] transition-all duration-200 flex items-center shadow-md hover:shadow-lg cursor-pointer"
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
                <Download className="ml-2" />
                نعم، حمل المشروع
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentProjectsPreview;
