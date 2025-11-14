import apiEndpoint from "./api/apiEndpoints";
import { TokenApi } from "./api/apiClint";

export const SearchService = {
    AdvanceSearch: async (data) => {
        try {
            const response = await TokenApi.get(
                apiEndpoint.Search.AdvancedSearch, {
                params: {
                    SearchTerm: data.search != "" ? data.search : null,
                    SearchStudents: true,
                    SearchSupervisors: true,
                    SearchProjects: true,
                    ProjectType: data?.projectType != "" ? data.projectType : null,
                    RequiredQuantityOfStudents: data?.count != "" ? data?.count : null,
                    Gender: data?.gender != "" ? data?.gender : null,
                    Semester: data?.semester != "" ? data?.semester : null,
                    TechnologyIds: data?.technologies != "" ? [data?.technologies] : null
                }
            }
            );
            return response.data;
        } catch (err) {
            if (err.response) throw err.response.data;
            else throw err.message;
        }


    }
};
