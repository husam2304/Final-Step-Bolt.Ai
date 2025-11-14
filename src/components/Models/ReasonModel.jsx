import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ProjectService } from "./../../services";
import { StudentService } from "./../../services";
import { toast } from "react-toastify";

export function ReasonModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type,
  ProjectId,
  StudentId,
}) {
  const [reason, setReason] = useState("");

  // 1. Leave Team Mutation
  const leaveTeamMutation = useMutation({
    mutationFn: async () => {
      await ProjectService.LeaveTeam(ProjectId);
    },
    onSuccess: () => {
      toast.success("تم مغادرة الفريق بنجاح");
      setReason("");
      onClose();
      if (onConfirm) onConfirm(reason);
    },
    onError: (error) => {
      toast.error(`حدث خطأ أثناء مغادرة الفريق: ${error.message}`);
      console.log("تم تأكيد المغادرة بسبب:", reason);
      console.log("معرف المشروع:", ProjectId);
    },
  });

  // 2. Remove Member Mutation
  const removeMemberMutation = useMutation({
    mutationFn: async () => {
      await ProjectService.RemoveMember(ProjectId, StudentId);
    },
    onSuccess: () => {
      toast.success("تم إزالة العضو بنجاح");
      setReason("");
      onClose();
      if (onConfirm) onConfirm(reason);
    },
    onError: (error) => {
      toast.error(`حدث خطأ أثناء إزالة العضو: ${error.message}`);
      console.log("تم تأكيد الإزالة بسبب:", reason);
      console.log("معرف المشروع:", ProjectId);
      console.log("معرف الطالب:", StudentId);
    },
  });

  // 3. Delete Account Mutation - FAKE IMPLEMENTATION FOR TESTING
  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      // Fake API call for testing - simulate network delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1500);
      });
    },
    onSuccess: () => {
      toast.success("تم حذف الحساب بنجاح. سيتم تسجيل خروجك.");
      setReason("");
      onClose();
      if (onConfirm) onConfirm(reason);

      // Simulate logout after account deletion
      setTimeout(() => {
        toast.info("تم تسجيل الخروج بسبب حذف الحساب");
        console.log("تم حذف الحساب بسبب:", reason);
      }, 1000);
    },
    onError: (error) => {
      toast.error(`حدث خطأ أثناء حذف الحساب: ${error.message}`);
      console.log("تم تأكيد الحذف بسبب:", reason);
    },
  });

  if (!isOpen) return null;

  // تحديد الطفرة المناسبة بناءً على نوع الإجراء (تم التحديث)
  const getCurrentMutation = () => {
    switch (type) {
      case "LeaveTeam":
        return leaveTeamMutation;
      case "RemoveMember":
        return removeMemberMutation;
      case "DeleteAccount":
        return deleteAccountMutation;
      default:
        return null;
    }
  };

  const currentMutation = getCurrentMutation();
  const isPending = currentMutation?.isPending || false;

  // دالة التأكيد (تم التحديث)
  const handleConfirm = () => {
    if (!reason.trim()) {
      toast.error("يرجى كتابة السبب قبل التأكيد");
      return;
    }

    switch (type) {
      case "LeaveTeam":
        leaveTeamMutation.mutate();
        break;
      case "RemoveMember":
        removeMemberMutation.mutate();
        break;
      case "DeleteAccount":
        deleteAccountMutation.mutate();
        break;
      default:
        onConfirm(reason);
        setReason("");
        break;
    }
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  // تحديد نص زر التأكيد (تم التحديث)
  const getConfirmButtonText = () => {
    if (isPending) return "جاري المعالجة...";

    switch (type) {
      case "LeaveTeam":
        return "تأكيد المغادرة";
      case "RemoveMember":
        return "تأكيد الإزالة";
      case "DeleteAccount":
        return "حذف الحساب نهائياً";
      default:
        return "تأكيد";
    }
  };

  // تحديد محتوى النافذة (تم التحديث)
  const getModalContent = () => {
    const defaultTitle =
      type === "LeaveTeam"
        ? "مغادرة الفريق"
        : type === "DeleteAccount"
        ? "حذف الحساب نهائياً"
        : "تأكيد الإجراء";

    const defaultMessage =
      type === "LeaveTeam"
        ? "هل أنت متأكد من رغبتك في مغادرة الفريق؟ يرجى كتابة السبب أدناه."
        : type === "DeleteAccount"
        ? "⚠️ هذا الإجراء لا يمكن التراجع عنه! سيتم حذف جميع بياناتك ومعلوماتك بشكل نهائي. يرجى كتابة السبب أدناه للتأكيد."
        : "يرجى كتابة السبب أدناه";

    return {
      title: title || defaultTitle,
      message: message || defaultMessage,
    };
  };

  const { title: modalTitle, message: modalMessage } = getModalContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50  backdrop-blur-sm">
      <div className="relative rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100 border border-gray-200">
        <div className="p-6  bg-[var(--modal-bg)] rounded-2xl">
          <div className="flex justify-center mb-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                type === "LeaveTeam" || type === "DeleteAccount"
                  ? "bg-red-100"
                  : "bg-orange-100"
              }`}
            >
              <span
                className={`text-lg ${
                  type === "LeaveTeam" || type === "DeleteAccount"
                    ? "text-red-600"
                    : "text-orange-600"
                }`}
              >
                {type === "LeaveTeam"
                  ? "🚪"
                  : type === "DeleteAccount"
                  ? "🗑️"
                  : "👤"}
              </span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-center mb-3 text-[var(--text-color)]">
            {modalTitle}
          </h2>

          <p className="text-center text-[var(--text-color)] mb-6 leading-relaxed">
            {modalMessage}
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              السبب <span className="text-red-500">*</span>
            </label>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 rounded-xl transition-all duration-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 outline-none resize-none"
              placeholder="اكتب السبب هنا..."
              disabled={isPending}
              maxLength={500}
            />

            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-var(--text-color-secondary)">
                {reason.length}/500 حرف
              </span>
              {!reason.trim() && (
                <span className="text-xs text-red-500">مطلوب</span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300"
              onClick={handleClose}
              disabled={isPending}
            >
              إلغاء
            </button>

            <button
              className={`px-6 py-2.5 text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-24 ${
                type === "LeaveTeam" || type === "DeleteAccount"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
              onClick={handleConfirm}
              disabled={isPending || !reason.trim()}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري المعالجة...</span>
                </div>
              ) : (
                getConfirmButtonText()
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReasonModal;
