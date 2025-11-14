import React, { useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { useChat } from '../../hooks/useChat';
import { toast } from 'react-toastify';


export const ChatFlyout = ({ isOpen, onClose }) => {
    const { messages, isTyping, sendMessage, clearMessages, isLoading, Delete, Start } = useChat();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);
    useEffect(() => {
        // Run async stuff inside
        const start = async () => {
            try {
                await Start.mutateAsync();
            } catch {
                // toast.error("حدث خطأ ما")
            }
        };

        start();

        // Cleanup
        return () => {
            Delete.mutateAsync()
                .catch();
        };
    }, []);
    if (!isOpen) return null;

    return (
        <>
            <div
                className={`fixed bottom-0 left-0 w-full h-full bg-[var(--bg-color)] shadow-md transition-transform duration-300 z-[9999] md:w-[380px] md:h-[600px] md:bottom-8 md:left-10 md:rounded-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* HEADER */}
                <div className="bg-[var(--gradient-primary)] text-white p-3 rounded-t-2xl flex justify-between items-center">
                    <div>
                        <h3 className="m-0 text-lg font-semibold"> منصة الخطوة الأخيرة </h3>
                        <p className="text-sm text-[var(--primary-color)]">اسألني أي شيء!</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={clearMessages} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/20">
                            <DeleteIcon />
                        </button>
                        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/20">
                            <CloseIcon />
                        </button>

                    </div>
                </div>

                {/* MESSAGES */}
                <div className="p-3 h-[calc(100%-200px)] overflow-y-auto flex flex-col gap-3 scrollbar-thin scrollbar-track-[var(--scrollbar-track)] scrollbar-thumb-[var(--scrollbar-thumb)] hover:scrollbar-thumb-[var(--scrollbar-thumb-hover)]">
                    {messages.length === 0 ? (
                        <div className="empty-chat">
                            <div className="avatar-placeholder"></div>
                            <p>أبدأ محادثتك مع الخطوة الأخيرة</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((m) => <ChatMessage key={m.id} message={m} />)}
                            {isTyping && <TypingIndicator />}
                        </>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                {<ChatInput onSendMessage={sendMessage} disabled={isLoading} />}

            </div>
        </>

    );
};
export default ChatFlyout;