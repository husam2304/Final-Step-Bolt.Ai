import React, { useState } from "react";
import SectionCard from "../../shared/SectionCard";
import {
  CloudUpload,
  Download,
  Folder,
  InsertDriveFile,
} from "@mui/icons-material";

const PastProjects = ({ pastProjects = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});

  // Handle file upload
  const handleFileUpload = (projectId, event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/zip") {
      setUploadedFiles((prev) => ({
        ...prev,
        [projectId]: {
          file,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
          uploadDate: new Date().toLocaleDateString("ar-EG"),
        },
      }));
    } else {
      alert("يرجى اختيار ملف ZIP فقط");
    }
  };

  // Handle download click
  const handleDownloadClick = (project) => {
    setSelectedProject(project);
    setShowDownloadModal(true);
  };

  // Handle actual download
  const handleDownload = () => {
    if (selectedProject && uploadedFiles[selectedProject.id]) {
      const file = uploadedFiles[selectedProject.id].file;
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    setShowDownloadModal(false);
  };

  return (
    <>
      <SectionCard title="المشاريع السابقة" icon={<Folder />}>
        {/* Upload Section */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:border-[var(--primary-color)] transition-all duration-200">
          <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
            <CloudUpload className="ml-2" />
            رفع مشروع جديد
          </h4>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <input
              type="file"
              accept=".zip"
              onChange={(e) => handleFileUpload("new", e)}
              className="hidden"
              id="project-upload"
            />
            <label
              htmlFor="project-upload"
              className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[var(--primary-color-hover)] transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
            >
              <CloudUpload className="ml-2" />
              اختر ملف ZIP
            </label>
            <span className="text-sm text-[var(--text-color-secondary)]">
              يمكنك رفع ملف ZIP يحتوي على مشروعك السابق
            </span>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-[var(--text-color)] mb-3">
            المشاريع المرفوعة
          </h4>

          {Object.keys(uploadedFiles).length === 0 &&
          pastProjects.length === 0 ? (
            <div className="text-center py-8 text-[var(--text-color-secondary)]">
              <InsertDriveFile className="text-4xl mb-2 mx-auto text-[var(--text-color-secondary)] opacity-50" />
              <p>لا توجد مشاريع مرفوعة بعد</p>
            </div>
          ) : (
            <>
              {/* Display uploaded files */}
              {Object.entries(uploadedFiles).map(([projectId, fileInfo]) => (
                <div
                  key={projectId}
                  className="flex justify-between items-center p-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg hover:border-[var(--primary-color)] hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  onClick={() =>
                    handleDownloadClick({ id: projectId, title: fileInfo.name })
                  }
                >
                  <div className="flex items-center">
                    <InsertDriveFile className="text-blue-500 dark:text-blue-400 ml-3 group-hover:text-[var(--primary-color)] transition-colors duration-200" />
                    <div>
                      <p className="font-medium text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors duration-200">
                        {fileInfo.name}
                      </p>
                      <p className="text-sm text-[var(--text-color-secondary)]">
                        {fileInfo.size} • تم الرفع في {fileInfo.uploadDate}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadClick({
                        id: projectId,
                        title: fileInfo.name,
                      });
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-[var(--primary-color)] transition-all duration-200 flex items-center shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <Download className="ml-1" />
                    تحميل
                  </button>
                </div>
              ))}

              {/* Display past projects (if any) */}
              {pastProjects.map((project, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg hover:border-[var(--primary-color)] hover:shadow-lg transition-all duration-200 cursor-pointer group mt-4"
                >
                  <div className="flex items-center">
                    <Folder className="text-orange-500 dark:text-orange-400 ml-3 group-hover:text-[var(--primary-color)] transition-colors duration-200" />
                    <div>
                      <p className="font-medium text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors duration-200">
                        {project.title}
                      </p>
                      <p className="text-sm text-[var(--text-color-secondary)]">
                        الحالة:{" "}
                        <span
                          className={`font-semibold ${
                            project.status === "مكتمل"
                              ? "text-green-600 dark:text-green-400"
                              : "text-[var(--text-color-secondary)]"
                          }`}
                        >
                          {project.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  {uploadedFiles[project.id] ? (
                    <button
                      onClick={() => handleDownloadClick(project)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-[var(--primary-color)] transition-all duration-200 flex items-center shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <Download className="ml-1" />
                      تحميل
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept=".zip"
                        onChange={(e) => handleFileUpload(project.id, e)}
                        className="hidden"
                        id={`upload-${project.id}`}
                      />
                      <label
                        htmlFor={`upload-${project.id}`}
                        className="bg-[var(--primary-color)] text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-[var(--primary-color-hover)] transition-all duration-200 flex items-center text-sm shadow-md hover:shadow-lg"
                      >
                        <Download className="ml-1" />
                        تحميل
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </SectionCard>

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
                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-color-hover)] transition-all duration-200 flex items-center shadow-md hover:shadow-lg cursor-pointer"
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

export default PastProjects;
