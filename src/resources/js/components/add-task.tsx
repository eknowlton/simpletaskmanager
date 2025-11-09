import { useForm } from '@inertiajs/react';
import React from 'react';
import toast from 'react-hot-toast';
import { TaskForm, TaskFormData } from './task-form';

export function AddTask({ onSuccess, task }: { onSuccess?: () => void; task?: TaskFormData }) {
    const initial: TaskFormData = {
        id: task?.id ?? '0',
        title: task?.title ?? '',
        description: task?.description ?? '',
        tags: task?.tags ?? [],
        status: task?.status ?? 'pending',
        project_id: task?.project_id ?? null,
        priority: task?.priority ?? 5,
        due_date: task?.due_date ? new Date(task.due_date) : undefined,
    };

    const form = useForm<TaskFormData>(initial);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        form.post(route('tasks.store'), {
            onSuccess: () => {
                form.reset();
                toast.success('Task created successfully');
                onSuccess?.();
            },
        });
    };

    return (
        <div className="mt-10 px-5">
            <TaskForm onSubmit={onSubmit} form={form} />
        </div>
    );
}
