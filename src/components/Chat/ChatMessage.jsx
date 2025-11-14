import React from 'react';
import { useSelector } from 'react-redux';
import FinalStep from './../../assets/images/logo/logo-finalstep.jpg';
import ReactMarkdown from "react-markdown";

export const ChatMessage = ({ message }) => {
    const isUser = message.sender === 'user';
    const userImage = useSelector(state => state?.auth?.user?.profilePictureUrl);
    return (
        <div className={`flex gap-2 items-start ${isUser ? 'flex-row' : 'flex-row-reverse text-right'}`}>
            <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden">
                {isUser ? (
                    <img src={userImage} className="w-8 h-8 rounded-full" />
                ) : (
                    <img src={FinalStep} className="w-8 h-8 rounded-full" />
                )}
            </div>

            <div>
                <div
                    className={`px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${isUser
                        ? 'bg-[var(--primary-color)] text-white'
                        : 'bg-[var(--card-bg)] text-[var(--text-color)]'
                        }`}
                >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                <p className="text-xs text-[var(--text-light)] mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>

    );
};
export default ChatMessage;