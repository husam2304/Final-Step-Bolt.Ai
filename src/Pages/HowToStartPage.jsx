import React, { useEffect, useState, useRef } from "react";
import steps from "../utils/StepsSectionInfo";
import roadmapSteps from "../utils/RoadmapSectionInfo";
import toolCategories from "../utils/AIToolsSectionInfo";
// Custom Hook for Scroll Animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

const HowToStartPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-color)] overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection isVisible={isVisible} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Pre-Project Section */}
        <PreProjectSection />

        {/* Steps Section */}
        <StepsSection />

        {/* Roadmap Section */}
        <RoadmapSection />

        {/* AI Tools Section */}
        <AIToolsSection />
      </div>
    </div>
  );
};

// Hero Section Component
const HeroSection = ({ isVisible }) => {
  return (
    <section
      className="bg-[var(--primary-color)] text-[var(--text-light)] py-16 lg:py-24 px-4 transition-all duration-1000"
      style={{
        background: "var(--btn-primary-hover) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h1
          className={`text-4xl lg:text-6xl xl:text-7xl text-[var(--text-light)] font-bold mb-6 leading-tight ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          دليل مشروع التخرج الشامل
        </h1>
        <p
          className={`text-xl lg:text-3xl text-[var(--text-light)] mb-8 max-w-4xl mx-auto leading-relaxed ${
            isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"
          }`}
        >
          كل ما تحتاجه للإعداد، التخطيط، وتوثيق مشروعك بنجاح
        </p>

        <div
          className={`flex flex-col lg:flex-row gap-6 justify-center items-center mt-12 ${
            isVisible ? "animate-fade-in-up animation-delay-600" : "opacity-0"
          }`}
        >
          <div className="bg-[var(--bg-color)] rounded-3xl p-6 lg:p-8 shadow-[var(--btn-shadow-hover)] w-full lg:w-96 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-[var(--btn-shadow-hover)] cursor-pointer border border-[var(--card-border-color)]">
            <h3 className="text-[var(--primary-color)] text-2xl lg:text-3xl font-semibold">
              دليل الاعداد
            </h3>
          </div>
          <div className="bg-[var(--bg-color)] rounded-3xl p-6 lg:p-8 shadow-[var(--btn-shadow-hover)] w-full lg:w-auto text-center transform transition-all duration-300 hover:scale-105 hover:shadow-[var(--btn-shadow-hover)] cursor-pointer border border-[var(--card-border-color)]">
            <h3 className="text-[var(--primary-color)] text-2xl lg:text-3xl font-semibold">
              أدوات الذكاء الاصطناعي
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

// Pre-Project Section Component
const PreProjectSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 lg:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`text-3xl lg:text-5xl font-bold text-[var(--text-color)] mb-6 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          ما يجب فعله قبل بدء مشروعك
        </h2>
        <div
          className={`w-24 h-1 bg-[var(--primary-color)] mx-auto mb-8 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
        ></div>
        <p
          className={`text-lg lg:text-xl text-[var(--text-color)] leading-relaxed ${
            isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"
          }`}
        >
          الإعداد الجيد يمنع الأداء الضعيف. اتبع هذه الخطوات الأساسية قبل البدء
          في البرمجة.
        </p>
      </div>
    </section>
  );
};

// Steps Section Component
const StepsSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {steps.map((step, index) => (
          <StepCard key={step.number} step={step} index={index} />
        ))}
      </div>
    </section>
  );
};

// Step Card Component
const StepCard = ({ step, index }) => {
  const [ref, isVisible] = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`mb-16 lg:mb-24 transform transition-all duration-500 hover:scale-[1.02] ${
        index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
      } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="rounded-3xl p-6 lg:p-8 shadow-[var(--btn-shadow-hover)] border border-[var(--border-color)]"
        style={{
          background:
            "linear-gradient(135deg, var(--card-bg) 0%, var(--bg-light) 100%)",
        }}
      >
        {/* Step Header */}
        <div className="flex items-center gap-6 mb-8">
          <div
            className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center shadow-[var(--btn-shadow)] transform transition-all duration-300 ${
              isHovered ? "scale-110 rotate-12" : ""
            }`}
            style={{
              background:
                "linear-gradient(135deg, var(--primary-color) 0%, var(--btn-primary-hover) 100%)",
            }}
          >
            <span className="text-[var(--text-light)] text-3xl lg:text-4xl font-bold">
              {step.number}
            </span>
          </div>
          <div className="flex-1">
            <h3
              className="text-2xl lg:text-4xl font-bold mb-3"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-color) 0%, var(--btn-primary-hover) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {step.title}
            </h3>
            <p className="text-[var(--text-color)] text-lg leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div className="mb-8">
          <h4 className="text-xl lg:text-2xl font-bold text-[var(--primary-color)] mb-6">
            قائمة المراجعة:
          </h4>
          <div className="grid gap-4">
            {step.checklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl shadow-[var(--btn-shadow)] border border-[var(--border-color)] transform transition-all duration-300 hover:shadow-[var(--btn-shadow-hover)] hover:border-[var(--primary-color)]"
                style={{ backgroundColor: "var(--bg-color)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--primary-color--overlay)" }}
                >
                  <span className="text-[var(--primary-color)] text-lg font-bold">
                    ✓
                  </span>
                </div>
                <span className="text-[var(--text-color)] text-lg font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div
          className="rounded-2xl p-6 border"
          style={{
            background:
              "linear-gradient(135deg, var(--primary-color--overlay) 0%, var(--hover-bg) 100%)",
            borderColor: "var(--card-border-color)",
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-[var(--btn-shadow)]"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              <span className="text-[var(--text-light)] text-xl font-bold">
                🔗
              </span>
            </div>
            <h4 className="text-xl lg:text-2xl font-bold text-[var(--primary-color)]">
              المصادر:
            </h4>
          </div>
          <div className="flex flex-wrap gap-4">
            {step.resources.map((resource, idx) => (
              <a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl px-5 py-3 shadow-[var(--btn-shadow)] border transform transition-all duration-300 hover:shadow-[var(--btn-shadow-hover)] hover:scale-105"
                style={{
                  backgroundColor: "var(--bg-color)",
                  borderColor: "var(--card-border-color)",
                }}
              >
                <span className="text-[var(--primary-color)] font-semibold text-lg">
                  {resource.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Roadmap Section Component
const RoadmapSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-16 lg:py-24"
      style={{
        background:
          "linear-gradient(135deg, var(--bg-light) 0%, var(--card-bg) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl lg:text-5xl font-bold text-[var(--text-color)] mb-6 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            خارطة طريق تطوير المشروع
          </h2>
          <div
            className={`w-24 h-1 bg-[var(--primary-color)] mx-auto mb-8 ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roadmapSteps.map((step, index) => (
            <RoadmapStepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Roadmap Step Card Component
const RoadmapStepCard = ({ step, index }) => {
  const [ref, isVisible] = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`group ${
        isVisible
          ? `animate-fade-in-up animation-delay-${(index % 6) * 100}`
          : "opacity-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`rounded-2xl p-6 shadow-[var(--btn-shadow)] border transform transition-all duration-500 hover:shadow-[var(--btn-shadow-hover)] hover:scale-105 h-full flex flex-col ${
          isHovered
            ? "border-[var(--primary-color)]"
            : "border-[var(--border-color)]"
        }`}
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[var(--btn-shadow)] transform transition-transform duration-300 ${
              isHovered ? "scale-110 rotate-12" : ""
            }`}
            style={{
              background:
                "linear-gradient(135deg, var(--primary-color) 0%, var(--btn-primary-hover) 100%)",
            }}
          >
            <span className="text-[var(--text-light)] font-bold text-xl">
              {step.number}
            </span>
          </div>
          <h3
            className="text-xl font-bold transition-colors duration-300"
            style={{
              color: isHovered
                ? "var(--btn-primary-hover)"
                : "var(--primary-color)",
            }}
          >
            {step.title}
          </h3>
        </div>

        <p className="text-[var(--text-color)] mb-6 text-sm leading-relaxed flex-grow">
          {step.description}
        </p>

        <div className="space-y-3 mb-6">
          {step.tasks.map((task, taskIndex) => (
            <div key={taskIndex} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 transition-colors duration-300"
                style={{
                  backgroundColor: isHovered
                    ? "var(--btn-primary-hover)"
                    : "var(--primary-color)",
                }}
              ></div>
              <span className="text-[var(--text-color)] text-sm">{task}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {step.tools.map((tool, toolIndex) => (
            <a
              key={toolIndex}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-full text-xs font-medium transform transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "var(--primary-color--overlay)",
                color: "var(--primary-color)",
              }}
            >
              {tool.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// AI Tools Section Component
const AIToolsSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl lg:text-5xl font-bold text-[var(--text-color)] mb-6 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            أدوات الذكاء الاصطناعي المساعدة في رحلة مشروع التخرج
          </h2>
          <div
            className={`w-24 h-1 bg-[var(--primary-color)] mx-auto ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
          ></div>
        </div>

        {toolCategories.map((category, index) => (
          <div key={index} className="mb-16">
            <h3
              className={`text-2xl lg:text-3xl font-bold text-[var(--primary-color)] mb-10 text-center ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {category.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool, toolIndex) => (
                <AIToolCard key={toolIndex} tool={tool} index={toolIndex} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// AI Tool Card Component
const AIToolCard = ({ tool, index }) => {
  const [ref, isVisible] = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`group ${
        isVisible
          ? `animate-fade-in-up animation-delay-${(index % 6) * 100}`
          : "opacity-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`rounded-2xl p-6 shadow-[var(--btn-shadow)] border transform transition-all duration-500 hover:shadow-[var(--btn-shadow-hover)] hover:scale-105 h-full flex flex-col ${
          isHovered
            ? "border-[var(--primary-color)]"
            : "border-[var(--card-border-color)]"
        }`}
        style={{
          background:
            "linear-gradient(135deg, var(--primary-color--overlay) 0%, var(--hover-bg) 100%)",
        }}
      >
        <h4
          className="text-xl font-bold mb-3 transition-colors duration-300"
          style={{
            color: isHovered
              ? "var(--btn-primary-hover)"
              : "var(--primary-color)",
          }}
        >
          {tool.name}
        </h4>
        <p className="text-[var(--text-color)] text-sm leading-relaxed mb-4 flex-grow">
          {tool.description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span
            className="text-xs px-3 py-1 rounded-full border"
            style={{
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
              borderColor: "var(--border-color)",
            }}
          >
            {tool.pricing}
          </span>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-semibold transform transition-all duration-300 hover:scale-105 shadow-[var(--btn-shadow)] hover:shadow-[var(--btn-shadow-hover)]"
            style={{
              backgroundColor: "var(--btn-primary-bg)",
              color: "var(--btn-primary-text)",
            }}
          >
            {tool.link}
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowToStartPage;
