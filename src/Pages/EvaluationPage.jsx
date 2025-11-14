import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TokenApi } from "../services/api/apiClint";
import apiEndpoint from "../services/api/apiEndpoints";
import StudentEvaluationForm from "../components/Evaluation/StudentEvaluationForm";

const EvaluationPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    // Fetch project details
    const { data: project, isLoading, error } = useQuery({
        queryKey: ["project", projectId],
        queryFn: async () => {
            const response = await TokenApi.get(
                apiEndpoint.Project.GetProjectById(projectId)
            );
            return response.data;
        },
        enabled: !!projectId,
    });

    const handleSuccess = () => {
        // Navigate back to student profile after successful submission
        setTimeout(() => {
            navigate("/Students/StudentProfilePage");
        }, 2000);
    };

    if (isLoading) {
        return (
            <div
                className="min-h-screen p-4 md:p-8 flex items-center justify-center"
                style={{ backgroundColor: "var(--bg-light)" }}
            >
                <div className="text-center">
                    <div
                        className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                        style={{ borderColor: "var(--primary-color)" }}
                    ></div>
                    <p style={{ color: "var(--text-color-secondary)" }}>
                        جاري تحميل البيانات...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div
                className="min-h-screen p-4 md:p-8 flex items-center justify-center"
                style={{ backgroundColor: "var(--bg-light)" }}
            >
                <div
                    className="max-w-md w-full p-6 rounded-lg text-center"
                    style={{
                        backgroundColor: "var(--status-rejected-bg)",
                        border: "1px solid var(--status-rejected-border)",
                        color: "var(--status-rejected-text)",
                    }}
                >
                    <p className="text-5xl mb-4">⚠️</p>
                    <h2 className="text-xl font-bold mb-2">خطأ في تحميل المشروع</h2>
                    <p className="mb-4">
                        {error?.message || "لم يتم العثور على المشروع"}
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 rounded-lg font-semibold"
                        style={{
                            backgroundColor: "var(--btn-primary-bg)",
                            color: "var(--btn-primary-text)",
                        }}
                    >
                        العودة
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen p-4 md:p-8"
            style={{ backgroundColor: "var(--bg-light)" }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm transition-colors duration-200"
                        style={{ color: "var(--text-color-secondary)" }}
                    >
                        <span>←</span>
                        <span>العودة</span>
                    </button>
                </div>

                {/* Page Header */}
                <div
                    className="p-6 rounded-lg mb-6"
                    style={{
                        backgroundColor: "var(--card-bg)",
                        border: "1px solid var(--border-color)",
                    }}
                >
                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{ color: "var(--text-color)" }}
                    >
                        تقييم المشرف
                    </h1>
                    <p style={{ color: "var(--text-color-secondary)" }}>
                        شارك تجربتك مع المشرف لمساعدة الطلاب الآخرين
                    </p>
                </div>

                {/* Project Info Card */}
                <div
                    className="p-6 rounded-lg mb-6"
                    style={{
                        backgroundColor: "var(--card-bg)",
                        border: "1px solid var(--card-border-color)",
                    }}
                >
                    <h2
                        className="text-xl font-bold mb-4"
                        style={{ color: "var(--text-color)" }}
                    >
                        معلومات المشروع
                    </h2>
                    <div className="space-y-3">
                        <div>
                            <span
                                className="font-semibold"
                                style={{ color: "var(--text-color)" }}
                            >
                                العنوان:
                            </span>{" "}
                            <span style={{ color: "var(--text-color-secondary)" }}>
                                {project.title}
                            </span>
                        </div>
                        <div>
                            <span
                                className="font-semibold"
                                style={{ color: "var(--text-color)" }}
                            >
                                الوصف:
                            </span>{" "}
                            <span style={{ color: "var(--text-color-secondary)" }}>
                                {project.shortDescription}
                            </span>
                        </div>
                        <div>
                            <span
                                className="font-semibold"
                                style={{ color: "var(--text-color)" }}
                            >
                                أعضاء الفريق:
                            </span>{" "}
                            <span style={{ color: "var(--text-color-secondary)" }}>
                                {project.teamMembers?.map((m) => m.fullName).join(", ")}
                            </span>
                        </div>
                        <div>
                            <span
                                className="font-semibold"
                                style={{ color: "var(--text-color)" }}
                            >
                                الحالة:
                            </span>{" "}
                            <span
                                className="px-3 py-1 rounded-full text-sm font-semibold"
                                style={{
                                    backgroundColor:
                                        project.status?.toLowerCase() === "completed"
                                            ? "var(--status-accepted-bg)"
                                            : "var(--status-pending-bg)",
                                    color:
                                        project.status?.toLowerCase() === "completed"
                                            ? "var(--status-accepted-text)"
                                            : "var(--status-pending-text)",
                                }}
                            >
                                {project.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Evaluation Form */}
                <StudentEvaluationForm project={project} onSuccess={handleSuccess} />
            </div>
        </div>
    );
};

export default EvaluationPage;