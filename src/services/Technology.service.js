import apiEndpoint from "./api/apiEndpoints";
import { TokenApi } from "./api/apiClint";
export const TechnologyService = {
    AddTechnology: async (data) => {
        try {
            const response = await TokenApi.post(
                apiEndpoint.Technology.AddTechnology,
                data
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }
    },

    GetTechnology: async () => {
        try {
            const response = await TokenApi.get(
                apiEndpoint.Technology.GetTechnology
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response;
            else throw err.message;
        }
    },
    GetTechnologyById: async (id) => {
        try {
            const response = await TokenApi.get(
                apiEndpoint.Technology.GetTechnologyById(id)
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }
    },
    UpdateTechnology: async (id) => {
        try {
            const response = await TokenApi.put(
                apiEndpoint.Technology.UpdateTechnology(id)
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }
    },
    DeleteTechnology: async (id) => {
        try {
            const response = await TokenApi.delete(
                apiEndpoint.Technology.DeleteTechnology(id)
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }
    },
};
export default TechnologyService;








