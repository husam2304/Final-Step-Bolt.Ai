import React, { useState, useEffect } from "react";
import { Bell, ChevronDown } from "lucide-react";
import { FixedSizeList as List } from "react-window";
import { notificationsService } from "../../services";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import notiSound from "./../../assets/Sounds/notification-sound.mp3";
import { useSelector } from "react-redux";
import { formatDateSince } from "../../utils/Helper";
import { getConnection } from "../../store/SingLRActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const NotificationMenu = () => {
    const queryClient = useQueryClient();
    const [unreadCount, setUnreadCount] = useState(0);
    const authLoading = useSelector((state) => state.auth.authLoading);
    const connection = getConnection();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const { data: notifications } = useQuery({
        queryKey: ["Notification"],
        queryFn: () => notificationsService.getNotifications(),
        select: (data) =>
            data.map((d) => ({
                ...d,
                time: formatDateSince(d.createdAt),
            })),
    });

    const MarkAsRead = useMutation({
        mutationFn: (id) => notificationsService.markAsRead(id),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(["Notification"], (prev) =>
                prev.map((n) =>
                    n.id === variables ? { ...n, isRead: true } : n
                )
            );
            queryClient.setQueryData(["NotificationUR"], (prev) =>
                prev?.count !== undefined ? prev?.count - 1 : prev - 1
            );
        },
        onError: () => {
            toast.error("حدث خطأ أثناء تعليم الإشعار كمقروء");
        },
    });

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Handle real-time notifications
    useEffect(() => {
        const handleNewNotification = (notification) => {
            queryClient.setQueryData(["Notification"], (prev) => {
                if (prev.some((n) => n.id === notification.id)) {
                    return prev;
                } else {
                    setUnreadCount((p) => p + 1);
                }
                return [{ ...notification, time: "الآن" }, ...prev];
            });
            if (!isOpen) {
                try {
                    const audio = new Audio(notiSound);
                    audio.volume = 0.3;
                    audio.play();
                } catch (e) { }
                toast.success(notification.message);
            }
        };

        if (!connection || !token || authLoading) return;

        connection.on("ReceiveNotification", handleNewNotification);
        return () => connection.off("ReceiveNotification", handleNewNotification);
    }, [connection, token, authLoading, isOpen, queryClient]);

    useEffect(() => {
        if (notifications)
            setUnreadCount(notifications.filter((n) => !n.isRead).length);
    }, [notifications]);

    const handleMarkAsRead = async (id) => {
        await MarkAsRead.mutateAsync(id);
    };

    const handleMarkAllAsRead = async () => {
        try {
            notifications?.forEach(async (notification) => {
                if (!notification.isRead)
                    await MarkAsRead.mutateAsync(notification.id);
            });
            setUnreadCount(0);
        } catch (error) { }
    };

    return (
        <div className="relative ml-4">
            {/* 🔔 Icon */}
            <button
                className={`relative p-2 rounded-full transition-all duration-300 
                    ${isOpen
                        ? "bg-[var(--bg-light)] text-[var(--text-color)]"
                        : "text-[var(--text-color-secondary)] hover:bg-[var(--hover-bg)]"
                    }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="الإشعارات"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[var(--danger-color)] text-[var(--text-light)] rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-[0.65rem] font-bold px-[4px]">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {/* 📜 Dropdown */}
            <div
                className={`absolute top-[80%] left-0 w-[300px] border border-[var(--border-color)] rounded-lg shadow-md overflow-hidden rtl opacity-0 transform scale-95 transition-all duration-300 z-[1000]
                    ${isOpen
                        ? "opacity-100 scale-100 visible left-[20%]"
                        : "invisible"
                    } bg-[var(--card-bg)] text-[var(--text-color)]`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-light)]">
                    <h4 className="m-0 text-lg font-medium text-[var(--text-color)]">
                        الإشعارات
                    </h4>
                    <div className="flex gap-2 items-center">
                        <button
                            onClick={handleMarkAllAsRead}
                            disabled={unreadCount === 0}
                            className={`text-sm px-2 py-1 rounded transition-all duration-200
                                ${unreadCount === 0
                                    ? "text-[var(--text-color-secondary)] cursor-not-allowed"
                                    : "text-[var(--primary-color)] hover:bg-[var(--primary-color--overlay)]"
                                }`}
                        >
                            تعليم الكل كمقروء
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="إغلاق"
                            className="text-[var(--text-color-secondary)] hover:text-[var(--text-color)] text-xl"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="max-h-[400px] overflow-y-auto">
                    {notifications?.length > 0 ? (
                        <List
                            height={300}
                            itemCount={notifications.length}
                            itemSize={80}
                            width="100%"
                        >
                            {({ index, style }) => {
                                const notification = notifications[index];
                                return (
                                    <div
                                        style={style}
                                        onClick={() =>
                                            handleMarkAsRead(notification.id)
                                        }
                                        className={`flex gap-3 px-4 py-3 border-b border-[var(--border-color)] cursor-pointer transition-all duration-200
                                            ${!notification.isRead
                                                ? "bg-[var(--bg-light)]"
                                                : "bg-[var(--bg-color)]"
                                            } hover:bg-[var(--hover-bg)]`}
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="flex justify-between items-center mb-1 text-sm">
                                                <strong className="truncate ml-2 text-[var(--text-color)]">
                                                    {notification.senderName}
                                                </strong>
                                                <span className="text-[var(--text-color-secondary)] text-xs whitespace-nowrap">
                                                    {notification.time}
                                                </span>
                                            </p>
                                            <p className="text-[var(--text-color-secondary)] text-sm truncate">
                                                {notification.message}
                                            </p>
                                        </div>
                                        {!notification.isRead && (
                                            <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full mt-1"></span>
                                        )}
                                    </div>
                                );
                            }}
                        </List>
                    ) : (
                        <div className="py-8 px-5 text-center text-[var(--text-color-secondary)] text-sm">
                            لا توجد إشعارات جديدة
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 text-center border-t border-[var(--border-color)] bg-[var(--bg-light)]">
                    <Link
                        to={`/Notification`}
                        onClick={() => setIsOpen(false)}
                        className="text-[var(--primary-color)] text-sm hover:underline inline-flex items-center gap-1"
                    >
                        عرض جميع الإشعارات
                        <ChevronDown size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotificationMenu;