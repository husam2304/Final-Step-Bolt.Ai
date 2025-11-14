import React, { useRef, useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, Bell, Edit, Check } from "lucide-react";
import { useSelector } from "react-redux";
import { getConnection } from "../store/SingLRActions";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { notificationsService } from "../services";
import { toast } from "react-toastify";
import { formatDateSince } from "../utils/Helper";

const statusStyles = {
    accepted: {
        bg: "bg-[var(--status-accepted-bg)]",
        text: "text-[var(--status-accepted-text)]",
        border: "border-[var(--status-accepted-border)]",
        icon: <CheckCircle className="text-[var(--success-color)] w-6 h-6" />,
    },
    rejected: {
        bg: "bg-[var(--status-rejected-bg)]",
        text: "text-[var(--status-rejected-text)]",
        border: "border-[var(--status-rejected-border)]",
        icon: <XCircle className="text-[var(--danger-color)] w-6 h-6" />,
    },
    success: {
        bg: "bg-[var(--status-accepted-bg)]",
        text: "text-[var(--status-accepted-text)]",
        border: "border-[var(--status-accepted-border)]",
        icon: <CheckCircle className="text-[var(--success-color)] w-6 h-6" />,
    },
    info: {
        bg: "bg-[var(--primary-color--overlay)]",
        text: "text-[var(--primary-color)]",
        border: "border-[var(--primary-color)]",
        icon: <Info className="text-[var(--primary-color)] w-6 h-6" />,
    },
    warning: {
        bg: "bg-[var(--status-pending-bg)]",
        text: "text-[var(--status-pending-text)]",
        border: "border-[var(--status-pending-border)]",
        icon: <AlertTriangle className="text-[var(--danger-color)] w-6 h-6" />,
    },
    edit: {
        bg: "bg-[var(--hover-bg)]",
        text: "text-[var(--primary-color)]",
        border: "border-[var(--primary-color)]",
        icon: <Edit className="text-[var(--primary-color)] w-6 h-6" />,
    },
};

const Notifications = () => {
    const queryClient = useQueryClient();
    const [selectedFilter, setSelectedFilter] = useState('- شاهد الجميع -');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState(false);
    const connection = getConnection();
    const authLoading = useSelector(state => state.auth.authLoading);
    const connectionRef = useRef(null);
    const token = localStorage.getItem('authToken');

    const { data: notifications = [] } = useQuery({
        queryKey: ["Notification"],
        queryFn: () => notificationsService.getNotifications(),
        select: (data) =>
            data.map((d) => ({
                ...d,
                time: formatDateSince(d.createdAt),
            })),
    });

    const { data: unreadCount = 0 } = useQuery({
        queryKey: ["NotificationUR"],
        queryFn: () => notificationsService.getUnreadCount(),
        select: (data) => data.count || data
    });

    const MarkAsRead = useMutation({
        mutationFn: (id) => notificationsService.markAsRead(id),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(["Notification"], prev =>
                prev.map(n => n.id === variables ? { ...n, isRead: true } : n)
            );
            queryClient.setQueryData(["NotificationUR"], prev => (prev.count != undefined) ? prev.count - 1 : prev - 1);
        },
        onError: () => {
            toast.error('حدث خطأ أثناء تعليم الإشعار كمقروء');
        }
    });

    // Initialize SignalR connection
    useEffect(() => {
        const addNewNotification = (notification) => {
            queryClient.setQueryData(["Notification"], prev => {
                if (prev.some(n => n.id === notification.relatedId)) return prev;
                return [{
                    id: notification.relatedId,
                    type: notification.title,
                    message: notification.message,
                    time: formatDateSince(notification.createdAt),
                    isRead: false
                }, ...prev];
            });
            queryClient.setQueryData(["NotificationUR"], prev => prev + 1);
        };

        const startConnection = async () => {
            try {
                connection.onclose(() => {
                    updateConnectionStatus(false);
                    setTimeout(startConnection, 5000);
                });

                connection.onreconnected(() => {
                    updateConnectionStatus(true);
                });

                connection.on("ReceiveNotification", (notification) => {
                    addNewNotification(notification);
                });
                connectionRef.current = connection;
                updateConnectionStatus(true);
            } catch (err) {
                updateConnectionStatus(false);
                setTimeout(startConnection, 5000);
            }
        };

        if (token && !authLoading && connection) {
            startConnection();
        }

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop();
            }
        };
    }, [token, authLoading, connection, queryClient]);

    const updateConnectionStatus = (connected) => {
        setConnectionStatus(connected);
    };

    const handleMarkAsRead = async (id) => {
        await MarkAsRead.mutateAsync(id);
    };

    const markAllAsRead = async () => {
        try {
            await Promise.all(
                notifications
                    .filter(notification => !notification.isRead)
                    .map(notification => MarkAsRead.mutateAsync(notification.id))
            );
            toast.success('تم تعليم جميع الإشعارات كمقروءة');
        } catch (error) {
            toast.error('فشل تعليم الكل كمقروء');
        }
    };

    const filteredNotifications = notifications?.filter(notification => {
        if (selectedFilter === 'لم تقرأ') return !notification.isRead;
        if (selectedFilter === 'قرأت') return notification.isRead;
        return true;
    });

    const sortedNotifications = [...filteredNotifications].sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
    });

    const getStatusFromType = (type) => {
        const typeMap = {
            'accepted': 'accepted',
            'rejected': 'rejected',
            'success': 'success',
            'info': 'info',
            'warning': 'warning',
            'edit': 'edit'
        };
        return typeMap[type?.toLowerCase()] || 'info';
    };

    return (
        <div className="max-w-4xl my-4 mx-auto p-6 bg-[var(--card-bg)] rounded-lg border border-[var(--card-border-color)] shadow-lg" dir="rtl">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Bell className="text-[var(--primary-color)] w-8 h-8" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[var(--danger-color)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                        )}
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--text-color)]">إشعارات المنصة</h2>
                </div>

                <div className="flex items-center gap-3">
                    {/* Filter Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                            className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color-hover)] transition-all duration-300 flex items-center gap-2 shadow-md"
                        >
                            <span>{selectedFilter}</span>
                            <svg className={`w-4 h-4 transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {showFilterMenu && (
                            <div className="absolute left-0 mt-2 w-48 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl z-10 overflow-hidden">
                                {['- شاهد الجميع -', 'لم تقرأ', 'قرأت'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => {
                                            setSelectedFilter(filter);
                                            setShowFilterMenu(false);
                                        }}
                                        className={`w-full text-right px-4 py-3 hover:bg-[var(--hover-bg)] transition-colors ${selectedFilter === filter ? 'bg-[var(--primary-color--overlay)] text-[var(--primary-color)] font-semibold' : 'text-[var(--text-color)]'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mark All as Read Button */}
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="px-4 py-2 bg-[var(--success-color)] text-white rounded-lg hover:bg-[var(--btn-success-hover)] transition-all duration-300 flex items-center gap-2 shadow-md"
                        >
                            <Check className="w-4 h-4" />
                            <span>تعليم الكل كمقروء</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {sortedNotifications.length === 0 ? (
                    <div className="text-center py-12">
                        <Bell className="w-16 h-16 text-[var(--text-color-secondary)] mx-auto mb-4 opacity-50" />
                        <p className="text-[var(--text-color-secondary)] text-lg">لا توجد إشعارات</p>
                    </div>
                ) : (
                    sortedNotifications.map((notification) => {
                        const status = getStatusFromType(notification.type);
                        const isUnread = !notification.isRead;

                        return (
                            <div
                                key={notification.id}
                                onClick={() => isUnread && handleMarkAsRead(notification.id)}
                                className={`flex gap-4 p-4 my-8 rounded-lg border-r-4 transition-all duration-300 cursor-pointer
                                    ${statusStyles[status].bg} 
                                    ${statusStyles[status].border}
                                    ${isUnread ? 'shadow-md hover:shadow-lg' : 'opacity-75'}
                                    hover:scale-[1.01] relative
                                `}
                            >
                                {/* Unread Indicator */}
                                {isUnread && (
                                    <div className="absolute top-2 left-2 w-3 h-3 bg-[var(--primary-color)] rounded-full animate-pulse"></div>
                                )}

                                {/* Icon */}
                                <div className="flex-shrink-0 pt-1">
                                    {statusStyles[status].icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <p className={`font-semibold ${statusStyles[status].text} ${isUnread ? 'text-lg' : ''}`}>
                                            {notification.type}
                                        </p>
                                        {isUnread && (
                                            <span className="text-xs bg-[var(--primary-color)] text-white px-2 py-1 rounded-full whitespace-nowrap">
                                                جديد
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-[var(--text-color-secondary)] text-sm leading-relaxed ${isUnread ? 'font-medium' : ''}`}>
                                        {notification.message}
                                    </p>
                                    <span className="text-[var(--text-color-secondary)] text-xs mt-2 block">
                                        {notification.time}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Summary Footer */}
            {sortedNotifications.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-sm text-[var(--text-color-secondary)]">
                    <span>إجمالي الإشعارات: {notifications.length}</span>
                    <span>غير المقروءة: {unreadCount}</span>
                </div>
            )}
        </div>
    );
};

export default Notifications;