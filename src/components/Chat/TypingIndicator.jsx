import React from 'react';
import ComputerIcon from '@mui/icons-material/Computer';

export const TypingIndicator = () => {
    return (
        <div className="flex flex-row-reverse items-start gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[var(--card-bg)]">
                <ComputerIcon className="icon" />
            </div>

            <div className="flex gap-1 items-center bg-[var(--card-bg)] rounded-2xl px-3 py-2 w-fit">
                <span className="w-2 h-2 bg-[var(--text-light)] rounded-full animate-bounce [animation-delay:0s]" />
                <span className="w-2 h-2 bg-[var(--text-light)] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-[var(--text-light)] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
        </div>

    );
};
export default TypingIndicator;