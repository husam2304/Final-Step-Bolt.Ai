import apiEndpoint from "./api/apiEndpoints";
import { TokenApi } from "./api/apiClint";

// 🔧 MOCK DATA TOGGLE - Set to false when backend is ready
const USE_MOCK_DATA = true;

// Helper function to simulate network delay
const mockDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// 📊 MOCK DATA
const MOCK_RECEIVED_MARKS =
{
  projectTitle: "نظام إدارة المكتبة الذكي",
  supervisorName: "د. أحمد محمد العلي",
  mark: 95,
  feedback: "عمل ممتاز! المشروع يظهر فهماً عميقاً للمفاهيم البرمجية واستخدام تقنيات حديثة. التصميم احترافي والكود منظم بشكل جيد.",
  dateReceived: "2025-11-10T10:30:00Z"
};

const MOCK_EVALUATION_STATUS = {
  hasEvaluated: false // Change to true to test "already evaluated" state
};

export const StudentService = {
  // Existing methods...
  changeSearchTeam: async (userId, d) => {
    try {
      const res = await TokenApi.patch(
        apiEndpoint.Student.ActivatSearshTeam(userId),
        [{ op: "replace", path: "/ActivateStudent", value: d }]
      );
      return res.data;
    } catch (err) {
      if (err.response) throw err.response.data;
      else throw err.message;
    }
  },

  GetAll: async (search = "") => {
    try {
      const response = await TokenApi.get(apiEndpoint.Search.AdvancedSearch, {
        params: {
          SearchTerm: search,
          SearchStudents: true,
          SearchSupervisors: false,
          SearchProjects: false,
        },
      });
      return response.data.students;
    } catch (err) {
      if (err.response) throw err.response.data;
      else throw err.message;
    }
  },

  getStudentSearchProject: async () => {
    try {
      const response = await TokenApi.get(
        apiEndpoint.Student.ActivatSearshTeam
      );
      return response.data;
    } catch (err) {
      if (err.response) throw err.response.data;
      else throw err.message;
    }
  },

  // ============ EVALUATION METHODS WITH MOCK DATA ============

  /**
   * Submit evaluation for a supervisor
   * @param {string} projectId - Project ID
   * @param {string} supervisorId - Supervisor ID
   * @param {number} rating - Rating (1-5)
   * @param {string} comment - Optional comment
   */
  submitEvaluation: async (projectId, supervisorId, rating, comment = "") => {
    if (USE_MOCK_DATA) {
      console.log("🔧 MOCK: Submitting evaluation", { projectId, supervisorId, rating, comment });
      await mockDelay(1000);

      return {
        success: true,
        message: "تم إرسال التقييم بنجاح",
        data: {
          evaluationId: `eval_${Date.now()}`,
          projectId,
          supervisorId,
          rating,
          comment,
          submittedAt: new Date().toISOString()
        }
      };
    }

    try {
      const response = await TokenApi.post(
        apiEndpoint.Evaluation.submitEvaluation,
        {
          projectId,
          supervisorId,
          rating,
          comment,
        }
      );
      return response.data;
    } catch (err) {
      if (err.response) throw err.response.data;
      else throw err.message;
    }
  },

  /**
   * Get all marks received by the student
   */
  getReceivedMarks: async () => {
    if (USE_MOCK_DATA) {
      console.log("🔧 MOCK: Fetching received marks");
      await mockDelay(600);

      return MOCK_RECEIVED_MARKS;
    }

    try {
      const response = await TokenApi.get(
        apiEndpoint.Evaluation.getReceivedMarks
      );
      return response.data;
    } catch (err) {
      if (err.response) throw err.response.data;
      else throw err.message;
    }
  },

  /**
   * Check if student has already evaluated a project
   * @param {string} projectId - Project ID
   */
  checkEvaluationStatus: async (projectId) => {
    if (USE_MOCK_DATA) {
      console.log("🔧 MOCK: Checking evaluation status for", projectId);
      await mockDelay(400);

      return MOCK_EVALUATION_STATUS;
    }

    try {
      const response = await TokenApi.get(
        apiEndpoint.Evaluation.checkEvaluationStatus(projectId)
      );
      return response.data;
    } catch (err) {
      if (err.response) throw err.response.data;
      else throw err.message;
    }
  },
};