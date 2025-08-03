import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { TaskForm, TaskFormData } from './task-form';

export function TaskView({ task }: { task: Shared.Data.Task }) {
    const {
        auth: { user },
    } = usePage<SharedProps>().props;
    const form = useForm<TaskFormData>('task-form', {
        id: task.id ?? '',
        title: task.title,
        description: task.description ?? '',
        tags: task.tags ?? [],
        status: task.status.value,
        project_id: task.project_id ?? null,
        priority: task.priority,
        due_date: task.due_date ? new Date(task.due_date) : null,
    });

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        form.put(route('tasks.update', { task: task.id }), {
            onSuccess: () => {
                toast.success('Task updated successfully');
            },
        });
    };

    return (
        <div className="mt-10 px-5">
            <TaskForm onSubmit={onSubmit} form={form} />
            <div className="mt-5 flex flex-col gap-2 px-4">
                {task &&
                    task.audits &&
                    task.audits.length > 0 &&
                    task.audits.map((audit) => (
                        <div className="mb-3">
                            <div className="flex flex-row gap-1 text-sm text-gray-500 dark:text-gray-500">
                                <span className="font-semibold">{user.id == audit?.user?.id ? 'You' : audit?.user?.name}</span>
                                <span>{audit.event}</span>
                                <span className="font-semibold">&apos;{task.title}&apos;</span>
                                <span>at</span>
                                <span>{new Date(audit.created_at).toLocaleString()}</span>
                            </div>

                            {audit.old_values &&
                                Object.keys(audit.old_values).map((key) => (
                                    <div className="mt-2 ml-4 flex flex-row gap-1 text-sm text-xs text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">{key}</span>
                                        <span>to</span>
                                        <span className="">{audit.old_values[key]}</span>
                                    </div>
                                ))}
                        </div>
                    ))}
            </div>
        </div>
    );
}
