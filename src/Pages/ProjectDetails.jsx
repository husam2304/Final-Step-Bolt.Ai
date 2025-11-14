import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProjectService } from "../services";
import InviteStudentButton from "../components/UI/Buttons/InviteStudentButton";
import RequestSupervisionButton from "../components/UI/Buttons/RequestSupervisionButton";
import DeleteProjectButton from "../components/UI/Buttons/DeleteProjectButton";
import RemoveMemberButton from "../components/UI/Buttons/RemoveMemberButton";
import LeaveTeamButton from "../components/UI/Buttons/LeaveTeamButton";
import {
  Users,
  Calendar,
  UserCheck,
  Code,
  Star,
  UserPlus,
  Info,
  Lightbulb,
  Settings,
  Cpu,
  Target
} from "lucide-react";

const ProjectDetails = () => {
  const { ProjectId } = useParams();
  const User = useSelector((state) => state?.auth?.user);
  const userId = User?.email?.substring(0, 12);

  const { data: project, isLoading: loading } = useQuery({
    queryKey: ["Project", ProjectId],
    queryFn: () => ProjectService.GetProjectById(ProjectId),
  });

  if (loading)
    return (
      <div className="text-center py-10 text-[var(--text-color)] animate-fade-in-up">
        جاري التحميل...
      </div>
    );

  if (!project)
    return (
      <div className="text-center py-10 text-[var(--danger-color)] animate-fade-in-up">
        فشل تحميل بيانات المشروع
      </div>
    );

  const isManager = project.teamMembers?.some(
    (member) => member.studentId === userId && member.isManager
  );

  return (
    <div className="min-h-screen bg-[var(--bg-color)] py-8 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div
          className="bg-[var(--primary-color)] text-white rounded-t-2xl p-6 shadow-lg animate-fade-in-up"
          style={{
            background: `linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-hover) 100%)`,
          }}
        >
          <h1 className="text-3xl font-bold text-center">تفاصيل المشروع</h1>
        </div>

        {/* Main Content Card */}
        <div
          className="bg-[var(--card-bg)] rounded-b-2xl shadow-lg border border-[var(--card-border-color)] animate-fade-in-up animation-delay-300"
          style={{
            borderTop: "none",
          }}
        >
          {/* Project Information Section */}
          <div className="p-6 border-b mb-8 shadow-2xl border-[var(--border-color)]">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[var(--primary-color)] text-white rounded-lg p-2">
                <Info className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-color)]">
                معلومات عن المشروع
              </h2>
            </div>

            {/* Table Layout */}
            <div className="mr-9 space-y-3">
              <table className="w-full border-collapse text-[var(--text-color-secondary)]">
                <tbody>
                  <tr className="border-b border-[var(--primary-color)]">
                    <td className="font-semibold text-[var(--text-color)] py-1 w-4/5">العنوان:</td>
                    <td className="py-1">{project.title}</td>
                  </tr>
                  <tr className="border-b border-[var(--primary-color)]">
                    <td className="font-semibold text-[var(--text-color)] py-1">الوصف القصير:</td>
                    <td className="py-1">{project.shortDescription}</td>
                  </tr>
                  <tr className="border-b border-[var(--primary-color)]">
                    <td className="font-semibold text-[var(--text-color)] py-1">الفصل:</td>
                    <td className="py-1">{project.semester}</td>
                  </tr>
                  <tr className="border-b border-[var(--primary-color)]">
                    <td className="font-semibold text-[var(--text-color)] py-1">السنة:</td>
                    <td className="py-1">{project.year}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Main Idea Section */}
          <div className="p-6 border-b my-8 shadow-2xl border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[var(--primary-color)] text-white rounded-lg p-2">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-color)]">
                الفكرة الأساسية
              </h2>
            </div>
            <div className="mr-9">
              <p className="text-[var(--text-color)] leading-relaxed">
                {project.longDescription}
              </p>
            </div>
          </div>

          {/* Project Details Section */}
          <div className="p-6 border-b my-8 shadow-2xl border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[var(--primary-color)] text-white rounded-lg p-2">
                <Settings className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-color)]">
                تفاصيل المشروع
              </h2>
            </div>
            <div className="mr-9 space-y-3">
              <table className="w-full border-collapse text-[var(--text-color)]">
                <tbody>
                  <tr className="border-b border-[var(--primary-color)]">
                    <td className="py-2 align-top w-4/5">
                      <Calendar className="w-5 h-5 text-[var(--primary-color)] inline mr-2" />
                      <span className="font-semibold">الفصل:</span>
                    </td>
                    <td className="py-2">
                      {project.semester}
                    </td>
                  </tr>

                  <tr className="border-b border-[var(--primary-color)]">
                    <td className="py-2 align-top">
                      <Calendar className="w-5 h-5 text-[var(--primary-color)] inline mr-2" />
                      <span className="font-semibold">السنة:</span>
                    </td>
                    <td className="py-2">
                      {project.year}
                    </td>
                  </tr>

                  <tr className="border-b border-[var(--primary-color)]">
                    <td className="py-2 align-top">
                      <UserCheck className="w-5 h-5 text-[var(--primary-color)] inline mr-2" />
                      <span className="font-semibold">مدير المشروع:</span>
                    </td>
                    <td className="py-2">
                      {project.managerName}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Team Information Section */}
          <div className="p-6 border-b my-8 shadow-2xl border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[var(--primary-color)] text-white rounded-lg p-2">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-color)]">
                معلومات الفريق
              </h2>
            </div>
            <div className="mr-9 space-y-3">
              <table className="w-full border-collapse text-[var(--text-color)]">
                <tbody>
                  <tr className="border-b border-[var(--primary-color)]">
                    <td className="font-semibold py-1 w-4/5">عدد الأعضاء:</td>
                    <td className="py-1">{project.currentMemberCount}</td>
                  </tr>
                  <tr className="border-b border-[var(--primary-color)]">
                    <td className="font-semibold py-1">العدد المسموح:</td>
                    <td className="py-1">{project.numberOfUsers}</td>
                  </tr>
                  <tr className="border-b border-[var(--primary-color)]">
                    <td className="font-semibold py-1">يوجد شواغر:</td>
                    <td className="py-1">{project.hasOpenings ? "نعم" : "لا"}</td>
                  </tr>
                </tbody>
              </table>

              {/* Team Members List */}
              <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--text-color)] mb-3">أعضاء الفريق:</h3>
                <div className="space-y-2">
                  {project.teamMembers?.map((member) => (
                    <div
                      key={member.studentId}
                      className="flex justify-between items-center p-3 bg-[var(--bg-light)] rounded-lg hover:bg-[var(--hover-bg)] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--primary-color--overlay)] flex items-center justify-center">
                          <UserCheck className="w-5 h-5 text-[var(--primary-color)]" />
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-color)]">
                            {member.fullName}
                          </p>
                          <p className="text-sm text-[var(--text-color-secondary)]">
                            {member.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {member.isManager && (
                          <span className="px-3 py-1 bg-[var(--success-color)] text-white text-sm font-semibold rounded-full">
                            مدير
                          </span>
                        )}
                        {isManager && !member.isManager && (
                          <RemoveMemberButton
                            studentId={member.studentId}
                            projectId={project.id}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technologies Section */}
          <div className="p-6 border-b my-8 shadow-2xl border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[var(--primary-color)] text-white rounded-lg p-2">
                <Cpu className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-color)]">
                التقنيات المستخدمة
              </h2>
            </div>
            <div className="mr-9">
              <div className="flex flex-wrap gap-2">
                {project.technologyIds?.length ? (
                  project.technologyIds.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                      style={{
                        backgroundColor: "var(--card-teq-color)",
                        color: "var(--text-light)",
                      }}
                    >
                      <Code className="w-4 h-4" />
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-[var(--text-color-secondary)]">
                    لم يتم تحديد تقنيات
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="p-6">
            {isManager ? (
              // Manager Actions
              <div className="flex flex-wrap gap-3 justify-center">
                <InviteStudentButton projectId={project.id} />
                <RequestSupervisionButton projectId={project.id} />
                <DeleteProjectButton projectId={project.id} />
              </div>
            ) : (
              // Non-Manager Actions
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  className="px-6 py-3 bg-[var(--bg-light)] text-[var(--primary-color)] border-2 border-[var(--primary-color)] rounded-lg font-semibold hover:bg-[var(--primary-color--overlay)] transition-all duration-300 flex items-center gap-2 shadow-md"
                >
                  <Star className="w-5 h-5" />
                  <span>إضافة إلى المفضلة</span>
                </button>
                <button
                  className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--primary-color-hover)] transition-all duration-300 flex items-center gap-2 shadow-md"
                  disabled={!project.hasOpenings}
                  style={{
                    opacity: project.hasOpenings ? 1 : 0.5,
                    cursor: project.hasOpenings ? "pointer" : "not-allowed",
                  }}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>الانضمام</span>
                </button>
              </div>
            )}

            {/* Leave Team Button (for all members) */}
            {!isManager && (
              <div className="mt-4 text-center">
                <LeaveTeamButton projectId={project.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;