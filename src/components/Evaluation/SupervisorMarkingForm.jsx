import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SupervisorService } from "../../services";
import { toast } from "react-toastify";

const SupervisorMarkingForm = ({ project, onSuccess }) => {
    const [mark, setMark] = useState("");
    const [feedback, setFeedback] = useState("");

    // Check if project is complete
    const isProjectComplete = project?.status?.toLowerCase() === "completed";

    // Check if already marked
    const { data: markingStatus } = useQuery({
        queryKey: ["markingStatus", project?.id],
        queryFn: () => SupervisorService.checkMarkingStatus(project?.id),
        enabled: !!project?.id && isProjectComplete,
    });

    const hasAlreadyMarked = markingStatus?.hasMarked || false;

    // Submit mark mutation
    const submitMarkMutation = useMutation({
        mutationFn: (data) => SupervisorService.submitMark(
            data.projectId,
            data.mark,
            data.feedback
        ),
        onSuccess: () => {
            toast.success("تم إرسال العلامة بنجاح!");
            setMark("");
            setFeedback("");
            if (onSuccess) onSuccess();
        },
        onError: (error) => {
            toast.error(error?.message || "فشل إرسال العلامة. حاول مرة أخرى.");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const numericMark = parseFloat(mark);

        if (!mark || isNaN(numericMark)) {
            toast.warning("الرجاء إدخال علامة صحيحة");
            return;
        }

        if (numericMark < 0 || numericMark > 100) {
            toast.warning("العلامة يجب أن تكون بين 0 و 100");
            return;
        }

        submitMarkMutation.mutate({
            projectId: project.id,
            mark: numericMark,
            feedback: feedback.trim(),
        });
    };

    const isDisabled = !isProjectComplete || hasAlreadyMarked || submitMarkMutation.isPending;

    const getGrade = (markValue) => {
        const num = parseFloat(markValue);
        if (isNaN(num)) return "";
        if (num >= 90) return "A (ممتاز)";
        if (num >= 80) return "B (جيد جداً)";
        if (num >= 70) return "C (جيد)";
        if (num >= 60) return "D (مقبول)";
        return "F (راسب)";
    };

    return (
        <div
            className="p-6 rounded-lg"
            style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border-color)",
            }}
        >
            <h3
                className="text-xl font-bold mb-4"
                style={{ color: "var(--text-color)" }}
            >
                تقييم المشروع
            </h3>

            {!isProjectComplete && (
                <div
                    className="mb-4 p-4 rounded-lg"
                    style={{
                        backgroundColor: "var(--status-pending-bg)",
                        color: "var(--status-pending-text)",
                        border: "1px solid var(--status-pending-border)",
                    }}
                >
                    ⏳ لا يمكن تقييم المشروع حتى يكتمل
                </div>
            )}

            {hasAlreadyMarked && (
                <div
                    className="mb-4 p-4 rounded-lg"
                    style={{
                        backgroundColor: "var(--status-accepted-bg)",
                        color: "var(--status-accepted-text)",
                        border: "1px solid var(--status-accepted-border)",
                    }}
                >
                    ✅ لقد قمت بتقييم هذا المشروع مسبقاً
                </div>
            )}

            <form onSubmit={handleSubmit} className={isDisabled ? "opacity-50" : ""}>
                {/* Mark Input */}
                <div className="mb-6">
                    <label
                        className="block mb-3 font-semibold"
                        style={{ color: "var(--text-color)" }}
                    >
                        العلامة (من 100) <span style={{ color: "var(--danger-color)" }}>*</span>
                    </label>
                    <input
                        type="number"
                        value={mark}
                        onChange={(e) => setMark(e.target.value)}
                        disabled={isDisabled}
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="أدخل العلامة من 0 إلى 100"
                        className="w-full p-3 rounded-lg text-lg font-semibold"
                        style={{
                            backgroundColor: "var(--bg-color)",
                            color: "var(--text-color)",
                            border: "2px solid var(--border-color)",
                        }}
                    />
                    {mark && !isNaN(parseFloat(mark)) && (
                        <div className="mt-3 flex items-center gap-3">
                            <div
                                className="px-4 py-2 rounded-lg font-semibold"
                                style={{
                                    backgroundColor: "var(--primary-color--overlay)",
                                    color: "var(--primary-color)",
                                }}
                            >
                                {getGrade(mark)}
                            </div>
                            {parseFloat(mark) < 60 && (
                                <span style={{ color: "var(--danger-color)" }}>⚠️</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Feedback */}
                <div className="mb-6">
                    <label
                        className="block mb-3 font-semibold"
                        style={{ color: "var(--text-color)" }}
                    >
                        ملاحظات للطالب (اختياري)
                    </label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        disabled={isDisabled}
                        rows={4}
                        maxLength={1000}
                        placeholder="أضف ملاحظات حول أداء الطالب وجودة المشروع..."
                        className="w-full p-3 rounded-lg resize-none"
                        style={{
                            backgroundColor: "var(--bg-color)",
                            color: "var(--text-color)",
                            border: "1px solid var(--border-color)",
                        }}
                    />
                    <p
                        className="mt-1 text-sm text-left"
                        style={{ color: "var(--text-color-secondary)" }}
                    >
                        {feedback.length}/1000
                    </p>
                </div>

                {/* Project Info */}
                <div
                    className="mb-6 p-4 rounded-lg"
                    style={{
                        backgroundColor: "var(--bg-light)",
                        border: "1px solid var(--border-color)",
                    }}
                >
                    <h4
                        className="font-semibold mb-2"
                        style={{ color: "var(--text-color)" }}
                    >
                        معلومات المشروع:
                    </h4>
                    <p style={{ color: "var(--text-color-secondary)" }}>
                        <strong>العنوان:</strong> {project?.title}
                    </p>
                    <p style={{ color: "var(--text-color-secondary)" }}>
                        <strong>الطلاب:</strong> {project?.teamMembers?.map(m => m.fullName).join(", ")}
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isDisabled}
                    className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300"
                    style={{
                        backgroundColor: isDisabled
                            ? "var(--disabled-bg)"
                            : "var(--btn-success-bg)",
                        color: "var(--btn-success-text)",
                        cursor: isDisabled ? "not-allowed" : "pointer",
                        opacity: isDisabled ? 0.6 : 1,
                    }}
                >
                    {submitMarkMutation.isPending ? "جاري الإرسال..." : "إرسال العلامة"}
                </button>
            </form>
        </div>
    );
};

export default SupervisorMarkingForm;