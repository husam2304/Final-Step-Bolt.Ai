import { Delete } from "@mui/icons-material";

const DeleteAccountButton = ({ onOpenModal }) => {
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 cursor-pointer flex items-center justify-center font-medium shadow-md hover:shadow-lg"
      onClick={onOpenModal}
    >
      <Delete className="ml-2" />
      حذف الحساب
    </button>
  );
};

export default DeleteAccountButton;
