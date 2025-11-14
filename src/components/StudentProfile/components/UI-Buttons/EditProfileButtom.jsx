import { Edit } from "@mui/icons-material";

const EditProfileButton = ({ onOpenModal }) => {
  return (
    <button
      className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-200 cursor-pointer flex items-center justify-center font-medium shadow-md hover:shadow-lg"
      onClick={onOpenModal}
    >
      <Edit className="ml-2" />
      تحديث الملف الشخصي
    </button>
  );
};

export default EditProfileButton;
