const variantStyles = {
    primary: 'bg-gray-100 dark:bg-white/5',
    secondary: 'bg-gray-300 dark:bg-gray-700 ',
};

export const ContentHeader: React.FC<{
    title: string;
    description?: string;
    variant?: 'primary' | 'secondary';
    color?: string;
}> = ({ title, description, variant = 'primary', color }) => {
    return (
        <div className={`flex flex-col items-start justify-between border-b p-4 ${variantStyles[variant]}`}>
            <h3 className="flex flex-row gap-4 px-4 py-2 text-lg font-semibold">
                {color && <div className={`h-6 w-6 rounded-full bg-${color}-400`}></div>}
                {title}
            </h3>
            {description && <div className="px-4 pb-2 text-sm text-gray-300 dark:text-gray-500">{description}</div>}
        </div>
    );
};
