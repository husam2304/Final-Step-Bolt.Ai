import DeleteProject from "./../../Models/DeleteProject";
import React, { useState } from "react";
export default function DeleteProjectButton({ projectId }) {
  const [showProject, setShowProject] = useState(false);

  const handledModel = () => {
    setShowProject(!showProject);
  };
  return (
    <>
      <button
        onClick={handledModel}
        className="bg-[var(--btn-secondary-bg)] text-white px-4 py-2  hover:bg-[var(--btn-secondary-hover)]   rounded-[var(--btn-border-radius)] transition-var(--btn-transition) font-[var(--btn-font-family)] transition-[var(--btn-font-size)]  shadow-[var(--btn-shadow)] hover:shadow-[var(--btn-hover-shadow)] cursor-pointer"
      >
        حذف المشروع
      </button>
      {showProject && <DeleteProject projectId={projectId} />}
    </>
  );
}
