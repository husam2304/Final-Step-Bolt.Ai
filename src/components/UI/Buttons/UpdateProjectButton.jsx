import React, { useState } from "react";
// import { useSelector } from "react-redux";
import UpdateProject from "./../../Models/UpadeProject";

import Button from "@mui/material/Button";

function UpdateProjectButton({ projectId }) {
  //   const token = useSelector((state) => state?.auth?.token);
  const [showProject, setShowProject] = useState(false);

  const handledModel = () => {
    setShowProject(!showProject);
  };
  return (
    <>
      <button
        onClick={handledModel}
        className="bg-[var(--primary-color)] text-white px-4 py-2  hover:bg-[var(--btn-primary-hover)]   rounded-[var(--btn-border-radius)] transition-var(--btn-transition) font-[var(--btn-font-family)] transition-[var(--btn-font-size)]  shadow-[var(--btn-shadow)] hover:shadow-[var(--btn-hover-shadow)] cursor-pointer"
      >
        تعديل المشروع
      </button>
      {showProject && (
        <UpdateProject projectId={projectId} handleClose={handledModel} />
      )}
    </>
  );
}

export default UpdateProjectButton;
