import StartNow from "../UI/Buttons/StartNow";
import HeroImage from "../../assets/Images/HowToStatImage.png";
import { Search } from "lucide-react";

const HowToStart = () => {
  return (
    <div className="relative">
      {/* Main Content - compact layout */}
      <div className="flex flex-col-reverse lg:flex-row  justify-between  items-center bg-[var(--primary-color)] px-4 sm:px-6 py-6 mx-auto w-[96%] rounded-[20px] mb-8">
        {/* Text Content */}
        <div className="w-full lg:w-[45%] text-center lg:text-right flex flex-col animate-fade-in-up lg:animate-fade-in-left mt-4 lg:mt-0">
          <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-3 text-[var(--text-light)] font-medium leading-tight animate-slide-down">
            كيف ابدأ مشروعي{" "}
          </h1>

          <p className="text-sm sm:text-base md:text-base lg:text-lg mb-4 text-[var(--text-light)] opacity-90 leading-relaxed animate-slide-up animation-delay-300">
            قسم مخصص لمساعدة الطلاب في مشاريع التخرج، يقدّم خطة منهجية واضحة مع
            خطوات عملية منظمة من مرحلة الفكرة حتى الإنجاز، ليكون دليلك خطوة
            بخطوة نحو النجاح.{" "}
          </p>

          <div className="animate-bounce-in animation-delay-600">
            <StartNow
              className="hover:scale-110 active:scale-95 transition-all duration-300 ease-out cursor-pointer shadow-lg hover:shadow-xl"
              Text="ابدأ الآن"
            />
          </div>
        </div>

        {/* Image Container */}
        <div className="w-full lg:w-[50%] mb-4 lg:mb-0 animate-fade-in-up lg:animate-fade-in-right relative">
          <img
            src={HeroImage}
            alt="Team collaboration"
            className="w-full h-auto rounded-[15px] sm:rounded-[20px] shadow-lg transform hover:scale-105 transition-transform duration-500 ease-out float-right"
          />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-slide-down {
          animation: slideDown 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-900 {
          animation-delay: 0.9s;
          opacity: 0;
        }

        @media (max-width: 1024px) {
          .animate-fade-in-left,
          .animate-fade-in-right {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        }
      `}</style>
    </div>
  );
};
export default HowToStart;
