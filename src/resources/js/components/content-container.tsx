import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

const variantStyles = {
    primary: 'border-sidebar-border/70 dark:border-sidebar-border',
    secondary: 'border-sidebar-border/50 dark:border-sidebar-border',
};

export const ContentContainer: React.FC<{
    children: ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary';
    ref?: React.ForwardedRef<HTMLDivElement>;
}> = ({ children, className, variant = 'primary', ref }) => {
    return (
        <div
            ref={ref}
            className={cn(
                'flex-grow overflow-hidden rounded-xl border duration-300 animate-in fade-in md:min-h-min',
                className,
                variantStyles[variant],
            )}
        >
            {children}
        </div>
    );
};
