import { mockDoctorProfileData } from "../../utils/mooksDcotor";
import DoctorProfile from "../../components/DoctorsProfile/DoctorProfile";

const DoctorProfilePage = () => {
  return (
    <>
      <DoctorProfile profileData={mockDoctorProfileData} />
    </>
  );
};

export default DoctorProfilePage;
