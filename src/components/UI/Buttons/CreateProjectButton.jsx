import React, { useState } from "react";
import { useSelector } from "react-redux";
import CreateProject from "./../../Models/CreateProject";

import Button from "@mui/material/Button";

function CreateProjectButton() {
  const token = useSelector((state) => state?.auth?.token);
  const [showProject, setShowProject] = useState(false);

  const handledModel = () => {
    setShowProject(!showProject);
  };
  return (
    <>
      {token && <Button variant="contained" sx={{ mt: 2, backgroundColor: "var(--primary-color)", color: "var(--text-color)" }} onClick={handledModel}>
        إنشاء مشروع
      </Button>}
      {showProject && <CreateProject handleClose={handledModel} />}
    </>
  )
}

export default CreateProjectButton;
