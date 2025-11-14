import apiEndpoint from "./api/apiEndpoints";
import { TokenApi } from "./api/apiClint";
export const ProjectService = {
  CreateProject: async (data) => {
    try {
      const response = await TokenApi.post(
        apiEndpoint.Project.CreateProject,
        data
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "فشل في إنشاء المشروع";
      throw new Error(errorMessage);
    }
  },

  GetProjectById: async (id) => {
    try {
      const response = await TokenApi.get(
        apiEndpoint.Project.GetProjectById(id)
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "فشل في جلب بيانات المشروع";
      throw new Error(errorMessage);
    }
  },

  RequestSupervisor: async (ProjectId, supervisorId, Message) => {
    try {
      const response = await TokenApi.post(
        apiEndpoint.Project.RequestSupervisor,
        {
          projectId: ProjectId,
          supervisorId: supervisorId,
          message: Message,
        }
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "فشل في إرسال طلب الإشراف";
      throw new Error(errorMessage);
    }
  },

  getAllDoctorsProject: async () => {
    try {
      const response = await TokenApi.get(
        apiEndpoint.Search.GetProjectsByProjectType,
        {
          params: {
            projectType: 4,
          },
        }
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "فشل في جلب مشاريع الأساتذة";
      throw new Error(errorMessage);
    }
  },

  getAllStudentsProjects: async () => {
    try {
      const response = await TokenApi.get(apiEndpoint.Project.GetAllProjects);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "فشل في جلب مشاريع الطلاب";
      throw new Error(errorMessage);
    }
  },

  UpdateProject: async (id, data) => {
    try {
      const response = await TokenApi.put(
        apiEndpoint.Project.UpdateProject(id),
        data
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "فشل في تحديث المشروع";
      throw new Error(errorMessage);
    }
  },

  DeleteProject: async (id) => {
    try {
      const response = await TokenApi.delete(
        apiEndpoint.Project.DeleteProject(id)
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "فشل في حذف المشروع";
      throw new Error(errorMessage);
    }
  },

  LeaveTeam: async (projectId) => {
    try {
      const response = await TokenApi.post(apiEndpoint.Project.LeaveTeam, {
        projectId,
      });
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "فشل في مغادرة الفريق";
      throw new Error(errorMessage);
    }
  },

  RemoveMember: async (ProjectId, MemberId) => {
    try {
      const response = await TokenApi.post(apiEndpoint.Project.RemoveMember, {
        ProjectId,
        MemberId,
      });
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "فشل في إزالة العضو";
      throw new Error(errorMessage);
    }
  },
};

export default ProjectService;
