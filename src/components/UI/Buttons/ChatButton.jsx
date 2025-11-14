import React, { useState } from 'react';
import ChatFlyout from '../../Chat/ChatFlyout';
import { useSelector } from 'react-redux';



export const ChatButton = ({ hasUnread = false }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const token = useSelector((state) => state?.auth?.token);

    return (
        <>

            {token && <button
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-8 left-10 w-[200px] h-14 bg-[var(--primary-color)] text-white rounded-full shadow-md z-40 cursor-pointer transition-transform duration-200 hover:scale-110 hover:bg-[var(--primary-color-hover)]"
            >
                اسألني
                {hasUnread && (
                    <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-[var(--danger-color)] animate-[pulse_1.5s_infinite]" />
                )}
            </button>}
            {
                isChatOpen && <ChatFlyout
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                />
            }
        </>
    );
};
export default ChatButton;