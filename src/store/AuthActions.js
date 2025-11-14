import { AuthService } from "../services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetUser = createAsyncThunk('auth/GetCurrentUserInfo',
    async (token, { rejectWithValue }) => {
        try {
            const userResponse = await AuthService.GetUserInfo(token);
            if (!userResponse) {
                return rejectWithValue("Invalid Data");
            }
            else {
                return userResponse
            }
        } catch (err) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('RefreshToken');
            return rejectWithValue(err.message);
        }
    }
)
export const login = createAsyncThunk('Auth/login',
    async (Data, { rejectWithValue, dispatch }) => {
        try {

            const LoginRes = await AuthService.login(Data);
            if (LoginRes.token) {
                localStorage.setItem("authToken", LoginRes.token)
                localStorage.setItem("RefreshToken", LoginRes.refreshToken)
                const userInfo = await dispatch(GetUser(LoginRes.token));


                return {
                    user: userInfo.payload,
                    token: LoginRes.token
                }
            }
            else
                return rejectWithValue(LoginRes)

        } catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    }
)
export const Regerster = createAsyncThunk('auth/signup',
    async ({ registerData: Data, studentRegister }, { rejectWithValue, dispatch }) => {
        try {
            const formData = new FormData();
            formData.append('Password', Data.Password);
            formData.append('ConfirmPassword', Data.Conformpassword);
            formData.append('PhoneNumber', Data.PhoneNumber);
            formData.append("Email", Data.Email)
            formData.append("FirstName", Data.FirstName)
            formData.append("LastName", Data.LastName)
            if (studentRegister) {

                formData.append("DataBarith", Data.DataBarith)
                let graduationDate = new Date(Data.GraduationYear, Data.Graduationsemester === 1 ? 10 : 2, 1); // JS months are 0-based
                formData.append("GraduationDate", graduationDate.toISOString().split('T')[0]);
            }
            formData.append("Gender", Data.Gender)
            formData.append("Selectmajor", Data.Selectmajor)

            if (studentRegister)
                await AuthService.studentRegestartion(formData);
            else
                await AuthService.doctorRegestartion(formData);
            const loginRes = await dispatch(login({
                Email: Data.Email,
                Password: Data.Password,
            }));
            return loginRes.payload;

        } catch (err) {
            return rejectWithValue(err || 'حدث خطأ في الاتصال بالخادم');
        }
    });
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const refreshToken = localStorage.getItem("RefreshToken");
        if (refreshToken) {
            await AuthService.LogOut(refreshToken);
            localStorage.removeItem('authToken');
            localStorage.removeItem('RefreshToken');
        }
    }
    catch (error) {
        console.log(error.message)
        localStorage.removeItem('authToken');
        localStorage.removeItem('RefreshToken');
        return rejectWithValue(error.message);
    } finally {
        localStorage.removeItem('authToken');
        localStorage.removeItem('RefreshToken');
    }

    return rejectWithValue(null);
})
