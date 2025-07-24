import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export const ContentBody: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
    return <div className={cn('p-4', className)}>{children}</div>;
};
