import React, { useState } from "react";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import AvailabilityStatus from "./components/AvailabilityStatus/AvailabilityStatus";
import SupervisedProjectsSection from "./components/SupervisedProjectsSection/SupervisedProjectsSection";
import StatisticsSection from "./components/StatisticsSection/StatisticsSection";
import MyRequestsSection from "./components/MyRequestsSection/MyRequestsSection";
import ProfileManagementSection from "./components/profileMangemantSection/ProfileManagementSection ";
import EditProfileModal from "./components/Models/EditProfileModal";
import ReasonModal from "../../components/Models/ReasonModel";
import AverageRatingSection from "./../Evaluation/AverageRatingSection";
const DoctorProfile = ({ profileData }) => {
  const [currentProfileData, setCurrentProfileData] = useState(profileData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Check if any modal is open
  const isAnyModalOpen = isEditModalOpen || isDeleteModalOpen;

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleProfileUpdate = (updatedData) => {
    setCurrentProfileData(updatedData);
    console.log("Doctor profile updated:", updatedData);
    setIsEditModalOpen(false);
  };

  const handleDeleteAccount = (reason) => {
    console.log("Doctor account deletion confirmed with reason:", reason);
    // Add your actual delete account logic here
    setIsDeleteModalOpen(false);
  };

  const {
    name,
    id,
    gender,
    phone,
    email,
    bio,
    academicRank,
    department,
    specialization,
    officeLocation,
    officeHours,
    rating,
    links,
    currentStatus,
    supervisedProjects,
    completedProjects,
  } = currentProfileData;

  // استخراج الروابط الفردية من مصفوفة links
  const scholarUrl = links?.find(
    (link) => link.label === "Google Scholar"
  )?.url;
  const researchGateUrl = links?.find(
    (link) => link.label === "ResearchGate"
  )?.url;
  const linkedinUrl = links?.find((link) => link.label === "LinkedIn")?.url;
  const universityUrl = links?.find(
    (link) => link.label === "الصفحة الجامعية"
  )?.url;

  return (
    <div
      className="min-h-screen p-4 md:p-8 relative"
      style={{ backgroundColor: "var(--bg-light)" }}
    >
      {/* Main Profile Content - Dimmed when ANY modal is open */}
      <div
        className={`${isAnyModalOpen ? "opacity-30 pointer-events-none" : ""
          } transition-opacity duration-300`}
      >
        {/* Grid System رئيسي */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* العمود الأول: المعلومات الشخصية والأكاديمية */}
          <div className="space-y-6">
            <ProfileHeader
              name={name}
              id={id}
              gender={gender}
              phone={phone}
              email={email}
              bio={bio}
              academicRank={academicRank}
              department={department}
              specialization={specialization}
              officeLocation={officeLocation}
              officeHours={officeHours}
              rating={rating}
              scholarUrl={scholarUrl}
              researchGateUrl={researchGateUrl}
              linkedinUrl={linkedinUrl}
              universityUrl={universityUrl}
              role="doctor"
            />
            <br />
            <AvailabilityStatus currentStatus={currentStatus} />
            <StatisticsSection
              supervisedProjects={supervisedProjects}
              completedProjects={completedProjects}
            />
          </div>

          {/* العمود الثاني: المشاريع والمهارات */}

          <div className="space-y-6">
            <ProfileManagementSection
              onEditProfile={handleOpenEditModal}
              onDeleteAccount={handleOpenDeleteModal}
              profileData={currentProfileData}
              onProfileUpdate={handleProfileUpdate}
              role="doctor"
            />

            <AverageRatingSection />

            <SupervisedProjectsSection
              supervisedProjects={supervisedProjects}
              completedProjects={completedProjects}
            />

            <MyRequestsSection />

            {/* تمرير دوال فتح النماذج لـ ProfileManagementSection */}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        profileData={currentProfileData}
        onSave={handleProfileUpdate}
        role="doctor"
      />

      {/* Delete Account Modal (ReasonModal) */}
      <ReasonModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
        type="DeleteAccount"
        title="حذف الحساب نهائياً"
        message="⚠️ هذا الإجراء لا يمكن التراجع عنه! سيتم حذف جميع بياناتك ومعلوماتك بشكل نهائي. يرجى كتابة السبب أدناه للتأكيد."
      />
    </div>
  );
};

export default DoctorProfile;
