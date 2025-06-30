import React, { ReactNode } from 'react';

const variantStyles = {
    primary: 'border-sidebar-border/70 dark:border-sidebar-border',
    secondary: 'border-sidebar-border/50 dark:border-sidebar-border',
};

export const ContentContainer: React.FC<{ children: ReactNode; className?: string; variant?: 'primary' | 'secondary' }> = ({
    children,
    className,
    variant = 'primary',
}) => {
    return (
        <div
            className={`relative min-h-[100vh] flex-grow overflow-hidden rounded-xl border md:min-h-min ${className} ${variantStyles[variant]} duration-300 animate-in fade-in`}
        >
            {children}
        </div>
    );
};
