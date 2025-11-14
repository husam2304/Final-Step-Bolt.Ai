import React, { useEffect, useState } from "react";

const ProfileCard = ({ name, university, specialization, description, semester, skills }) => {
    const [hoveredTech, setHoveredTech] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

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
                                    {name}</h2>
                                <p className="text-sm sm:text-base text-[var(--text-color)] mt-1 leading-relaxed">
                                    {university}</p>
                            </div>
                        </div>
                        {/* التخصص */}
                        <div className="p-3 ">
                            <h2 className="text-lg sm:text-xl font-bold text-[var(--primary-color)] mb-3">
                                {specialization}</h2>
                            <p className="text-sm sm:text-base text-[var(--text-color)] leading-relaxed">
                                {description}</p>
                        </div>
                        {/* الفصل الدراسي */}
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
                        </div>

                        {/* المهارات */}
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

                                {skills?.map((tech, index) => (
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
                                            transitionDelay:
                                                `${index * 100}ms`
                                        }}
                                        onMouseEnter={() => setHoveredTech(index)}
                                        onMouseLeave={() => setHoveredTech(null)}
                                    >
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* زر التواصل */}
                    <div className="p-4 border-t border-gray-200">
                        <button className="w-full py-2 rounded-xl border border-[var(--primary-color)] text-[var(--primary-color)] font-medium hover:bg-[var(--primary-color)] hover:text-[var(--text-color)] transition">
                            تواصل معه
                        </button>
                    </div>
                </div>
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
    );
};

export default ProfileCard;
