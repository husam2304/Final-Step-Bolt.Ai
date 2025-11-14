import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ProjectService, StudentService } from "../../services";
import SearchIcon from '@mui/icons-material/Search';
// services/StudentService.js


function InviteStudent({ handleClose, ProjectId }) {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  // ✅ جلب الطلاب من API
  const { isPending, mutateAsync: searchStudent } = useMutation({
    mutationFn: () => StudentService.GetAll(search),
    onSuccess: (data) => setStudents(data),
    onError: () => setStudents([])
  });

  const InviteStudent = useMutation({
    mutationFn: (studentId) => ProjectService.InviteStudent(ProjectId, [studentId]),
    onSuccess: () => {
      toast.success("تم إرسال الدعوة بنجاح ✅");
    },
    onError: () => toast.error("حدث خطأ أثناء إرسال الدعوة ❌"),
  });

  const handleInvite = async (studentId) => {
    await InviteStudent.mutateAsync(studentId);
  };
  const handleSearch = async () => {
    if (search == "") {
      toast.info("اكتب الرقم الجامعي للبحث ")
      return;
    }
    await searchStudent();
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--primary-color--overlay)] z-50">
      <div className="bg-[var(--bg-color)] flex flex-col justify-between rounded-2xl shadow-xl w-full max-w-lg p-6 h-[80vh]">
        {/* العنوان */}
        <h2 className="text-center text-xl font-bold text-[var(--primary-color)] mb-6">
          دعوة صديق
        </h2>

        {/* حقل البحث */}
        <div className="relative  w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="ابحث عن صديقك واطلب منه الانضمام إلى فريقك..."
            onChange={(e) => setSearch(e.target.value)}

            className="w-full px-4 py-2 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
          <button
            type="button"
            onClick={async () => await handleSearch()}
            className="absolute inset-y-0 left-0 flex items-center justify-center  px-2 text-(var(--text-color)) bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] rounded-l-full"
          >
            <SearchIcon />
          </button>
        </div>

        {/* قائمة الطلاب */}
        <div className="flex-1 items-center content-center center text-center">
          {isPending ? (
            <p className="text-center text-[var(--text-color)]">جاري تحميل الطلاب...</p>
          ) : students.length === 0 ? (
            <p className="text-center text-[var(--text-color)">لا يوجد طلاب مطابقين للبحث</p>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {students.map((student) => (
                <div
                  key={student.studentId}
                  className="flex my-4 items-center justify-between border rounded-xl p-4 shadow-sm"
                >
                  <div>
                    <p className=" text-sm">
                      <span className="text-[var(--text-dark)] font-bold">الاسم:</span> {student.fullName}
                    </p>
                    <p className="text-sm ">
                      <span className=" text-[var(--text-dark)]  font-bold">التخصص الجامعي :</span>{" "}
                      {student.selectMajor}
                    </p>
                  </div>
                  <button
                    onClick={() => handleInvite(student.id)}
                    className="px-4 py-2 bg-[var(--primary-color)] text-{var(--text-color)} rounded-full hover:bg-[var(--primary-color-hover)] transition"
                  >
                    دعوة صديق
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* أزرار التحكم */}
        <div className="flex  justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100  transition"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteStudent;
