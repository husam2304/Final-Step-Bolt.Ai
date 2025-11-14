import React, { useState } from "react";
import SectionCard from "../../shared/SectionCard";
import {
  Star,
  StarBorder,
  StarHalf,
  Person,
  CalendarToday,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";

const DoctorRatingSection = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Mock data - replace with actual API data
  const ratingData = {
    averageRating: 4.7,
    totalReviews: 24,
    ratingDistribution: {
      5: 15,
      4: 6,
      3: 2,
      2: 1,
      1: 0,
    },
    reviews: [
      {
        id: 1,
        studentName: "أحمد محمد",
        studentId: "202110001",
        rating: 5,
        comment:
          "دكتور رائع ومتعاون جداً، ساعدني في مشروعي بشكل كبير وكان دائماً متاح للإجابة على استفساراتي",
        date: "2024-01-15",
        likes: 8,
        dislikes: 0,
      },
      {
        id: 2,
        studentName: "فاطمة عبدالله",
        studentId: "202110045",
        rating: 4,
        comment: "مشرف ممتاز ولكن يحتاج إلى مزيد من المرونة في المواعيد",
        date: "2024-01-10",
        likes: 5,
        dislikes: 1,
      },
      {
        id: 3,
        studentName: "خالد سعيد",
        studentId: "202095023",
        rating: 5,
        comment:
          "أفضل مشرف تعاملت معه، يقدم نصائح قيمة ويوجه الطلاب بشكل احترافي",
        date: "2024-01-08",
        likes: 12,
        dislikes: 0,
      },
      {
        id: 4,
        studentName: "سارة أحمد",
        studentId: "202110078",
        rating: 4,
        comment:
          "دكتور متميز في مجاله، لكن يحتاج إلى تحسين في التواصل خارج أوقات العمل",
        date: "2024-01-05",
        likes: 3,
        dislikes: 2,
      },
    ],
  };

  // Calculate rating percentages
  const calculatePercentage = (count) => {
    return (count / ratingData.totalReviews) * 100;
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="text-yellow-500" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="text-yellow-500" />);
      } else {
        stars.push(<StarBorder key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  // Display reviews (all or limited)
  const displayedReviews = showAllReviews
    ? ratingData.reviews
    : ratingData.reviews.slice(0, 2);

  return (
    <SectionCard
      title="تقييم الدكتور"
      icon={<Star sx={{ color: "var(--primary-color)" }} />}
    >
      <div className="space-y-8">
        {" "}
        {/* Increased base spacing */}
        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {" "}
          {/* Increased gap */}
          {/* Average Rating */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[var(--text-color)] mb-3">
              {" "}
              {/* Increased margin */}
              {ratingData.averageRating}
            </div>
            <div className="flex justify-center mb-3">
              {" "}
              {/* Increased margin */}
              {renderStars(ratingData.averageRating)}
            </div>
            <div className="text-[var(--text-color-secondary)] text-sm">
              من 5 نجوم
            </div>
            <div className="text-[var(--text-color-secondary)] text-sm mt-2">
              {" "}
              {/* Increased margin */}({ratingData.totalReviews} تقييم)
            </div>
          </div>
          {/* Rating Distribution */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 md:col-span-2">
            <h4 className="font-semibold text-[var(--text-color)] mb-6">
              {" "}
              {/* Increased margin */}
              توزيع التقييمات
            </h4>
            <div className="space-y-4">
              {" "}
              {/* Increased spacing */}
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-4">
                  {" "}
                  {/* Increased gap */}
                  <div className="flex items-center gap-2 w-16">
                    {" "}
                    {/* Increased gap */}
                    <span className="text-[var(--text-color)] text-sm">
                      {stars}
                    </span>
                    <Star className="text-yellow-500 text-sm" />
                  </div>
                  <div className="flex-1 bg-[var(--bg-light)] rounded-full h-3">
                    {" "}
                    {/* Increased height */}
                    <div
                      className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${calculatePercentage(
                          ratingData.ratingDistribution[stars]
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-[var(--text-color-secondary)] text-sm w-8">
                    {ratingData.ratingDistribution[stars]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Reviews Section */}
        <div className="mt-8">
          {" "}
          {/* Added top margin */}
          <div className="flex justify-between items-center mb-6">
            {" "}
            {/* Increased margin */}
            <h4 className="font-semibold text-[var(--text-color)] text-lg">
              آراء الطلاب ({ratingData.reviews.length})
            </h4>
            {ratingData.reviews.length > 2 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] transition-colors duration-200 text-sm font-medium px-4 py-2 rounded-lg hover:bg-[var(--bg-light)]"
              >
                {showAllReviews ? "عرض أقل" : "عرض الكل"}
              </button>
            )}
          </div>
          {/* Reviews List */}
          <div className="space-y-6">
            {" "}
            {/* Increased spacing between review cards */}
            {displayedReviews.map((review, index) => (
              <div
                key={review.id}
                className={`bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 hover:border-[var(--primary-color)] hover:shadow-lg transition-all duration-300 ${
                  index < displayedReviews.length - 1 ? "mb-2" : "" // Added bottom margin for all except last
                }`}
              >
                {/* Review Header */}
                <div className="flex justify-between items-start mb-4">
                  {" "}
                  {/* Increased margin */}
                  <div className="flex items-center gap-4">
                    {" "}
                    {/* Increased gap */}
                    <div className="bg-[var(--primary-color)] text-white rounded-full w-12 h-12 flex items-center justify-center">
                      {" "}
                      {/* Increased size */}
                      <Person />
                    </div>
                    <div>
                      <h5 className="font-semibold text-[var(--text-color)] text-lg mb-1">
                        {" "}
                        {/* Added margin and increased size */}
                        {review.studentName}
                      </h5>
                      <p className="text-[var(--text-color-secondary)] text-sm">
                        {review.studentId}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="flex gap-1 mb-2">
                      {" "}
                      {/* Increased margin */}
                      {renderStars(review.rating)}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-color-secondary)] text-sm">
                      {" "}
                      {/* Increased gap */}
                      <CalendarToday fontSize="small" />
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Review Comment */}
                <p className="text-[var(--text-color)] mb-4 leading-relaxed text-[15px]">
                  {" "}
                  {/* Increased margin and font size */}
                  {review.comment}
                </p>

                {/* Review Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-[var(--border-color)] mt-4">
                  {" "}
                  {/* Added top margin */}
                  <div className="flex items-center gap-6 text-[var(--text-color-secondary)] text-sm">
                    {" "}
                    {/* Increased gap */}
                    <button className="flex items-center gap-2 hover:text-green-500 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-[var(--bg-light)]">
                      <ThumbUp fontSize="small" />
                      <span>{review.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-red-500 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-[var(--bg-light)]">
                      <ThumbDown fontSize="small" />
                      <span>{review.dislikes}</span>
                    </button>
                  </div>
                  <button className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] transition-colors duration-200 text-sm font-medium px-4 py-2 rounded-lg hover:bg-[var(--bg-light)]">
                    الإبلاغ عن التقييم
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* No Reviews State */}
          {ratingData.reviews.length === 0 && (
            <div className="text-center py-12 text-[var(--text-color-secondary)]">
              {" "}
              {/* Increased padding */}
              <Star className="text-5xl mb-4 mx-auto opacity-50" />{" "}
              {/* Increased size */}
              <p className="text-xl mb-3">لا توجد تقييمات حتى الآن</p>{" "}
              {/* Increased size and margin */}
              <p className="text-base">كن أول من يقيم الدكتور</p>{" "}
              {/* Increased size */}
            </div>
          )}
        </div>
        {/* Add Review Button */}
        <div className="text-center pt-6 border-t border-[var(--border-color)] mt-8">
          <button
            className="bg-[var(--primary-color)] text-white px-8 py-4 rounded-lg hover:bg-[var(--primary-color-hover)] transition-all duration-300 flex items-center justify-center gap-3 mx-auto shadow-md hover:shadow-lg text-lg font-medium"
            style={{
              backgroundColor: "var(--primary-color)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--primary-color-hover)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--primary-color)";
            }}
          >
            <Star className="text-xl" />
            إضافة تقييم للدكتور
          </button>
        </div>
      </div>
    </SectionCard>
  );
};

export default DoctorRatingSection;
