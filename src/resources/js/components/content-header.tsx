const variantStyles = {
    primary: 'bg-gray-100 dark:bg-white/5',
    secondary: 'bg-gray-300 dark:bg-gray-700 ',
};

export const ContentHeader: React.FC<{
    title: string;
    description?: string;
    variant?: 'primary' | 'secondary';
}> = ({ title, description, variant = 'primary' }) => {
    return (
        <div className={`flex items-center justify-between border-b p-4 ${variantStyles[variant]}`}>
            <h3 className="p-4 text-lg font-semibold">{title}</h3>
            {description && <div>{description}</div>}
        </div>
    );
};
