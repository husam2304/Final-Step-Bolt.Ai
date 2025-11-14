import React, { useState, useRef, useEffect } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProfileCard from "../Cards/ProfileCard";
import ProjectCard from "../Cards/ProjectCard";

function CardsView({ Cards, Type, Loading, Error }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const carouselRef = useRef(null);

    const cardsPerView = 3;
    const totalSlides = Math.ceil(Cards?.length / cardsPerView);

    // Handle touch start
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    // Handle touch move
    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    // Handle touch end - determine swipe direction
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        // مقلوبة عشان RTL
        if (isLeftSwipe && currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
        if (isRightSwipe && currentIndex < totalSlides - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    // Navigation functions (مقلوبة لـ RTL)
    const goToNext = () => {
        setCurrentIndex(prev => (prev < totalSlides - 1 ? prev + 1 : prev));
    };

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
    };

    // Auto-scroll on arrow keys (مقلوبة)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') goToNext();     // بالعكس
            if (e.key === 'ArrowRight') goToPrevious();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const renderCard = (cardData, index) => {
        if (Type === "Profiles") {
            return (
                <div key={index} className="flex-shrink-0 w-full">
                    <ProfileCard
                        name={cardData.fullName}
                        university={cardData.university}
                        specialization={cardData.selectMajor}
                        description={cardData.description}
                        semester={cardData.gradutionSemester}
                        skills={cardData.skills}
                    />
                </div>
            );
        }

        if (Type === "Projects") {
            return (
                <div key={index} className="flex-shrink-0 w-full">

                    <ProjectCard
                        id={cardData.id}
                        ownerName={cardData.managerName}
                        university={cardData.university}
                        specialization={cardData.AcademicTrack}
                        projectName={cardData.title}
                        description={cardData.shortDescription}
                        semester={cardData.semester}
                        neededSkills={cardData.technologyIds}
                        reminingStudent={cardData.numberOfUsers}
                    />
                </div>
            );
        }

        return null;
    };

    if (!Cards || Cards?.length === 0) {
        return (
            <div className="flex items-center justify-center p-12">
                <p className="text-gray-500 text-lg">لا يوجد بيانات</p>
            </div>
        );
    }

    return (
        <div className="relative w-full  p-6 bg-[var(--primary-color--overlay)]">
            {/* Main Carousel Container */}
            <div className="relative overflow-hidden">
                <div
                    ref={carouselRef}
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(${currentIndex * 100}%)`,
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Slide Groups */}
                    {Loading ? (
                        <div className="p-4 text-center text-[var(--primary-color)] font-medium animate-pulse">
                            جاري تحميل البيانات...
                        </div>
                    ) : Error ? (
                        <div className="p-4 text-center text-[var(--danger-color)] font-medium">
                            حدث خطأ ما أثناء تحميل البيانات
                        </div>
                    ) : (<>
                        {
                            Array.from({ length: totalSlides }).map((_, slideIndex) => {
                                const slideCards = Cards.slice(
                                    slideIndex * cardsPerView,
                                    (slideIndex + 1) * cardsPerView
                                );

                                return (
                                    <div key={slideIndex} className="flex-shrink-0 w-full h-fit p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-items-center">
                                            {slideCards.map((card, cardIndex) => (
                                                <div key={cardIndex} className="transform hover:scale-105 transition-transform duration-300 w-full">
                                                    {renderCard(card, cardIndex)}
                                                </div>
                                            ))}

                                            {/* Fill empty slots if less than 3 cards */}
                                            {slideCards.length < cardsPerView &&
                                                Array.from({ length: cardsPerView - slideCards.length }).map((_, emptyIndex) => (
                                                    <div key={`empty-${emptyIndex}`} className="invisible">
                                                        <div className="h-64"></div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </>
                    )}

                </div>
            </div>

            {/* Navigation Buttons */}
            {Loading ? (null) : Error ? (null) : (<>
                {totalSlides > 1 && (
                    <>
                        <button
                            onClick={goToNext}
                            disabled={currentIndex === totalSlides - 1}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full shadow-lg transition-all duration-300 ${currentIndex === totalSlides - 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-[var(--primary-color)] text-gray-700 hover:bg-[var(--primary-color-hover)] hover:shadow-xl transform hover:scale-110'
                                }`}
                            aria-label="Next slide"
                        >
                            <ChevronLeftIcon />
                        </button>

                        <button
                            onClick={goToPrevious}
                            disabled={currentIndex === 0}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full shadow-lg transition-all duration-300 ${currentIndex === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-[var(--primary-color)] text-gray-700 hover:bg-[var(--primary-color-hover)] hover:shadow-xl transform hover:scale-110'
                                }`}
                            aria-label="Previous slide"
                        >
                            <ChevronRightIcon />
                        </button>
                    </>
                )}

                {totalSlides > 1 && (
                    <div className="flex justify-center space-x-2 mt-8">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-5 h-5 rounded-full mx-2 transition-all duration-300 ${index === currentIndex
                                    ? 'bg-[var(--primary-color)] scale-125'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Slide Counter */}
                {totalSlides > 1 && (
                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-500">
                            {currentIndex + 1} من {totalSlides}
                        </span>
                    </div>
                )}
            </>)}

        </div>
    );
}

export default CardsView;
