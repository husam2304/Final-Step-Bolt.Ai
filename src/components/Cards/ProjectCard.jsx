import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProjectCard({
    id,
    ownerName,
    university,
    specialization,
    projectName,
    description,
    semester,
    reminingStudent,
    neededSkills = [],
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hoveredTech, setHoveredTech] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        // Trigger animation when component mounts
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);



    return (
        <div className="card min-w-full">
            <div className="bg-[var(--bg-color)] h-fit text-sm  w-full overflow-hidden max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-4">
                <div
                    className={`
          bg-[var(--bg-color)] rounded-xl shadow-md overflow-hidden
          transform transition-all duration-700 ease-out
          hover:shadow-xl hover:scale-105
          ${isLoaded
                            ? "opacity-100 translate-y-0 rotate-0"
                            : "opacity-0 translate-y-8 -rotate-3"
                        }
        `}
                >
                    <div className="p-4 sm:p-6">
                        {/* Header section with slide-in animation */}
                        <div
                            className={`
            pb-4 transform transition-all duration-500 delay-200
            ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                                }
          `}
                        >
                            <div className="p-4 border-b border-gray-200">

                                <h2 className="text-lg sm:text-xl font-bold text-[var(--text-color)] transition-colors duration-300 hover:text-[var(--primary-color)]">
                                    {ownerName}
                                </h2>
                                <p className="text-sm sm:text-base text-[var(--text-color)] mt-1 leading-relaxed">
                                    {specialization} - {university}
                                </p>
                            </div>
                            <hr className="text-[var(--card-border-color)] mt-3 transition-all duration-300 hover:border-[var(--primary-color)]" />
                        </div>

                        {/* Platform description with fade-in */}
                        <div
                            className={`
            py-3 transform transition-all duration-600 delay-400
            ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }
          `}
                        >
                            <h2 className="text-lg sm:text-xl font-bold text-[var(--primary-color)] mb-3">
                                {projectName}
                            </h2>
                            <p className="text-sm sm:text-base text-[var(--text-color)] leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Requirements with slide animation */}
                        <div
                            className={`
            py-3 flex flex-col sm:flex-row justify-between gap-2 sm:gap-4
            transform transition-all duration-600 delay-500
            ${isLoaded
                                    ? "translate-x-0 opacity-100"
                                    : "-translate-x-4 opacity-0"
                                }
          `}
                        >
                            <h4 className="text-sm sm:text-base text-[var(--text-color)] transition-transform duration-300 hover:scale-105 cursor-default">
                                ⏰ {semester}
                            </h4>
                            <h4 className="text-sm sm:text-base text-[var(--text-color)] transition-transform duration-300 hover:scale-105 cursor-default">
                                👥 يحتاج {reminingStudent} طلاب
                            </h4>
                        </div>

                        {/* Technical requirements with staggered animation */}
                        <div
                            className={`
            py-3 transform transition-all duration-600 delay-600
            ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }
          `}
                        >
                            <h4 className="text-sm sm:text-base text-[var(--text-color)] mb-4">
                                🛠️ المتطلبات الفنية
                            </h4>
                            <div className="flex flex-wrap gap-2 justify-between">
                                {neededSkills?.map((tech, index) => (
                                    <div
                                        key={index}
                                        className={`
                    bg-[var(--card-teq-color)] text-[var(--text-light)] 
                    px-3 py-1 rounded-full text-xs sm:text-sm
                    transform transition-all duration-500 cursor-pointer
                    hover:scale-110 hover:shadow-lg
                    ${isLoaded ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                    ${hoveredTech === index ? "rotate-3" : "rotate-0"}
                  `}
                                        style={{
                                            transitionDelay: isLoaded ?
                                                `${index * 100}ms` : "0ms",
                                        }}
                                        onMouseEnter={() => setHoveredTech(index)}
                                        onMouseLeave={() => setHoveredTech(null)}
                                    >
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Application button with bounce animation */}
                        <div
                            className={`
            pt-4 transform transition-all duration-700 delay-800
            ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                }
          `}
                        >
                            <button
                                className="
              w-full bg-[var(--card-btn-color)] hover:bg-[var(--primary-color)] 
              text-white font-medium py-2 sm:py-3 px-4 rounded-xl 
              transition-all duration-300 ease-out
              transform hover:scale-105 hover:shadow-lg
              active:scale-95
              focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50
              text-sm sm:text-base
            "
                                onClick={() => navigate(`/Projects/${id}`)}
                            >
                                التقديم
                            </button>
                        </div>
                    </div>

                    {/* Subtle pulse animation overlay */}
                    <div
                        className={`
          absolute inset-0 rounded-xl pointer-events-none
          transition-opacity duration-1000
          ${isLoaded ? "opacity-0" : "opacity-100"}
          bg-gradient-to-br from-transparent via-white/5 to-transparent
        `}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;