import DoctorPreviewProfile from "../../components/DoctorsProfile/DoctorPreviewProfile";
import { mockDoctorProfileData } from "../../utils/mooksDcotor";

const DoctorPreviewpage = () => {
  return (
    <>
      <DoctorPreviewProfile profileData={mockDoctorProfileData} />
    </>
  );
};

export default DoctorPreviewpage;
