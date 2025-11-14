// Layouts
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";

// Theme & Controls
import ThemeToggle from "../../components/ThemeToggle";

// Buttons
import StartNow from "../../components/UI/Buttons/StartNow";
import RemoveMemberButton from "../../components/UI/Buttons/RemoveMemberButton";
import LeaveTeamButton from "../../components/UI/Buttons/LeaveTeamButton";
import DeleteProjectButton from "../../components/UI/Buttons/DeleteProjectButton";
import UpdateProjectButton from "../../components/UI/Buttons/UpdateProjectButton";
import SearchButton from "../../components/UI/Buttons/SearchButton";
import CreateProjectButton from "../../components/UI/Buttons/CreateProjectButton";
import ChatButton from "../../components/UI/Buttons/ChatButton";
import InviteStudentButton from "../../components/UI/Buttons/InviteStudentButton";
import RequestSupervisionButton from "../../components/UI/Buttons/RequestSupervisionButton";

// Home Sections
import HeroSection from "../../components/Home/HeroSection";
import HowToStart from "../../components/Home/HowToStart";
import Statistics from "../../components/Home/statistics";
import RatingSection from "../../components/Home/RatingSection";

// Common
import CardsView from "../../components/common/CardsView";
export const TestComponentPage = () => {
  const demoProjects = [
    {
      OwnerName: "أحمد عبد الله",
      university: "الجامعة الأردنية",
      specialization: "علوم الحاسوب",
      projectName: "منصة للتعلم الذكي",
      projectDesc:
        "منصة تعليمية تستخدم الذكاء الاصطناعي لتقديم محتوى تعليمي مخصص لكل طالب بناءً على مستوى فهمه.",
      semester: "الفصل الاول",
      teamSize: 3,
      neededSkills: ["Python", "Machine Learning", "Django", "React"],
    },
    {
      OwnerName: "أحمد عبد الله",
      university: "الجامعة الأردنية",
      specialization: "علوم الحاسوب",
      projectName: "منصة للتعلم الذكي",
      projectDesc:
        "منصة تعليمية تستخدم الذكاء الاصطناعي لتقديم محتوى تعليمي مخصص لكل طالب بناءً على مستوى فهمه.",
      semester: "الفصل الاول",
      teamSize: 3,
      neededSkills: ["Python", "Machine Learning", "Django", "React"],
    },
    {
      OwnerName: "أحمد عبد الله",
      university: "الجامعة الأردنية",
      specialization: "علوم الحاسوب",
      projectName: "منصة للتعلم الذكي",
      projectDesc:
        "منصة تعليمية تستخدم الذكاء الاصطناعي لتقديم محتوى تعليمي مخصص لكل طالب بناءً على مستوى فهمه.",
      semester: "الفصل الاول",
      teamSize: 3,
      neededSkills: ["Python", "Machine Learning", "Django", "React"],
    },
  ];

  return (
    <>
      {/* Header & Theme */}
      <Header />
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>

      {/* Control Buttons */}
      <section className="flex flex-wrap gap-3 p-6">
        <SearchButton />
        <CreateProjectButton />
        <ChatButton />
        <InviteStudentButton />
        <RequestSupervisionButton />
        <UpdateProjectButton />
        <DeleteProjectButton />
        <LeaveTeamButton />
        <RemoveMemberButton />
      </section>
      <section className="my-10">
        <HeroSection />
      </section>

      {/* Projects */}
      <section className="my-10 px-6">
        <CardsView Type="Projects" Cards={demoProjects} />
      </section>

      {/* Guide & Statistics */}
      <section className="my-16">
        <HowToStart />
      </section>

      <section className="my-16">
        <Statistics />
      </section>

      {/* Ratings */}
      <section className="my-16">
        <RatingSection />
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default TestComponentPage;
