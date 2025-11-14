import React from "react";
import StudentProfile from "../../components/StudentProfile/StudentProfile";
import { mockProfileData } from "../../utils/mockData";

const StudentProfilepage = () => {
  return (
    <>
      <StudentProfile profileData={mockProfileData} />
    </>
  );
};

export default StudentProfilepage;
