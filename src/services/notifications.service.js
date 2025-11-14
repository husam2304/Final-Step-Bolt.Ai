
import { TokenApi } from './api/apiClint';
import apiEndpoint from './api/apiEndpoints';

var Notifications = [
    {
        id: 1,
        title: "تم قبول انضمامك للمشروع",
        message: "مبروك! تم قبول طلبك للانضمام إلى مشروع 'تطوير النظام الجديد'. يمكنك الآن البدء في العمل والوصول إلى جميع موارد المشروع.",
        type: "accepted",
        createdAt: "2025-11-12T17:21:39.192Z",
    },
    {
        id: 2,
        title: "تم رفض انضمامك للمشروع",
        message: "تم رفض طلبك للانضمام إلى مشروع 'تحليل البيانات'. يمكنك الاطلاع على الشروط والمتطلبات وتقديم طلب جديد.",
        type: "rejected",
        createdAt: "2025-11-12T17:21:39.192Z",
    },
    {
        id: 3,
        title: "قبول المشرف لاستلام المشروع",
        message: "قام المشرف أحمد بمراجعة وتسليم مشروع 'تصميم الواجهات'. تم قبول التسليم بنجاح مع تقييم ممتاز.",
        type: "success",
        createdAt: "2025-11-09T03:01:39.192Z",
    },
    {
        id: 4,
        title: "رفض المشرف لاستلام المشروع",
        message: "رفض المشرف محمد استلام مشروع 'تطوير التطبيق' بسبب وجود بعض الأخطاء التي تحتاج إلى تصحيح.",
        type: "rejected",
        createdAt: "2025-11-09T03:01:39.192Z",
    },
    {
        id: 5,
        title: "إعلان جديد للمنصة",
        message: "تحديث جديد لإضافة ميزات متقدمة لإدارة المشاريع وتقارير الأداء.",
        type: "info",
        createdAt: "2025-11-05T03:01:39.192Z",
    },
    {
        id: 6,
        title: "تم إنهاء المشروع",
        message: "تم إنهاء مشروع 'تحسين الأداء' بنجاح. لم يعد بإمكانك الوصول إلى بيانات المشروع أو المشاركة في المناقشات.",
        type: "warning",
        createdAt: "2025-11-05T03:01:39.192Z",
    },
    {
        id: 7,
        title: "تعديل على المشروع",
        message: "يرجى مراجعة التعديلات الجديدة على المشروع.",
        type: "edit",
        createdAt: "2025-11-01T03:01:39.192Z",
    }
];
export const notificationsService = {
    // Get notifications
    getNotifications: async () => {
        try {
            return new Promise((resolve, reject) => {
                // do something asynchronous
                setTimeout(() => {
                    resolve(Notifications); // return value when done
                }, 1000);
            });
            const response = await TokenApi.get(apiEndpoint.notifications.getNotifications)
            return response.data;
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || err.message || "فشل في إنشاء المشروع";
            throw new Error(errorMessage);
        }
    },

    // Get unread count
    getUnreadCount: async () => {

        try {
            const response = TokenApi.get(apiEndpoints.notifications.getUnreadCount)
            return response.data;
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || err.message || "فشل في إنشاء المشروع";
            throw new Error(errorMessage);
        }
    },

    // Mark notification as read
    markAsRead: async (id) => {
        try {
            const response = TokenApi.put(apiEndpoint.notifications.markAsRead(id))
            return response.data;
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || err.message || "فشل في إنشاء المشروع";
            throw new Error(errorMessage);
        }
    }
};
