export const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد';
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    } catch {
        return dateString;
    }
};
export const formatDateSince = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'الآن';
    if (diffInSeconds < 3600) return `منذ ${Math.floor(diffInSeconds / 60)} دقائق`;
    if (diffInSeconds < 86400) return `منذ ${Math.floor(diffInSeconds / 3600)} ساعات`;
    return `منذ ${Math.floor(diffInSeconds / 86400)} أيام`;
};
export const formatDateSinceDays = (dateString) => {
    if (!dateString) return 'غير معروف';

    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'اليوم';
        if (diffDays === 1) return 'الأمس';
        if (diffDays < 7) return `منذ ${diffDays} أيام`;
        if (diffDays < 30) return `منذ ${Math.floor(diffDays / 7)} أسابيع`;
        return `منذ ${Math.floor(diffDays / 30)} أشهر`;
    } catch {
        return dateString;
    }
};