// features/theme/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: localStorage.getItem('theme') || "light"
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
            // Update DOM and localStorage
            document.documentElement.setAttribute('data-theme', action.payload);
            localStorage.setItem('theme', action.payload);
        },
        toggleTheme: (state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            state.theme = newTheme;
            // Update DOM and localStorage
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }
    }
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
