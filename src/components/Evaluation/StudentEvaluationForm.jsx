import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StudentService } from "../../services";
import { toast } from "react-toastify";

const StudentEvaluationForm = ({ project, onSuccess }) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");

    // Check if project is complete
    const isProjectComplete = project?.status?.toLowerCase() === "completed";

    // Check if already evaluated
    const { data: evaluationStatus } = useQuery({
        queryKey: ["evaluationStatus", project?.id],
        queryFn: () => StudentService.checkEvaluationStatus(project?.id),
        enabled: !!project?.id && isProjectComplete,
    });

    const hasAlreadyEvaluated = evaluationStatus?.hasEvaluated || false;

    // Submit evaluation mutation
    const submitEvaluationMutation = useMutation({
        mutationFn: (data) => StudentService.submitEvaluation(
            data.projectId,
            data.supervisorId,
            data.rating,
            data.comment
        ),
        onSuccess: () => {
            toast.success("تم إرسال التقييم بنجاح!");
            setRating(0);
            setComment("");
            if (onSuccess) onSuccess();
        },
        onError: (error) => {
            toast.error(error?.message || "فشل إرسال التقييم. حاول مرة أخرى.");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (rating === 0) {
            toast.warning("الرجاء اختيار تقييم");
            return;
        }

        submitEvaluationMutation.mutate({
            projectId: project.id,
            supervisorId: project.supervisorId,
            rating,
            comment: comment.trim(),
        });
    };

    const isDisabled = !isProjectComplete || hasAlreadyEvaluated || submitEvaluationMutation.isPending;

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
                تقييم المشرف
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
                    ⏳ لا يمكن تقييم المشرف حتى يكتمل المشروع
                </div>
            )}

            {hasAlreadyEvaluated && (
                <div
                    className="mb-4 p-4 rounded-lg"
                    style={{
                        backgroundColor: "var(--status-accepted-bg)",
                        color: "var(--status-accepted-text)",
                        border: "1px solid var(--status-accepted-border)",
                    }}
                >
                    ✅ لقد قمت بتقييم هذا المشرف مسبقاً
                </div>
            )}

            <form onSubmit={handleSubmit} className={isDisabled ? "opacity-50" : ""}>
                {/* Rating Stars */}
                <div className="mb-6">
                    <label
                        className="block mb-3 font-semibold"
                        style={{ color: "var(--text-color)" }}
                    >
                        التقييم <span style={{ color: "var(--danger-color)" }}>*</span>
                    </label>
                    <div className="flex gap-2" dir="ltr">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => !isDisabled && setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="text-4xl transition-all duration-200 hover:scale-110"
                                style={{
                                    color:
                                        star <= (hoveredRating || rating)
                                            ? "#fbbf24"
                                            : "var(--border-color)",
                                    cursor: isDisabled ? "not-allowed" : "pointer",
                                }}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <p
                        className="mt-2 text-sm"
                        style={{ color: "var(--text-color-secondary)" }}
                    >
                        {rating === 0 && "اختر عدد النجوم"}
                        {rating === 1 && "ضعيف جداً"}
                        {rating === 2 && "ضعيف"}
                        {rating === 3 && "متوسط"}
                        {rating === 4 && "جيد"}
                        {rating === 5 && "ممتاز"}
                    </p>
                </div>

                {/* Comment */}
                <div className="mb-6">
                    <label
                        className="block mb-3 font-semibold"
                        style={{ color: "var(--text-color)" }}
                    >
                        ملاحظات إضافية (اختياري)
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={isDisabled}
                        rows={4}
                        maxLength={500}
                        placeholder="شارك رأيك حول تجربة الإشراف..."
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
                        {comment.length}/500
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
                            : "var(--btn-primary-bg)",
                        color: "var(--btn-primary-text)",
                        cursor: isDisabled ? "not-allowed" : "pointer",
                        opacity: isDisabled ? 0.6 : 1,
                    }}
                >
                    {submitEvaluationMutation.isPending ? "جاري الإرسال..." : "إرسال التقييم"}
                </button>
            </form>
        </div>
    );
};

export default StudentEvaluationForm;