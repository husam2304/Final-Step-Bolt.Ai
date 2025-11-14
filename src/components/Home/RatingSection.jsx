import { useRef } from "react";
import ReviewCard from "./ReviewCard";

function RatingSection() {
  const sectionRef = useRef(null);
  const reviews = [
    {
      id: 1,
      name: "فاطمة أحمد",
      university: "الجامعة الأدبية - علوم الحاسوب",
      comment:
        "لصنحة وقرت على وقت وجود خبير. قدرت ألهي فريق لصفاوي التخرج بسرعة وبطريقة منظمة.",
      rating: 5,
      date: "15 مارس 2024",
    },
    {
      id: 2,
      name: "محمد السعيد",
      university: "جامعة التقنية - هندسة البرمجيات",
      comment: "تجربة رائعة، ساعدتني في تنظيم مشروع التخرج بشكل احترافي.",
      rating: 4,
      date: "10 مارس 2024",
    },
    {
      id: 3,
      name: "سارة عبدالله",
      university: "كلية العلوم - الذكاء الاصطناعي",
      comment: "المنصة وفرت لي كل ما أحتاجه لإكمال مشروعي في الوقت المحدد.",
      rating: 5,
      date: "8 مارس 2024",
    },
    {
      id: 4,
      name: "سارة عبدالله",
      university: "كلية العلوم - الذكاء الاصطناعي",
      comment: "المنصة وفرت لي كل ما أحتاجه لإكمال مشروعي في الوقت المحدد.",
      rating: 5,
      date: "8 مارس 2024",
    },
  ];

  return (
    <div ref={sectionRef} className="w-full bg-[var(--bg-color)] py-12 px-4">
      <div className="max-w-full mx-auto">
        <h2
          className={`text-2xl font-bold text-[var(--text-dark)] text-center mb-8 transition-all duration-1000 ease-out ${"animate-entrance"}`}
        >
          رأي المستخدمين
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((reviews) => (
            <ReviewCard key={reviews.id} review={reviews} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RatingSection;
