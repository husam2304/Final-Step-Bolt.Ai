import React from "react";

const SkillTag = ({ text }) => (
  <span
    className="text-sm font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 m-1"
    style={{
      backgroundColor: "var(--primary-color--overlay)",
      color: "var(--primary-color)",
    }}
  >
    {text}
  </span>
);

export default SkillTag;