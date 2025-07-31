import { AddTask } from '@/components/add-task';
import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { PaginatedCollectionPaging } from '@/components/paginated-collection-paging';
import { TaskView } from '@/components/task-view';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, ChartNoAxesCombined, Sparkles } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Tasks',
        href: '/tasks',
    },
];

export default function Index({ tasks }: { tasks: PaginatedCollection<Shared.Data.Task> }) {
    const [task, setTask] = useState<Shared.Data.Task | null>(null);
    const [addTask, setAddTask] = useState<boolean>(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="flex flex-row flex-wrap gap-4 rounded-xl px-4 pt-4">
                <Button variant={'default'} onClick={() => setAddTask(true)}>
                    New Task
                </Button>
            </div>
            <div className="flex h-full flex-1 flex-row flex-wrap gap-4 rounded-xl p-4">
                <ContentContainer>
                    <ContentHeader title="All Tasks" />
                    <ContentBody>
                        {tasks.data.length > 0 ? (
                            <>
                                <div className="p-4">
                                    {tasks.data.map((task) => (
                                        <div
                                            key={task.id}
                                            className="mb-2 flex flex-col justify-between rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-white/3"
                                        >
                                            <div className="flex flex-grow justify-between">
                                                <button onClick={() => setTask(task)} className="flex-grow text-left">
                                                    {task.title}
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
                                                <div className="flex-grow text-gray-700 dark:text-gray-400">{task.description}</div>
                                                {task.due_date && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                                                        <Calendar className="h-4 w-4" />
                                                        <span className="">{task.due_date ? new Date(task.due_date).toLocaleString() : null}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-grow pt-2">
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
                                    ))}
                                </div>
                                <PaginatedCollectionPaging collection={tasks} />
                            </>
                        ) : (
                            <p className="p-6">No tasks found.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
            </div>
            <Sheet open={addTask} onOpenChange={(open) => !open && setAddTask(false)}>
                <SheetContent className="w-1/2 xl:w-1/3">
                    <div className="mt-10 px-5">
                        <AddTask onSuccess={() => setAddTask(false)} />
                    </div>
                </SheetContent>
            </Sheet>
            <Sheet open={!!task} onOpenChange={(open) => !open && setTask(null)}>
                <SheetContent className="w-1/2 overflow-y-auto xl:w-1/3">{!!task && <TaskView task={task as Shared.Data.Task} />}</SheetContent>
            </Sheet>
        </AppLayout>
    );
}
