import { TokenApi } from './api/apiClint';
import apiEndpoint from './api/apiEndpoints';

export const openAiService = {
    sendChatMessage: async (message, sessionId) => {
        try {
            const response = await TokenApi.post(
                apiEndpoint.openAI.getResultPrompt,
                { message, sessionId }
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }
    },
    startSession: async () => {
        try {
            const response = await TokenApi.post(
                apiEndpoint.openAI.start,
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }
    },
    deleteSession: async (sessionId) => {
        try {
            const response = await TokenApi.post(
                apiEndpoint.openAI.delete(sessionId),
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }
    },
};