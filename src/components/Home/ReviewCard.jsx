import { useEffect, useState } from "react";

export function ReviewCard({ review }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`group rounded-xl shadow-md overflow-hidden border-[var(--card-border-color)] bg-[var(--bg-light)] 
                   transition-all duration-500 ease-out
                   hover:shadow-xl hover:scale-105 hover:-translate-y-2
                   hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-b hover:before:from-white/10 hover:before:to-transparent hover:before:rounded-xl
                   ${
                     isVisible
                       ? "opacity-100 translate-y-0"
                       : "opacity-0 translate-y-8"
                   }`}
    >
      <div className="p-6 relative">
        {/* Shine effect on hover */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div
            className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                              group-hover:animate-shine group-hover:duration-1000"
          />
        </div>

        {/* Header section */}
        <div className="pb-4 relative z-10">
          <h2 className="text-xl font-bold text-[var(--text-dark)] group-hover:text-[var(--primary-color)] transition-colors duration-500">
            {review.name}
          </h2>
          <p className="text-[var(--text-dark)] mt-1 group-hover:text-[var(--primary-color)] transition-colors duration-500">
            {review.university}
          </p>
          <hr className="border-[var(--border-color)] mt-3 group-hover:border-[var(--primary-color)] transition-colors duration-500" />
        </div>

        {/* Rating content */}
        <div className="py-4 relative z-10">
          <p className="text-[var(--text-dark)] group-hover:text-[var(--text-dark)] transition-colors duration-500">
            "{review.comment}"
          </p>
        </div>

        {/* Rating stars */}
        <div className="py-4 flex items-center relative z-10">
          <div className="flex text-yellow-400 group-hover:scale-110 transition-transform duration-500">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating ? "fill-current" : "text-gray-300"
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="text-[var(--text-dark)] mr-2 group-hover:text-[var(--primary-color)] transition-colors duration-500">
            {review.rating}.0
          </span>
        </div>

        {/* Date */}
        <div className="pt-4 text-sm text-[var(--text-dark)] opacity-75 group-hover:opacity-100 group-hover:text-[var(--primary-color)] transition-all duration-500">
          تمت المراجعة في {review.date}
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) rotate(45deg);
          }
        }
        .animate-shine {
          animation: shine 1.5s ease-out;
        }

        /* Entrance animation */
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

        .animate-entrance {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default ReviewCard;
