import "./App.css";
import AppRoute from "./routes/routers/AppRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastProvider from "./components/ToastProvider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./store/Themestore";
import { GetUser } from "./store/AuthActions";
function App() {
  const queryClient = new QueryClient();
  const token = useSelector((state) => state?.auth?.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        await dispatch(GetUser(token));
      }
    };

    fetchUser();
  }, [token, dispatch]);
  useEffect(() => {
    const getInitialTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return savedTheme || (systemPrefersDark ? "dark" : "light");
    };
    const initTheme = getInitialTheme();
    dispatch(setTheme(initTheme));
  }, [dispatch]);
  return (
    <>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoute />
        </QueryClientProvider>
      </ToastProvider>
    </>
  );
}

export default App;
