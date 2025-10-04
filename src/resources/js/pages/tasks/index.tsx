import { AddTask } from '@/components/add-task';
import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { PaginatedCollectionPaging } from '@/components/paginated-collection-paging';
import { TaskView } from '@/components/task-view';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import TaskList from '@/components/ui/task-list';
import TaskListItem from '@/components/ui/task-list-item';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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
                                <TaskList>
                                    {tasks.data.map((task) => (
                                        <TaskListItem item={task} onClick={() => setTask(task)} />
                                    ))}
                                </TaskList>
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
