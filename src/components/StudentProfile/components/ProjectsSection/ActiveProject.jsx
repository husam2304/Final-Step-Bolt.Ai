import React from "react";

const ActiveProject = ({ activeProject }) => {
  return (
    <div
      className="p-4 rounded-lg border border-primary-light"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--card-bg)",
      }}
    >
      <h4
        className="text-lg font-bold mb-1"
        style={{ color: "var(--primary-color)" }}
      >
        {activeProject.title}{" "}
        <span className="text-xs font-normal bg-green-100 text-green-700 px-2 py-0.5 rounded-full mr-2">
          نشط
        </span>
      </h4>
      <p className="text-sm text-gray-600 mb-2">{activeProject.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 mt-3">
        <span>أعضاء الفريق: {activeProject.teamSize}</span>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          عرض المشروع
        </button>
      </div>
    </div>
  );
};

export default ActiveProject;
