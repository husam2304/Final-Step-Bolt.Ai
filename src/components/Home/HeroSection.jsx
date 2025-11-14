import StartNow from "../UI/Buttons/StartNow";
import HeroImage from "../../assets/Images/HeroImage.png";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative">
      {/* Main Hero Content - flex-col-reverse for mobile, flex-row for desktop */}
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center min-h-screen bg-[var(--primary-color)] px-4 sm:px-6 lg:px-8 py-6 mx-auto  mt-4 sm:mt-6 lg:mt-10 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] mb-16">
        {/* Text Content - Bottom on mobile, Left on desktop */}
        <div className="w-full lg:w-[40%] text-center lg:text-right flex flex-col animate-fade-in-up lg:animate-fade-in-left mt-4 lg:mt-0 md:mt-9">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-6 text-[var(--text-light)] font-medium leading-tight animate-slide-down">
            ابدأ مشروعك مع زملائك بسهولة
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-8 text-[var(--text-light)] opacity-90 leading-relaxed animate-slide-up animation-delay-300">
            اكتشف مشاريع جديدة، تعاون مع طلاب آخرين، وابنِ خبراتك العملية
          </p>

          <div className="animate-bounce-in animation-delay-600">
            <StartNow
              className="hover:scale-110 active:scale-95 transition-all duration-300 ease-out cursor-pointer shadow-lg hover:shadow-xl"
              Text="إبدأ الآن"
            />
          </div>
        </div>

        {/* Image Container - Top on mobile, Right on desktop */}
        <div className="w-full lg:w-[56%] mb-4 lg:mb-0 animate-fade-in-up lg:animate-fade-in-right md:mr-14">
          <img
            src={HeroImage}
            alt="Team collaboration"
            className="w-full h-auto rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-lg transform hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
      </div>

      {/* Search Bar - Centered at the bottom of the hero */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[90%] sm:w-[85%] lg:w-[80%] max-w-3xl p-2 animate-slide-up animation-delay-900">
        <div className="bg-[var(--bg-color)] p-1 sm:p-2 rounded-xl sm:rounded-2xl flex items-center justify-between shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-shadow duration-300">
          <input
            type="text"
            placeholder="إبحث عن مشروع و دكتور وطالب ......"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg border-none outline-none text-right placeholder-gray-400 bg-transparent rounded-xl sm:rounded-2xl focus:placeholder-gray-300 transition-colors duration-300"
          />
          <button className="bg-[#0F9AFF] text-[var(--text-light)] rounded-lg sm:rounded-xl ml-2 sm:ml-3 p-2 sm:p-3 hover:bg-opacity-90 hover:scale-110 active:scale-95 transition-all duration-300 ease-out group">
            <Search
              size={20}
              className="sm:w-6 sm:h-6 text-[var(--text-light)]  group-hover:rotate-12 transition-transform duration-300"
            />
          </button>
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

export default HeroSection;
