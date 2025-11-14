import React, { useState } from "react";
import SectionCard from "../../shared/SectionCard";
import {
  Person,
  Group,
  Check,
  Close,
  Schedule,
  Email,
  School,
  CalendarToday,
  ThumbUp,
  ThumbDown,
  HowToReg,
  SupervisedUserCircle,
} from "@mui/icons-material";

const MyRequestsSection = () => {
  const [activeTab, setActiveTab] = useState("myRequests");

  // بيانات طلباتي (طلبات الدكتور للانضمام لمشاريع)
  const myRequests = [
    {
      id: 1,
      projectName: "نظام إدارة المشاريع البحثية",
      teamLeader: "د. سعيد محمد",
      submissionDate: "2024-01-15",
      status: "pending",
      description: "طلب انضمام كمساعد باحث في مشروع إدارة المشاريع البحثية",
    },
    {
      id: 2,
      projectName: "منصة التعلم الذكي",
      teamLeader: "د. فاطمة أحمد",
      submissionDate: "2024-01-10",
      status: "accepted",
      role: "باحث رئيسي",
    },
    {
      id: 3,
      projectName: "تحليل البيانات التعليمية",
      teamLeader: "د. خالد عبدالله",
      submissionDate: "2024-01-08",
      status: "rejected",
      reason: "تم اكتمال الفريق البحثي",
    },
  ];

  // بيانات طلبات الطلاب للإشراف
  const [supervisionRequests, setSupervisionRequests] = useState([
    {
      id: 1,
      studentName: "أحمد محمد",
      studentId: "202110001",
      email: "ahmed.mohamed@student.edu",
      projectTitle: "نظام ذكي لإدارة المشاريع الجامعية",
      submissionDate: "2024-01-15",
      expectedDuration: "8 أشهر",
      gpa: 4.5,
      academicYear: "السنة الرابعة",
      department: "هندسة البرمجيات",
      status: "pending",
    },
    {
      id: 2,
      studentName: "فاطمة عبدالله",
      studentId: "202110045",
      email: "fatima.abdullah@student.edu",
      projectTitle: "منصة تعليمية تفاعلية",
      submissionDate: "2024-01-14",
      expectedDuration: "10 أشهر",
      gpa: 4.8,
      academicYear: "السنة الثالثة",
      department: "علوم الحاسب",
      status: "pending",
    },
    {
      id: 3,
      studentName: "خالد سعيد",
      studentId: "202095023",
      email: "khaled.saeed@student.edu",
      projectTitle: "نظام تحليل البيانات الضخمة",
      submissionDate: "2024-01-10",
      expectedDuration: "12 أشهر",
      status: "accepted",
    },
    {
      id: 4,
      studentName: "سارة أحمد",
      studentId: "202110078",
      email: "sara.ahmed@student.edu",
      projectTitle: "تطبيق تعليمي للأطفال",
      submissionDate: "2024-01-08",
      status: "rejected",
      reason: "لا يتناسب مع التخصص البحثي الحالي",
    },
  ]);

  // معالجة قبول طلب إشراف
  const handleAcceptSupervision = (requestId) => {
    setSupervisionRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "accepted" } : req
      )
    );
  };

  // معالجة رفض طلب إشراف
  const handleRejectSupervision = (requestId) => {
    setSupervisionRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status: "rejected", reason: "تم الرفض من قبل المشرف" }
          : req
      )
    );
  };

  // الحصول على شارة الحالة باستخدام CSS Variables
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "var(--status-pending-bg)",
        text: "var(--status-pending-text)",
        border: "var(--status-pending-border)",
        icon: <Schedule className="ml-1" fontSize="small" />,
        // text: "قيد المراجعة",
      },
      accepted: {
        bg: "var(--status-accepted-bg)",
        text: "var(--status-accepted-text)",
        border: "var(--status-accepted-border)",
        icon: <Check className="ml-1" fontSize="small" />,
        // text: "مقبول",
      },
      rejected: {
        bg: "var(--status-rejected-bg)",
        text: "var(--status-rejected-text)",
        border: "var(--status-rejected-border)",
        icon: <Close className="ml-1" fontSize="small" />,
        // text: "مرفوض",
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
        {config.text}
      </span>
    );
  };

  // تصفية الطلبات حسب الحالة
  const filterRequestsByStatus = (requests, status) => {
    return requests.filter((request) => request.status === status);
  };

  // بطاقة طلباتي
  const MyRequestCard = ({ request }) => (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-4 hover:border-[var(--primary-color)] hover:shadow-lg transition-all duration-200 mt-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-lg text-[var(--text-color)]">
          {request.projectName}
        </h4>
        {getStatusBadge(request.status)}
      </div>

      <div className="flex justify-between items-center text-sm text-[var(--text-color-secondary)] mb-3">
        <span>قائد المشروع: {request.teamLeader}</span>
        <span>{request.submissionDate}</span>
      </div>

      {request.description && (
        <p className="text-[var(--text-color-secondary)] mb-3 text-right leading-relaxed">
          {request.description}
        </p>
      )}

      {request.reason && (
        <div
          className="mt-2 p-2 rounded-lg"
          style={{
            backgroundColor: "var(--status-rejected-bg)",
          }}
        >
          <span
            className="text-sm"
            style={{
              color: "var(--status-rejected-text)",
            }}
          >
            <strong>سبب الرفض:</strong> {request.reason}
          </span>
        </div>
      )}
    </div>
  );

  // بطاقة طلبات الإشراف
  const SupervisionRequestCard = ({ request }) => (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-4 hover:border-[var(--primary-color)] hover:shadow-lg transition-all duration-200 mt-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-bold text-lg text-[var(--text-color)] mb-1">
            {request.projectTitle}
          </h4>
          <div className="flex items-center text-sm text-[var(--text-color-secondary)]">
            <Person fontSize="small" className="ml-1" />
            <span>
              {request.studentName} - {request.studentId}
            </span>
          </div>
        </div>
        {getStatusBadge(request.status)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
        <div className="flex items-center">
          <Email
            fontSize="small"
            className="ml-1 text-[var(--text-color-secondary)]"
          />
          <span className="text-[var(--text-color-secondary)]">
            {request.email}
          </span>
        </div>
        <div className="flex items-center">
          <School
            fontSize="small"
            className="ml-1 text-[var(--text-color-secondary)]"
          />
          <span className="text-[var(--text-color-secondary)]">
            {request.department}
          </span>
        </div>
        {request.gpa && (
          <div className="flex items-center">
            <span className="text-[var(--text-color-secondary)]">
              <strong>المعدل:</strong> {request.gpa}/5.0
            </span>
          </div>
        )}
        <div className="flex items-center">
          <CalendarToday
            fontSize="small"
            className="ml-1 text-[var(--text-color-secondary)]"
          />
          <span className="text-[var(--text-color-secondary)]">
            {request.submissionDate}
          </span>
        </div>
      </div>

      {/* إجراءات للطلبات pending */}
      {request.status === "pending" && (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => handleRejectSupervision(request.id)}
            className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center cursor-pointer text-sm"
            style={{
              backgroundColor: "var(--btn-danger-bg)",
              color: "var(--btn-danger-text)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--btn-danger-hover)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--btn-danger-bg)";
            }}
          >
            <ThumbDown className="ml-1" fontSize="small" />
            رفض
          </button>
          <button
            onClick={() => handleAcceptSupervision(request.id)}
            className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center cursor-pointer text-sm"
            style={{
              backgroundColor: "var(--btn-success-bg)",
              color: "var(--btn-success-text)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--btn-success-hover)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--btn-success-bg)";
            }}
          >
            <ThumbUp className="ml-1" fontSize="small" />
            قبول
          </button>
        </div>
      )}

      {request.reason && (
        <div
          className="mt-2 p-2 rounded-lg"
          style={{
            backgroundColor: "var(--status-rejected-bg)",
          }}
        >
          <span
            className="text-sm"
            style={{
              color: "var(--status-rejected-text)",
            }}
          >
            <strong>سبب الرفض:</strong> {request.reason}
          </span>
        </div>
      )}
    </div>
  );

  const tabs = [
    {
      id: "myRequests",
      label: "طلباتي",
      icon: HowToReg,
      count: myRequests.length,
    },
    {
      id: "supervisionRequests",
      label: "طلبات الإشراف",
      icon: SupervisedUserCircle,
      count: supervisionRequests.length,
    },
  ];

  return (
    <SectionCard title="إدارة الطلبات" icon={<Group />}>
      {/* التبويب الرئيسي */}
      <div className="flex border-b border-[var(--border-color)] mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${activeTab === tab.id
                ? "border-b-2 text-[var(--primary-color)]"
                : "text-[var(--text-color-secondary)] hover:text-[var(--primary-color)] hover:border-b-2 hover:border-[var(--primary-color)]"
              }`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              borderColor:
                activeTab === tab.id ? "var(--primary-color)" : "transparent",
            }}
          >
            <tab.icon className="ml-2" />
            {tab.label}
            <span
              className="text-xs px-2 py-1 rounded-full mr-2"
              style={{
                backgroundColor: "var(--bg-light)",
                color: "var(--text-color)",
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* محتوى الطلبات */}
      <div className="space-y-4">
        {activeTab === "myRequests" ? (
          /* طلباتي */
          myRequests.length === 0 ? (
            <div className="text-center py-10 text-[var(--text-color-secondary)]">
              <HowToReg className="text-4xl mb-6 mx-auto opacity-50" />
              <p>لا توجد طلبات مرفوعة من طرفك</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myRequests.map((request) => (
                <MyRequestCard key={request.id} request={request} />
              ))}
            </div>
          )
        ) : /* طلبات الإشراف */
          supervisionRequests.length === 0 ? (
            <div className="text-center py-10 text-[var(--text-color-secondary)]">
              <SupervisedUserCircle className="text-4xl mb-6 mx-auto opacity-50" />
              <p>لا توجد طلبات إشراف</p>
            </div>
          ) : (
            <div className="space-y-4">
              {supervisionRequests.map((request) => (
                <SupervisionRequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
      </div>
    </SectionCard>
  );
};

export default MyRequestsSection;
