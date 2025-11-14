import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { StudentService } from "../../../services/Student.service";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

function SearchButton() {
  const token = useSelector((state) => state?.auth?.token);
  const email = useSelector((state) => state?.auth?.user?.email);
  const SeachTeam = useMutation({
    mutationFn: () => StudentService.changeSearchTeam(email?.split("@")[0] || null, true),// hard code to get userId from email cause backend doe not return it // at all there is no need to userId backend should handle it from token
    onSuccess: () => toast.success("تم تفعيل خاصية البحث "),
    onError: (e) => toast.error(e.message || "حدث خطأ ما ")
  })
  const handleSearchTeam = async () => {
    await SeachTeam.mutateAsync()
  };
  return (
    <>
      {token && <Button variant="contained" sx={{ mt: 2, backgroundColor: "var(--primary-color)", color: "var(--text-color)" }} onClick={handleSearchTeam}>
        البحث عن فريق
      </Button>}
    </>
  )
}

export default SearchButton;
