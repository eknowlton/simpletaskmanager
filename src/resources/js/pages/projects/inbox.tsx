import { AddTask } from '@/components/add-task';
import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { ProjectView } from '@/components/project-view';
import { TaskView } from '@/components/task-view';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import TaskList from '@/components/ui/task-list';
import TaskListItem from '@/components/ui/task-list-item';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
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
                            <TaskList>
                                {tasks.map((task) => (
                                    <TaskListItem
                                        item={task}
                                        onClick={() => {
                                            setTask(task);
                                            setView('edit');
                                        }}
                                    />
                                ))}
                            </TaskList>
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
                    <AddTask onSuccess={() => setView('show')} task={{ project_id: parseInt(project.id, 10) }} />
                </SheetContent>
            </Sheet>
        </AppLayout>
    );
}
