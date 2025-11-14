import React, { useState } from "react";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import AvailabilityStatus from "./components/AvailabilityStatus/AvailabilityStatus";
import SkillsSection from "./components/SkillsSection/SkillsSection";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import MyRequestsSection from "./components/MyRequestsSection/MyRequestsSection";
import ProfileManagementSection from "./components/profileMangemantSection/ProfileManagementSection ";
import EditProfileModal from "./components/Models/EditProfileModal";
import ReasonModal from "../Models/ReasonModel"; // Import ReasonModal
import ReceivedMarksSection from "./../Evaluation/ReceivedMarksSection";

const StudentProfile = ({ profileData }) => {
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProfileData, setCurrentProfileData] = useState(profileData);

  // Check if any modal is open
  const isAnyModalOpen = isEditModalOpen || isDeleteModalOpen;

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleProfileUpdate = (updatedData) => {
    setCurrentProfileData(updatedData);
    console.log("Profile updated:", updatedData);
    setIsEditModalOpen(false);
  };

  const handleDeleteAccount = (reason) => {
    console.log("Account deletion confirmed with reason:", reason);
    // Add your actual delete account logic here
    setIsDeleteModalOpen(false);

    // Example: Redirect to login after deletion
    // setTimeout(() => {
    //   window.location.href = '/login';
    // }, 2000);
  };

  const {
    name,
    id,
    gender,
    phone,
    bio,
    currentStatus,
    techSkills,
    activeProject,
    pastProjects,
  } = currentProfileData;

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Personal & Projects */}
          <div className="space-y-6">
            <ProfileHeader
              name={name}
              id={id}
              gender={gender}
              phone={phone}
              bio={bio}
            />
            <br />
            <ProjectsSection
              activeProject={activeProject}
              pastProjects={pastProjects}
            />
            <SkillsSection techSkills={techSkills} />
          </div>

          {/* Column 2: Skills, Status & Management */}
          <div className="space-y-6">
            <ProfileManagementSection
              onEditProfile={handleOpenEditModal}
              onDeleteAccount={handleOpenDeleteModal}
              profileData={currentProfileData}
              onProfileUpdate={handleProfileUpdate}
            />
            <AvailabilityStatus currentStatus={currentStatus} />
            <ReceivedMarksSection />

            <MyRequestsSection />
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        profileData={currentProfileData}
        onSave={handleProfileUpdate}
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

export default StudentProfile;
