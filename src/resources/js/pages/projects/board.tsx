import { AddTask } from '@/components/add-task';
import { Board as BoardComponent, CustomDragEndEvent } from '@/components/board';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DragStartEvent } from '@dnd-kit/core';
import { Head, router } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Board({ columns, project }: { columns: Shared.Data.BoardColumn[]; project: Shared.Data.Project }) {
    const [isDragging, setIsDragging] = useState<any>(null);
    const [view, setView] = useState<'board' | 'add' | 'edit'>('board');
    const [addTaskStatusId, setAddTaskStatusId] = useState<string | null>(null);
    const [task, setTask] = useState<Shared.Data.Task | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'All Projects',
            href: route('projects.index'),
        },
        {
            title: project.title,
            href: route('projects.show', project.id as string),
        },
        {
            title: 'Board',
            href: route('projects.board', project.id as string),
        },
    ];

    const handleDragEnd = ({ active, over }: CustomDragEndEvent<{ item: Shared.Data.BoardItem; currentColumnId: string }>) => {
        const {
            data: {
                current: { item: task },
            },
        } = active;
        const { id: overId } = over || { id: null };

        setIsDragging(null);

        router.put(
            route('tasks.update', task.id),
            {
                title: task.data.title,
                description: task.data.description,
                tags: task.data.tags,
                due_date: task.data.due_date,
                priority: task.data.priority,
                project_id: task.data.project_id,
                status: overId,
            },
            {
                replace: true,
                only: ['columns'],
                onSuccess: () => {
                    toast.success('Task updated successfully');
                },
            },
        );
    };

    const handleDragStart = (e: DragStartEvent) => {
        setIsDragging(e.active);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} header={false}>
            <Head title={project.title} />

            <BoardComponent
                isDragging={isDragging}
                columns={columns}
                handleDragEnd={handleDragEnd}
                handleDragStart={handleDragStart}
                onItemClick={(item: Shared.Data.BoardItem) => {
                    setTask(item.data as Shared.Data.Task);
                    setView('edit');
                }}
                columnHeaderButton={({ id: status }) => {
                    return () => {
                        return (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2"
                                onClick={() => {
                                    setAddTaskStatusId(status);
                                    setView('add');
                                }}
                            >
                                <PlusCircle />
                            </Button>
                        );
                    };
                }}
            />
            <Sheet open={view === 'add'} onOpenChange={(open) => !open && setView('board')}>
                <SheetContent className="w-1/2 xl:w-1/3">
                    <div className="mt-10 px-5">
                        <AddTask
                            task={{
                                status: addTaskStatusId ?? '',
                            }}
                            onSuccess={() => setView('add')}
                        />
                    </div>
                </SheetContent>
            </Sheet>
            <Sheet open={view === 'edit'} onOpenChange={(open) => !open && setView('board')}>
                <SheetContent className="w-1/2 overflow-y-auto xl:w-1/3">{task && <TaskView task={task as Shared.Data.Task} />}</SheetContent>
            </Sheet>
        </AppLayout>
    );
}
