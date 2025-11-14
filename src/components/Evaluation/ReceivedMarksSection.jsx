import React from "react";
import { useQuery } from "@tanstack/react-query";
import { StudentService } from "../../services";

const ReceivedMarksSection = () => {
    const { data: mark, isLoading, error } = useQuery({
        queryKey: ["receivedmark"],
        queryFn: StudentService.getReceivedMarks,
    });

    const getGradeColor = (mark) => {
        if (mark >= 90) return "var(--success-color)";
        if (mark >= 80) return "var(--primary-color)";
        if (mark >= 70) return "#f59e0b";
        if (mark >= 60) return "#f97316";
        return "var(--danger-color)";
    };

    const getGradeLetter = (mark) => {
        if (mark >= 90) return "A";
        if (mark >= 80) return "B";
        if (mark >= 70) return "C";
        if (mark >= 60) return "D";
        return "F";
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
                        style={{ backgroundColor: "var(--border-color)", width: "40%" }}
                    ></div>
                    <div
                        className="h-20 rounded"
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
                ⚠️ فشل في تحميل العلامات
            </div>
        );
    }

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
                📊 العلامات المستلمة
            </h3>

            {!mark ? (
                <div
                    className="text-center py-8"
                    style={{ color: "var(--text-color-secondary)" }}
                >
                    <p className="text-4xl mb-3">📭</p>
                    <p>لا توجد علامات حتى الآن</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div
                        className="p-4 rounded-lg transition-all duration-300 hover:shadow-lg"
                        style={{
                            backgroundColor: "var(--bg-light)",
                            border: "1px solid var(--border-color)",
                        }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h4
                                    className="font-semibold mb-2"
                                    style={{ color: "var(--text-color)" }}
                                >
                                    {mark.projectTitle}
                                </h4>
                                <div
                                    className="text-sm space-y-1"
                                    style={{ color: "var(--text-color-secondary)" }}
                                >
                                    <p>
                                        <strong>المشرف:</strong> {mark.supervisorName}
                                    </p>
                                    {mark.dateReceived && (
                                        <p>
                                            <strong>التاريخ:</strong>{" "}
                                            {new Date(mark.dateReceived).toLocaleDateString(
                                                "ar-EG",
                                                {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }
                                            )}
                                        </p>
                                    )}
                                </div>
                                {mark.feedback && (
                                    <div
                                        className="mt-3 p-3 rounded-lg"
                                        style={{
                                            backgroundColor: "var(--bg-color)",
                                            borderRight: "3px solid var(--primary-color)",
                                        }}
                                    >
                                        <p
                                            className="text-sm italic"
                                            style={{ color: "var(--text-color-secondary)" }}
                                        >
                                            "{mark.feedback}"
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className="w-20 h-20 rounded-full flex flex-col items-center justify-center font-bold"
                                    style={{
                                        backgroundColor: `${getGradeColor(mark.mark)}20`,
                                        color: getGradeColor(mark.mark),
                                        border: `3px solid ${getGradeColor(mark.mark)}`,
                                    }}
                                >
                                    <span className="text-2xl">{mark.mark}</span>
                                    <span className="text-xs">/ 100</span>
                                </div>
                                <div
                                    className="px-3 py-1 rounded-full text-sm font-semibold"
                                    style={{
                                        backgroundColor: getGradeColor(mark.mark),
                                        color: "white",
                                    }}
                                >
                                    {getGradeLetter(mark.mark)}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default ReceivedMarksSection;