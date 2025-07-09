import React, { useState, useEffect } from 'react';

const Snackbar = ({ message, type = 'success', duration = 3000 }) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(false);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration]);

    const getBgColor = () => {
        switch (type) {
            case 'success': return 'bg-green-500';
            case 'error': return 'bg-red-500';
            case 'warning': return 'bg-yellow-500';
            default: return 'bg-blue-500';
        }
    };

    return (
        isOpen && (
            <div className={`${getBgColor()} fixed bottom-5 right-5 px-6 py-3 text-white rounded-xl shadow-lg animate-fade-in-out`}>
                {message}
            </div>
        )
    );
};


export default function showSnackbar(message, type = 'success', duration = 3000) {
    return <Snackbar message={message} type={type} duration={duration} />;
}

