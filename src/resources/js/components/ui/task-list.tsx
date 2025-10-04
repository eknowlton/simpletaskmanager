import React, { JSX } from 'react';

export default function TaskList({ children}: React.PropsWithChildren){
    return (
        <div className={`flex flex-col gap-2`}>
            {children}
        </div>
    );
}
