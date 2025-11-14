import React, { useState } from "react";
import SectionCard from "../../shared/SectionCard";
import { Person, Group, Check, Close, Schedule } from "@mui/icons-material";

const MyRequestsSection = () => {
  const [activeTab, setActiveTab] = useState("projectRequests");
  const [requests, setRequests] = useState({
    projectRequests: [
      {
        id: 1,
        name: "أحمد محمد",
        description:
          "أرغب في الانضمام إلى مشروعك لأنني مهتم بمجال تطوير الويب ولدي خبرة في React",
        status: "pending",
        date: "2024-01-15",
      },
      {
        id: 2,
        name: "فاطمة عبدالله",
        description:
          "لاحظت مشروعك وأعجبني فكرته، أود المساهمة في تطويره بمهاراتي في التصميم",
        status: "pending",
        date: "2024-01-14",
      },
    ],
    myRequests: [
      {
        id: 1,
        projectName: "نظام إدارة المهام",
        teamLeader: "خالد أحمد",
        status: "accepted",
        date: "2024-01-10",
      },
      {
        id: 2,
        projectName: "تطبيق تعليمي",
        teamLeader: "سارة محمد",
        status: "rejected",
        date: "2024-01-08",
      },
      {
        id: 3,
        projectName: "منصة تجارة إلكترونية",
        teamLeader: "عمر عبدالرحمن",
        status: "pending",
        date: "2024-01-12",
      },
    ],
  });

  // Handle accept request
  const handleAccept = (requestId) => {
    setRequests((prev) => ({
      ...prev,
      projectRequests: prev.projectRequests.map((req) =>
        req.id === requestId ? { ...req, status: "accepted" } : req
      ),
    }));
  };

  // Handle reject request
  const handleReject = (requestId) => {
    setRequests((prev) => ({
      ...prev,
      projectRequests: prev.projectRequests.map((req) =>
        req.id === requestId ? { ...req, status: "rejected" } : req
      ),
    }));
  };

  // Get status badge using CSS variables
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "var(--status-pending-bg)",
        text: "var(--status-pending-text)",
        border: "var(--status-pending-border)",
        icon: <Schedule className="ml-1" />,
        label: "قيد الانتظار",
      },
      accepted: {
        bg: "var(--status-accepted-bg)",
        text: "var(--status-accepted-text)",
        border: "var(--status-accepted-border)",
        icon: <Check className="ml-1" />,
        label: "مقبول",
      },
      rejected: {
        bg: "var(--status-rejected-bg)",
        text: "var(--status-rejected-text)",
        border: "var(--status-rejected-border)",
        icon: <Close className="ml-1" />,
        label: "مرفوض",
      },
    };

    const config = statusConfig[status];
    return (
      <span
        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
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

  return (
    <SectionCard title="طلباتي" icon={<Group />}>
      {/* Tabs Navigation */}
      <div className="flex border-b border-[var(--border-color)] mb-6">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${
            activeTab === "projectRequests"
              ? "border-b-2 text-[var(--primary-color)]"
              : "text-[var(--text-color-secondary)] hover:text-[var(--primary-color)] hover:border-b-2 hover:border-[var(--primary-color)]"
          }`}
          onClick={() => setActiveTab("projectRequests")}
          style={{
            borderColor:
              activeTab === "projectRequests"
                ? "var(--primary-color)"
                : "transparent",
          }}
        >
          <Person className="ml-2" />
          طلبات لمشاريعي
          <span
            className="text-xs px-2 py-1 rounded-full mr-2"
            style={{
              backgroundColor: "var(--bg-light)",
              color: "var(--text-color)",
            }}
          >
            {requests.projectRequests.length}
          </span>
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${
            activeTab === "myRequests"
              ? "border-b-2 text-[var(--primary-color)]"
              : "text-[var(--text-color-secondary)] hover:text-[var(--primary-color)] hover:border-b-2 hover:border-[var(--primary-color)]"
          }`}
          onClick={() => setActiveTab("myRequests")}
          style={{
            borderColor:
              activeTab === "myRequests"
                ? "var(--primary-color)"
                : "transparent",
          }}
        >
          <Group className="ml-2" />
          طلباتي
          <span
            className="text-xs px-2 py-1 rounded-full mr-2"
            style={{
              backgroundColor: "var(--bg-light)",
              color: "var(--text-color)",
            }}
          >
            {requests.myRequests.length}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === "projectRequests" ? (
          /* Project Requests Tab */
          <div className="space-y-4">
            {requests.projectRequests.length === 0 ? (
              <div className="text-center py-10 text-[var(--text-color-secondary)]">
                <Person className="text-4xl mb-6 mx-auto text-[var(--text-color-secondary)] opacity-50" />
                <p>لا توجد طلبات لمشاريعك بعد</p>
              </div>
            ) : (
              requests.projectRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-4 hover:border-[var(--primary-color)] hover:shadow-lg transition-all duration-200 mt-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-[var(--text-color)]">
                      {request.name}
                    </h4>
                    <span className="text-sm text-[var(--text-color-secondary)]">
                      {request.date}
                    </span>
                  </div>

                  <p className="text-[var(--text-color-secondary)] mb-4 text-right leading-relaxed">
                    {request.description}
                  </p>

                  {request.status === "pending" ? (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center cursor-pointer"
                        style={{
                          backgroundColor: "var(--btn-danger-bg)",
                          color: "var(--btn-danger-text)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor =
                            "var(--btn-danger-hover)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor =
                            "var(--btn-danger-bg)";
                        }}
                      >
                        <Close className="ml-1" />
                        رفض
                      </button>
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center cursor-pointer"
                        style={{
                          backgroundColor: "var(--btn-success-bg)",
                          color: "var(--btn-success-text)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor =
                            "var(--btn-success-hover)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor =
                            "var(--btn-success-bg)";
                        }}
                      >
                        <Check className="ml-1" />
                        قبول
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      {getStatusBadge(request.status)}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          /* My Requests Tab */
          <div className="space-y-4">
            {requests.myRequests.length === 0 ? (
              <div className="text-center py-10 text-[var(--text-color-secondary)]">
                <Group className="text-4xl mb-6 mx-auto text-[var(--text-color-secondary)] opacity-50" />
                <p>لا توجد طلبات مرفوعة من طرفك</p>
              </div>
            ) : (
              requests.myRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-4 hover:border-[var(--primary-color)] hover:shadow-lg transition-all duration-200 mt-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg text-[var(--text-color)]">
                      {request.projectName}
                    </h4>
                    {getStatusBadge(request.status)}
                  </div>

                  <div className="flex justify-between items-center text-sm text-[var(--text-color-secondary)]">
                    <span>قائد الفريق: {request.teamLeader}</span>
                    <span>{request.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default MyRequestsSection;
