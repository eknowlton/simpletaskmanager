import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { TaskForm, TaskFormSchema } from '@/components/task-form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: '/inbox',
    },
];

export default function Inbox({
    inbox,
    twoMinute,
    statuses,
}: {
    inbox: App.Data.Task[];
    twoMinute: App.Data.Task[];
    statuses: App.Data.TaskStatus[];
}) {
    const [addTask, setAddTask] = useState(false);
    const [editTask, setEditTask] = useState<App.Data.Task | null>(null);

    const submitEditTask: SubmitHandler<z.infer<typeof TaskFormSchema>> = (task) => {
        router.put(route('tasks.update', editTask?.id), task);
        setEditTask(null);
        toast.success('Task updated successfully');
    };

    const submitAddTask: SubmitHandler<z.infer<typeof TaskFormSchema>> = (task) => {
        router.post(route('tasks.store'), task);
        setAddTask(false);
        toast.success('Task added successfully');
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inbox" />
            <div className="flex flex-row flex-wrap gap-4 rounded-xl px-4 pt-4">
                <Button asChild>
                    <Button onClick={() => setAddTask(true)}>
                        <Plus />
                        New Task
                    </Button>
                </Button>
            </div>
            <div className="flex h-full flex-row gap-4 rounded-xl p-4">
                <ContentContainer className="flex-grow">
                    <ContentHeader title="Inbox" />
                    <ContentBody>
                        {inbox.length > 0 ? (
                            <div className="p-4">
                                {inbox.map((task) => (
                                    <div
                                        key={task.id}
                                        className="mb-2 flex flex-col justify-between rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-white/3"
                                    >
                                        <div className="flex flex-grow">
                                            <button onClick={() => setEditTask(task)} className="flex-grow text-left">
                                                {task.title}
                                            </button>
                                            <div>
                                                {task.status_label}{' '}
                                                <span className="text-sm text-gray-700 dark:text-gray-400">( {task.priority} )</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-grow">
                                            <div className="flex-grow text-gray-700 dark:text-gray-400">{task.description}</div>
                                            <div>
                                                <span className="bold text-sm text-gray-700 dark:text-gray-400">Due On</span>
                                                <span className="pl-4">{new Date(task.due_date).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="p-4">No upcoming tasks.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
                <ContentContainer className="w-1/5">
                    <ContentHeader title="2-Minute Tasks" />
                    <ContentBody>
                        {twoMinute.length > 0 ? (
                            <div className="p-4">
                                {twoMinute.map((task) => (
                                    <div
                                        key={task.id}
                                        className="mb-2 flex flex-col justify-between rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-white/3"
                                    >
                                        <div className="flex flex-grow">
                                            <Link href={`/tasks/${task.id}/show`} className="flex-grow text-lg">
                                                {task.title}
                                            </Link>
                                            <div>
                                                {task.status_label}{' '}
                                                <span className="text-sm text-gray-700 dark:text-gray-400">( {task.priority} )</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-grow">
                                            <div className="flex-grow text-gray-700 dark:text-gray-400">{task.description}</div>
                                            <div>
                                                <span className="bold text-sm text-gray-700 dark:text-gray-400">Due On</span>
                                                <span className="pl-4">{new Date(task.due_date).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="p-4">No two minute tasks.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
            </div>
            <Sheet open={addTask} onOpenChange={(open) => !open && setAddTask(false)}>
                <SheetContent className="w-1/2 xl:w-1/3">
                    <div className="mt-10 px-5">
                        <TaskForm onSubmit={submitAddTask} statuses={statuses} />
                    </div>
                </SheetContent>
            </Sheet>
            <Sheet open={!!editTask} onOpenChange={(open) => !open && setEditTask(null)}>
                <SheetContent className="w-1/2 xl:w-1/3">
                    <div className="mt-10 px-5">
                        <TaskForm task={editTask} onSubmit={submitEditTask} statuses={statuses} />
                    </div>
                </SheetContent>
            </Sheet>
        </AppLayout>
    );
}
