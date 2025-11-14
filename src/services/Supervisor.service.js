import apiEndpoint from "./api/apiEndpoints";
import { TokenApi } from "./api/apiClint";

// 🔧 MOCK DATA TOGGLE - Set to false when backend is ready
const USE_MOCK_DATA = true;

// Helper function to simulate network delay
const mockDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// 📊 MOCK DATA
const MOCK_AVERAGE_RATING = {
    averageRating: 4.3,
    totalEvaluations: 18,
    projectsSupervised: 12
};

const MOCK_PROJECT_MARKS = {
    projectId: "a615f10e-952d-43e0-8142-c1e8c28064b0",
    mark: 88,
    feedback: "عمل جيد جداً. المشروع يظهر جهداً كبيراً والتطبيق يعمل بشكل سليم.",
    dateMarked: "2025-11-12T11:20:00Z"
};

const MOCK_MARKING_STATUS = {
    hasMarked: false // Change to true to test "already marked" state
};

export const SupervisorService = {
    // Existing method...
    GetAll: async () => {
        try {
            const response = await TokenApi.get(
                apiEndpoint.Supervisor.getAllSupervisors
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }
    },

    // ============ EVALUATION METHODS WITH MOCK DATA ============

    /**
     * Submit mark for a project
     * @param {string} projectId - Project ID
     * @param {number} mark - Mark (0-100)
     * @param {string} feedback - Optional feedback
     */
    submitMark: async (projectId, mark, feedback = "") => {
        if (USE_MOCK_DATA) {
            console.log("🔧 MOCK: Submitting mark", { projectId, mark, feedback });
            await mockDelay(1200);

            return {
                success: true,
                message: "تم إرسال العلامة بنجاح",
                data: {
                    markId: `mark_${Date.now()}`,
                    projectId,
                    mark,
                    feedback,
                    submittedAt: new Date().toISOString()
                }
            };
        }

        try {
            const response = await TokenApi.post(
                apiEndpoint.Evaluation.submitMark,
                {
                    projectId,
                    mark,
                    feedback,
                }
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }
    },

    /**
     * Get marks for a specific project
     * @param {string} projectId - Project ID
     */
    getProjectMarks: async (projectId) => {
        if (USE_MOCK_DATA) {
            console.log("🔧 MOCK: Fetching project marks for", projectId);
            await mockDelay(500);

            return {
                ...MOCK_PROJECT_MARKS,
                projectId // Override with the requested projectId
            };
        }

        try {
            const response = await TokenApi.get(
                apiEndpoint.Evaluation.getProjectMarks(projectId)
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }
    },

    /**
     * Get average rating for the supervisor
     */
    getAverageRating: async () => {
        if (USE_MOCK_DATA) {
            console.log("🔧 MOCK: Fetching average rating");
            await mockDelay(700);

            return MOCK_AVERAGE_RATING;
        }

        try {
            const response = await TokenApi.get(
                apiEndpoint.Evaluation.getAverageRating
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }
    },

    /**
     * Check if supervisor has already marked a project
     * @param {string} projectId - Project ID
     */
    checkMarkingStatus: async (projectId) => {
        if (USE_MOCK_DATA) {
            console.log("🔧 MOCK: Checking marking status for", projectId);
            await mockDelay(450);

            return MOCK_MARKING_STATUS;
        }

        try {
            const response = await TokenApi.get(
                apiEndpoint.Evaluation.checkMarkingStatus(projectId)
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }
    },
};