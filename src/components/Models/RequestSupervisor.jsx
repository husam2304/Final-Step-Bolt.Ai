import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ProjectService, SupervisorService } from "../../services";

function RequestSupervisor({ handleClose, ProjectId }) {
    const { data: supervisors = [], isLoading } = useQuery({
        queryKey: ["supervisors"],
        queryFn: () => SupervisorService.GetAll(),
    });

    const [selectedSupervisor, setSelectedSupervisor] = useState(null);
    const [message, setMessage] = useState("");

    const RequestSupervisor = useMutation({
        mutationFn: (data) =>
            ProjectService.RequestSupervisor(ProjectId, data.supervisorId, data.Message),
        onSuccess: () => {
            toast.success("تم إرسال الطلب بنجاح");
            setSelectedSupervisor(null);
            setMessage("");
        },
        onError: () => toast.error("حدث خطأ أثناء إرسال الطلب"),
    });

    const handleRequest = async (supervisorId) => {
        if (!message.trim()) {
            toast.warn("يرجى كتابة رسالة قبل الإرسال");
            return;
        }
        await RequestSupervisor.mutateAsync({ supervisorId, Message: message });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[var(--primary-color--overlay)] z-50">
            <div className="bg-[var(--bg-color)] flex flex-col justify-between rounded-2xl shadow-xl w-full max-w-lg p-6 h-[80vh]">
                {/* العنوان */}
                <h2 className="text-center text-xl font-bold text-[var(--primary-color)] mb-6">
                    طلب إشراف
                </h2>

                {/* قائمة المشرفين */}
                <div className="flex-1 items-center content-center text-center">
                    {isLoading ? (
                        <p className="text-center text-[var(--text-color)]">
                            جاري تحميل المشرفين...
                        </p>
                    ) : supervisors.length === 0 ? (
                        <p className="text-center text-[var(--text-color)]">
                            لا يوجد مشرفين متاحين
                        </p>
                    ) : (
                        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                            {supervisors.map((supervisor) => (
                                <div
                                    key={supervisor.id}
                                    className="border rounded-xl my-4 p-4 shadow-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm">
                                                <span className="text-[var(--text-dark)] font-bold">
                                                    الاسم:
                                                </span>{" "}
                                                {supervisor.fullName}
                                            </p>
                                            <p className="text-sm">
                                                <span className="text-[var(--text-dark)] font-bold">
                                                    التخصص:
                                                </span>{" "}
                                                {supervisor.selectMajor}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                setSelectedSupervisor(
                                                    selectedSupervisor === supervisor.id
                                                        ? null
                                                        : supervisor.id
                                                )
                                            }
                                            className="px-4 py-2 bg-[var(--primary-color)] text-[var(--text-color)] rounded-full hover:bg-[var(--primary-color-hover)] transition"
                                        >
                                            طلب إشراف
                                        </button>
                                    </div>

                                    {/* textarea تظهر فقط عند الضغط */}
                                    {selectedSupervisor === supervisor.id && (
                                        <div className="mt-4 text-right">
                                            <textarea
                                                className="w-full border rounded-lg p-2 text-[var(--text-dark)]"
                                                rows={3}
                                                placeholder="اكتب رسالتك هنا..."
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                            <div className="flex justify-end gap-2 mt-2">
                                                <button
                                                    onClick={() =>
                                                        handleRequest(supervisor.id)
                                                    }
                                                    className="px-4 py-2 bg-[var(--success-color)] text-white rounded-lg hover:opacity-90 transition"
                                                >
                                                    إرسال الطلب
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedSupervisor(null);
                                                        setMessage("");
                                                    }}
                                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                                                >
                                                    إلغاء
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* زر الإغلاق */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RequestSupervisor;
