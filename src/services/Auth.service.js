import apiEndpoint from "./api/apiEndpoints"
import { api, TokenApi } from "./api/apiClint"
export const AuthService = {
    login: async (data) => {
        try {
            const res = await api.post(apiEndpoint.Auth.Login, data)
            return res.data
        } catch (err) {

            if (err.response)
                throw err.response.data;
            else
                throw err.message
        }
    },
    studentRegestartion: async (data) => {
        try {
            const res = await api.post(apiEndpoint.Auth.StudentRegestartion, data);
            return res.data;

        }
        catch (err) {

            if (err.response)
                throw err.response.data;
            else
                throw err.message
        }
    },
    doctorRegestartion: async (data) => {
        try {
            const res = await api.post(apiEndpoint.Auth.DoctorRegestartion, data);
            return res.data;
        }
        catch (err) {

            if (err.response)
                throw err.response.data;
            else
                throw err.message
        }
    },
    LogOut: async (RefreshToken) => {
        try {
            const res = await TokenApi.post(apiEndpoint.Auth.Logout(RefreshToken))
            return res.data
        } catch (err) {
            if (err.response)
                throw err.response.data;
            else
                throw err
        }
    },

    ForgotPassword: async (email) => {
        try {
            const res = await api.post(
                apiEndpoint.Auth.ForgotPassword,
                JSON.stringify(email),
                {
                    headers: {
                        "Content-Type": "application/json-patch+json"
                    }
                }
            );
            return res.data;
        }
        catch (err) {
            if (err.response)
                throw err.response.data;
            else
                throw err.message
        }
    },// send Link to email
    ResetPassword: async (data, email) => {
        try {
            console.log(data)
            console.log(email)
            const res = await api.post(apiEndpoint.Auth.ResetPassword(email), data);
            return res.data;
        } catch (err) {
            if (err.response)
                throw err.response.data;
            else
                throw err.message
        }


    },// reset pass after forget it 
    GetUserInfo: async (token) => {
        try {
            const res = await api.get(apiEndpoint.Auth.GetCurrentUserInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return res.data;
        } catch (err) {

            if (err.response)
                throw err.response.data;
            else
                throw err.message
        }
    }
}
export default AuthService;