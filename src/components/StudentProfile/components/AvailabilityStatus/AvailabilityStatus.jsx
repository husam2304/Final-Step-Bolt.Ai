import React from "react";
import SectionCard from "../../shared/SectionCard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
const AvailabilityStatus = ({ currentStatus }) => {
  return (
    <SectionCard
      title="حالة التوفر"
      icon={<AccessTimeIcon sx={{ color: "var(--primary-color)" }} />}
    >
      <p
        className="font-semibold text-lg mb-2"
        style={{ color: "var(--text-dark)" }}
      >
        الحالة الحالية:{" "}
        <span className="text-green-600 mr-2">
          {currentStatus.isAvailable ? "متاح للبحث عن فريق" : "غير متاح"}
        </span>
      </p>
      <p className="text-gray-600">
        <strong>الفصل الدراسي:</strong> {currentStatus.semester}
      </p>
      <p className="text-gray-600">
        <strong>السنة الدراسية:</strong> {currentStatus.year}
      </p>
      {!currentStatus.isAvailable && (
        <p
          className="text-sm text-red-500 mt-2 p-2 rounded-lg"
          style={{
            backgroundColor: "var(--danger-color-overlay)",
            color: "var(--danger-color)",
          }}
        >
          ⚠️ لا يمكن تفعيل البحث عن فريق في حال وجود مشروع فعال
        </p>
      )}
    </SectionCard>
  );
};

export default AvailabilityStatus;
