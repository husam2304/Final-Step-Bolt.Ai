import React, { useState, useRef, useEffect } from 'react';





export const ChatInput = ({ onSendMessage, disabled }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border-t border-[var(--border-color)] p-3 flex gap-2 items-end"
        >
            <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="أسأل بحر"
                disabled={disabled}
                className="flex-1 border border-[var(--border-color)] rounded-md px-3 py-2 resize-none text-sm leading-relaxed max-h-[120px] focus:border-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color-hover)]"
            />
            <button
                type="submit"
                disabled={!message.trim() || disabled}
                className="w-24 h-12 bg-[var(--primary-color)] text-white rounded-md flex items-center justify-center text-sm transition-transform duration-200 hover:scale-105 hover:bg-[var(--primary-color-hover)] disabled:bg-[var(--border-color)] disabled:cursor-not-allowed disabled:scale-100"
            >
                أسألني
            </button>
        </form>


    );
};
export default ChatInput;