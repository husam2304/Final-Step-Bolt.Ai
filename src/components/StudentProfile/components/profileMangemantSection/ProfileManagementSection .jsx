import React from "react";
import SectionCard from "../../shared/SectionCard";
import { Settings } from "@mui/icons-material";
import DeleteAccountButton from "../UI-Buttons/DeleteAccountButton";
import EditProfileButton from "../UI-Buttons/EditProfileButtom";
const ProfileManagementSection = ({ onEditProfile, onDeleteAccount }) => {
  return (
    <SectionCard title="إدارة الملف الشخصي" icon={<Settings />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <EditProfileButton onOpenModal={onEditProfile} />
        <DeleteAccountButton onOpenModal={onDeleteAccount} />
      </div>
    </SectionCard>
  );
};

export default ProfileManagementSection;
