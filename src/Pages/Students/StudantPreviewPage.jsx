import { mockProfileData } from "../../utils/mockData";
import StudantPreviewProfile from "../../components/StudentProfile/StudantPreviewProfile";

const StudantPreviewPage = () => {
  return (
    <>
      {" "}
      <StudantPreviewProfile profileDate={mockProfileData} />{" "}
    </>
  );
};

export default StudantPreviewPage;
