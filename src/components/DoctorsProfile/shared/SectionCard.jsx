import React from "react";

const SectionCard = ({ title, icon, children }) => (
  <div
    className="bg-[var(--bg-color)] p-6 rounded-xl shadow-lg border border-[var(--border-color)] mb-6 animate-fade-in-up  "
    style={{ animationDelay: "var(--animation-delay-300)" }}
  >
    <h3
      className="text-xl font-bold mb-4 text-gray-800 flex items-center"
      style={{ color: "var(--text-dark)" }}
    >
      <span
        className="ml-2 text-primary"
        style={{ color: "var(--primary-color)" }}
      >
        {icon}
      </span>
      {title}
    </h3>
    <div className="border-t border-[var(--border-color)] pt-4 ">
      {children}
    </div>
  </div>
);

export default SectionCard;
