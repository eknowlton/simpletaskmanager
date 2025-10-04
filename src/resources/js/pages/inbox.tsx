import { AddTask } from '@/components/add-task';
import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { TaskView } from '@/components/task-view';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import TaskList from '@/components/ui/task-list';
import TaskListItem from '@/components/ui/task-list-item';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: '/inbox',
    },
];

export default function Inbox({ inbox, twoMinute }: { inbox: Shared.Data.Task[]; twoMinute: Shared.Data.Task[] }) {
    const [view, setView] = useState<'inbox' | 'add' | 'edit'>('inbox');
    const [task, setTask] = useState<Shared.Data.Task | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs} header={false}>
            <Head title="Inbox" />
            <div className="flex flex-row flex-wrap gap-4 rounded-xl px-4 pt-4">
                <Button asChild>
                    <Button onClick={() => setView('add')}>
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
                                <TaskList>
                                    {inbox.map((task) => (
                                        <TaskListItem item={task} onClick={() => {
                                            setTask(task);
                                            setView('edit');
                                        }} />
                                    ))}
                                </TaskList>
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
                            <TaskList>
                                {twoMinute.map((task) => (
                                    <TaskListItem item={task} onClick={() => {
                                        setTask(task);
                                        setView('edit');
                                    }} />
                                ))}
                            </TaskList>
                        ) : (
                            <p className="p-4">No two minute tasks.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
            </div>
            <Sheet open={view === 'add'} onOpenChange={(open) => !open && setView('inbox')}>
                <SheetContent className="w-1/2 xl:w-1/3">
                    <AddTask onSuccess={() => setView('inbox')} />
                </SheetContent>
            </Sheet>
            <Sheet open={view === 'edit'} onOpenChange={(open) => !open && setView('inbox')}>
                <SheetContent className="w-1/2 overflow-y-auto xl:w-1/3">{task && <TaskView task={task as Shared.Data.Task} />}</SheetContent>
            </Sheet>
        </AppLayout>
    );
}
