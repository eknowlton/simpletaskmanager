import { Calendar, ChartNoAxesCombined, Sparkles, Check, Square, SquareCheck } from 'lucide-react';

export default function TaskListItem({ item: task, onClick }: { item: Shared.Data.Task, onClick: () => void }) {
    return (
        <div
            key={task.id}
            className="mb-2 flex flex-col justify-between rounded-md border hover:border-gray-300 dark:hover:border-gray-700 p-2 hover:bg-gray-100 dark:hover:bg-white/3"
        >
            <div className="flex flex-grow justify-between bg-gray-200 dark:bg-gray-900 px-3 py-2 rounded mb-2">
                <button onClick={onClick} className="flex-grow text-left flex flex-row items-center gap-2">
                    {task.status.value != "completed" as Shared.TaskStatus ? <Square className={"w-4 h-4"} /> : <SquareCheck className={"w-4 h-4"} />} {task.title}
                </button>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                        <ChartNoAxesCombined className="h-4 w-4" /> {task.status.label}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                        <Sparkles className="h-4 w-4" /> {task.priority}
                    </span>
                </div>
            </div>
            <div className="flex flex-grow">
                <div className="flex-grow text-gray-700 dark:text-gray-400 p-2">{task.description}</div>
                {task.due_date && (
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span className="">{task.due_date ? new Date(task.due_date).toLocaleString() : null}</span>
                    </div>
                )}
            </div>
            <div className="flex flex-grow pt-2 bg-gray-50py-2">
                <div className="flex-grow"></div>
                <div className="text-gray-700 dark:text-gray-400">
                    {task.tags &&
                        task.tags.length > 0 &&
                        task.tags.map(({ label, value }: Shared.Data.Tag) => (
                            <span
                                key={value}
                                className="ml-2 inline-block rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            >
                                {label}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
}
