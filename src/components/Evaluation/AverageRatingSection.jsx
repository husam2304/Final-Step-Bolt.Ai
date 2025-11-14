import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SupervisorService } from "../../services";

const AverageRatingSection = () => {
    const { data: ratingData, isLoading, error } = useQuery({
        queryKey: ["averageRating"],
        queryFn: SupervisorService.getAverageRating,
    });

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(
                    <span key={i} className="text-3xl" style={{ color: "#fbbf24" }}>
                        ★
                    </span>
                );
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <span key={i} className="text-3xl relative">
                        <span style={{ color: "var(--border-color)" }}>★</span>
                        <span
                            className="absolute top-0 left-0 overflow-hidden"
                            style={{ width: "50%", color: "#fbbf24" }}
                        >
                            ★
                        </span>
                    </span>
                );
            } else {
                stars.push(
                    <span key={i} className="text-3xl" style={{ color: "var(--border-color)" }}>
                        ★
                    </span>
                );
            }
        }
        return stars;
    };

    const getRatingDescription = (rating) => {
        if (rating >= 4.5) return "ممتاز";
        if (rating >= 4.0) return "جيد جداً";
        if (rating >= 3.5) return "جيد";
        if (rating >= 3.0) return "متوسط";
        return "يحتاج تحسين";
    };

    if (isLoading) {
        return (
            <div
                className="p-6 rounded-lg"
                style={{
                    backgroundColor: "var(--card-bg)",
                    border: "1px solid var(--border-color)",
                }}
            >
                <div className="animate-pulse">
                    <div
                        className="h-6 rounded mb-4"
                        style={{ backgroundColor: "var(--border-color)", width: "50%" }}
                    ></div>
                    <div
                        className="h-24 rounded"
                        style={{ backgroundColor: "var(--border-color)" }}
                    ></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="p-6 rounded-lg"
                style={{
                    backgroundColor: "var(--status-rejected-bg)",
                    border: "1px solid var(--status-rejected-border)",
                    color: "var(--status-rejected-text)",
                }}
            >
                ⚠️ فشل في تحميل التقييمات
            </div>
        );
    }

    const { averageRating = 0, totalEvaluations = 0, projectsSupervised = 0 } = ratingData || {};

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
                ⭐ تقييمات الطلاب
            </h3>

            {totalEvaluations === 0 ? (
                <div
                    className="text-center py-8"
                    style={{ color: "var(--text-color-secondary)" }}
                >
                    <p className="text-4xl mb-3">📊</p>
                    <p>لا توجد تقييمات حتى الآن</p>
                    <p className="text-sm mt-2">
                        سيظهر متوسط التقييمات بعد حصولك على أول تقييم من الطلاب
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Main Rating Display */}
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            {renderStars(averageRating)}
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <span
                                className="text-4xl font-bold"
                                style={{ color: "var(--text-color)" }}
                            >
                                {averageRating.toFixed(1)}
                            </span>
                            <span style={{ color: "var(--text-color-secondary)" }}>/</span>
                            <span
                                className="text-2xl"
                                style={{ color: "var(--text-color-secondary)" }}
                            >
                                5.0
                            </span>
                        </div>
                        <p
                            className="mt-2 font-semibold"
                            style={{ color: "var(--primary-color)" }}
                        >
                            {getRatingDescription(averageRating)}
                        </p>
                    </div>

                    {/* Statistics */}
                    <div
                        className="grid grid-cols-2 gap-4 p-4 rounded-lg"
                        style={{
                            backgroundColor: "var(--bg-light)",
                            border: "1px solid var(--border-color)",
                        }}
                    >
                        <div className="text-center">
                            <p
                                className="text-3xl font-bold mb-1"
                                style={{ color: "var(--primary-color)" }}
                            >
                                {totalEvaluations}
                            </p>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-color-secondary)" }}
                            >
                                تقييم
                            </p>
                        </div>
                        <div className="text-center">
                            <p
                                className="text-3xl font-bold mb-1"
                                style={{ color: "var(--success-color)" }}
                            >
                                {projectsSupervised}
                            </p>
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-color-secondary)" }}
                            >
                                مشروع مُشرف
                            </p>
                        </div>
                    </div>

                    {/* Rating Distribution (Optional visual enhancement) */}
                    <div
                        className="p-4 rounded-lg"
                        style={{
                            backgroundColor: "var(--bg-light)",
                            border: "1px solid var(--border-color)",
                        }}
                    >
                        <p
                            className="text-sm mb-3 font-semibold"
                            style={{ color: "var(--text-color)" }}
                        >
                            نسبة الرضا:
                        </p>
                        <div className="relative h-4 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border-color)" }}>
                            <div
                                className="h-full transition-all duration-500 rounded-full"
                                style={{
                                    width: `${(averageRating / 5) * 100}%`,
                                    backgroundColor: averageRating >= 4 ? "var(--success-color)" : averageRating >= 3 ? "#f59e0b" : "var(--danger-color)",
                                }}
                            ></div>
                        </div>
                        <p className="text-right text-sm mt-2" style={{ color: "var(--text-color-secondary)" }}>
                            {((averageRating / 5) * 100).toFixed(0)}%
                        </p>
                    </div>

                    {/* Note */}
                    <div
                        className="text-xs p-3 rounded-lg"
                        style={{
                            backgroundColor: "var(--primary-color--overlay)",
                            color: "var(--text-color-secondary)",
                        }}
                    >
                        💡 التقييمات مجهولة المصدر لضمان خصوصية الطلاب
                    </div>
                </div>
            )}
        </div>
    );
};

export default AverageRatingSection;