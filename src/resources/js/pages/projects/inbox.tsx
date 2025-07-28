import { AddTask } from '@/components/add-task';
import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { ProjectView } from '@/components/project-view';
import { TaskView } from '@/components/task-view';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, ChartNoAxesCombined, Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Projects',
        href: '/tasks',
    },
];

export default function Show({ project, tasks }: { project: Shared.Data.Project; tasks: Shared.Data.Task[] }) {
    const [view, setView] = useState<'show' | 'edit' | 'add-task' | 'edit-task'>('show');
    const [task, setTask] = useState<Shared.Data.Task | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs.concat([{ title: `${project.title}`, href: `/project/${project.id}/show` }])}>
            <Head title={`${project.title}`} />

            <div className="flex flex-row flex-wrap gap-4 overflow-x-auto rounded-xl px-4 pt-4">
                <Button onClick={() => setView('add-task')}>
                    <Plus />
                    New Task
                </Button>
                <Button onClick={() => setView('edit')} variant="outline">
                    Edit Project
                </Button>
            </div>

            <div className="flex h-full flex-1 flex-col flex-wrap gap-4 overflow-x-auto rounded-xl p-4">
                <ContentContainer>
                    <ContentHeader title={project.title} description={`Inbox`} />
                    <ContentBody>
                        {tasks.length > 0 ? (
                            <>
                                <div className="p-4">
                                    {tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="mb-2 flex flex-col justify-between rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-white/3"
                                        >
                                            <div className="flex flex-grow">
                                                <button
                                                    className="flex-grow text-left text-lg"
                                                    onClick={() => {
                                                        setTask(task);
                                                        setView('edit-task');
                                                    }}
                                                >
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
                                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                                                    <Calendar className="h-4 w-4" />
                                                    <span className="">{task.due_date}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-grow pt-2">
                                                <div className="flex-grow"></div>
                                                <div className="text-gray-700 dark:text-gray-400">
                                                    {task.tags &&
                                                        task.tags.length > 0 &&
                                                        task.tags.map(({ label, value }) => (
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
                            </>
                        ) : (
                            <p className="p-6">No tasks in project.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
            </div>
            <Sheet open={view === 'edit'} onOpenChange={(open) => !open && setView('show')}>
                <SheetContent className="w-1/2 xl:w-1/3">
                    <ProjectView project={project} />
                </SheetContent>
            </Sheet>
            <Sheet open={view === 'edit-task'} onOpenChange={(open) => !open && setView('show')}>
                <SheetContent className="w-1/2 xl:w-1/3">{task && <TaskView task={task} />}</SheetContent>
            </Sheet>
            <Sheet open={view === 'add-task'} onOpenChange={(open) => !open && setView('show')}>
                <SheetContent className="w-1/2 xl:w-1/3">
                    <div className="mt-10 px-5">
                        <AddTask onSuccess={() => setView('show')} task={{ project_id: parseInt(project.id, 10) }} />
                    </div>
                </SheetContent>
            </Sheet>
        </AppLayout>
    );
}
