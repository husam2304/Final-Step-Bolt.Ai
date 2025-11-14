import React from "react";
import SectionCard from "../../shared/SectionCard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const AvailabilityStatus = ({ currentStatus }) => {
  const {
    isAvailable,

    officeHours,
  } = currentStatus;

  // حساب السعة المتبقية

  return (
    <SectionCard
      title="حالة التوفر والإشراف"
      icon={<AccessTimeIcon sx={{ color: "var(--primary-color)" }} />}
    >
      {/* حالة التوفر */}
      <div className="mb-4 p-3 rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
        <p className="font-semibold text-lg mb-2 flex items-center">
          <EventAvailableIcon
            className="ml-2"
            sx={{ color: "var(--success-color)" }}
          />
          الحالة الحالية:{" "}
          <span
            className={`mr-2 ${
              isAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {isAvailable ? "متاح للإشراف" : "غير متاح للإشراف"}
          </span>
        </p>
      </div>

      {/* أوقات الدوام */}
      {officeHours && (
        <div className="p-3 rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20">
          <p className="font-semibold text-lg mb-2 flex items-center">
            <SchoolIcon
              className="ml-2"
              sx={{ color: "var(--primary-color)" }}
            />
            أوقات الدوام
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {officeHours}
          </p>
        </div>
      )}

      {/* تحذيرات */}
      {!isAvailable && (
        <div className="mt-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            ⚠️ غير متاح حاليًا لاستقبال طلبات إشراف جديدة
          </p>
        </div>
      )}
    </SectionCard>
  );
};

export default AvailabilityStatus;
