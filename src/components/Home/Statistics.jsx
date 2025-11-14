import { useEffect, useRef, useState } from "react";

const StatisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Stats data
  const stats = [
    { id: 1, value: 16, suffix: "+", label: "معهد" },
    { id: 2, value: 50, suffix: "+", label: "دكتور مشارك" },
    { id: 3, value: 100, suffix: "+", label: "مشروع مكتمل" },
    { id: 4, value: 250, suffix: "+", label: "طالب نشط" },
  ];

  // Set up intersection observer to trigger animation when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-[var(--bg-color)] py-16 ">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Individual statistic card component
const StatCard = ({ stat, isVisible }) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // Animation duration in ms
  const frameRate = 30; // Frames per second
  const totalFrames = Math.round(duration / (1000 / frameRate));
  const increment = stat.value / totalFrames;

  useEffect(() => {
    if (!isVisible) return;

    let currentCount = 0;
    let frame = 0;

    const counter = setInterval(() => {
      frame += 1;
      currentCount = Math.min(stat.value, Math.round(increment * frame));
      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, 1000 / frameRate);

    return () => clearInterval(counter);
  }, [isVisible, stat.value, increment, totalFrames]);

  return (
    <div className="text-center p-6 bg-[var(--primary-color)] rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105">
      <div className="text-3xl md:text-4xl font-bold text-[var(--text-light)]">
        {count}
        {stat.suffix}
      </div>
      <div className="mt-2 text-lg text-[var(--text-light)]">{stat.label}</div>
    </div>
  );
};

export default StatisticsSection;
