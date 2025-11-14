import ThemeToggle from "../../components/ThemeToggle";
import SearchButton from "../../components/UI/Buttons/SearchButton";
import CreateProjectButton from "../../components/UI/Buttons/CreateProjectButton";
import UpdateProjectButton from "../../components/UI/Buttons/UpdateProjectButton";
import DeleteProjectButton from "../../components/UI/Buttons/DeleteProjectButton";
import LeaveTeamButton from "../../components/UI/Buttons/LeaveTeamButton";
import RemoveMemberButton from "../../components/UI/Buttons/RemoveMemberButton";
import StartNow from "../../components/UI/Buttons/StartNow";
import HeroSection from "../../components/Home/HeroSection";
import { ProjectService, StudentService } from "../../services";
import { useQuery } from "@tanstack/react-query";
import HowToStart from "../../components/Home/HowToStart";
import RatingSection from "../../components/Home/RatingSection";
import CardsView from "../../components/common/CardsView";
import StatisticsSection from "../../components/Home/statistics";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export const HomePage = () => {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);


  const {
    data: DoctorProjects,
    isLoading: DoctorLoading,
    isError: DError,
  } = useQuery({
    queryKey: ["DoctorProjects"],
    queryFn: () => ProjectService.getAllDoctorsProject(),
  });
  const {
    data: StudentProjects,
    isLoading: StudentProjectsLoading,
    isError: SPError,
  } = useQuery({
    queryKey: ["StudentProjects"],
    queryFn: () => ProjectService.getAllStudentsProjects(),
  });
  const {
    data: StudentSearchProject,
    isLoading: StudentLoading,
    isError: SSError,
  } = useQuery({
    queryKey: ["StudentSearchProject"],
    queryFn: () => StudentService.getStudentSearchProject(),
  });

  useEffect(() => {
    if (location.state?.showWelcome) {
      setShowPopup(true);
      // Clear the state so the popup doesn't show again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-[var(--overlay-color)] z-50 animate-fadeIn">
          <div className="bg-[var(--bg-color)] rounded-xl shadow-2xl p-8 max-w-md w-full text-center relative animate-scaleUp">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>

            {/* Welcome Content */}
            <h2 className="text-2xl font-extrabold text-[var(--primary-color)] mb-3">
              مرحبا بك في منصة الخطوة الأخيرة 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              قم بإيجاد فريقك واختر مشرفك جيدًا لتبدأ مشروعك بنجاح.
            </p>

            {/* Action Button */}
            <button
              className="px-6 py-2 bg-[var(--primary-color)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--primary-color-hover)] transition-colors"
              onClick={() => setShowPopup(false)}
            >
              لنبدأ الآن
            </button>
          </div>
        </div>
      )}

      <div className="">
        <HeroSection />
        <div className="my-10">
          <div className="flex flex-col w-full items-center my-5">
            <h2 className="text-2xl w-fit  font-bold text-center mt-10 mb-6 relative inline-block">
              المشاريع المعروضة
              <span className=" absolute left-0 -bottom-5 w-full h-1 bg-[var(--primary-color)] rounded"></span>
            </h2>
          </div>
          {/* عرض الكروت */}
          <CardsView
            Type="Projects"
            Cards={StudentProjects}
            isError={SPError}
            isLoading={StudentProjectsLoading}
          />
        </div>
        <div className="my-10">
          <div className="flex flex-col w-full items-center my-5">
            <h2 className="text-2xl w-fit  font-bold text-center mt-10 mb-6 relative inline-block">
              مشاريع مطروحة من قبل الدكتور
              <span className=" absolute left-0 -bottom-5 w-full h-1 bg-[var(--primary-color)] rounded"></span>
            </h2>
          </div>
          {/* عرض الكروت */}
          <CardsView
            Type="Projects"
            Cards={DoctorProjects}
            isError={DError}
            isLoading={DoctorLoading}
          />
        </div>
        <div className="my-10">
          <div className="flex flex-col w-full items-center my-5">
            <h2 className="text-2xl w-fit  font-bold text-center mt-10 mb-6 relative inline-block">
              طلاب يبحثون عن مشروع
              <span className=" absolute left-0 -bottom-5 w-full h-1 bg-[var(--primary-color)] rounded"></span>
            </h2>
          </div>
          {/* عرض الكروت */}
          <CardsView
            Type="Profiles"
            Cards={StudentSearchProject}
            isError={SSError}
            isLoading={StudentLoading}
          />
        </div>

        <HowToStart />
        <StatisticsSection />
        <RatingSection />
      </div>

    </>
  );
};

export default HomePage;
