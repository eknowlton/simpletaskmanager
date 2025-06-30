import { ReactNode } from 'react';

export const ContentBody: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="p-4">{children}</div>;
};
