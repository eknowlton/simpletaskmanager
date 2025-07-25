import { Board as BoardComponent, CustomDragEndEvent } from '@/components/board';
import { TaskForm } from '@/components/task-form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DragStartEvent } from '@dnd-kit/core';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: route('inbox.index'),
    },
    {
        title: 'Board',
        href: route('inbox.board'),
    },
];

export default function Board({ columns: apiColumns, statuses }: { columns: Shared.Data.BoardColumn[]; statuses: Shared.Data.TaskStatus[] }) {
    console.log('Board component rendered with columns:', apiColumns);
    const [columns, setColumns] = useState<Shared.Data.BoardColumn[]>(apiColumns);
    const [isDragging, setIsDragging] = useState<any>(null);
    const [addTask, setAddTask] = useState(false);

    const handleDragEnd = ({ active, over }: CustomDragEndEvent<{ item: Shared.Data.BoardItem; currentColumnId: string }>) => {
        const {
            data: {
                current: { item: task, currentColumnId },
            },
        } = active;
        const { id: overId } = over || { id: null };
        const revert = columns;

        setIsDragging(null);

        // remove the column from view to prevent flickering
        setColumns((prevColumns) =>
            prevColumns.map((column) => {
                if (column.id === currentColumnId && overId !== currentColumnId) {
                    return {
                        ...column,
                        items: column.items.filter((item) => item.id !== task.id),
                    };
                }
                return column;
            }),
        );

        if (overId != null && currentColumnId !== overId) {
            axios
                .post(route('inbox.board.task.update', task.id), {
                    status: overId,
                })
                .then((response) => {
                    if (response.status === 206) {
                        setColumns(response.data.columns);
                        return;
                    }

                    setColumns(revert);
                });
        }
    };

    const handleDragStart = (e: DragStartEvent) => {
        setIsDragging(e.active);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} header={false}>
            <Head title="Tasks" />

            <BoardComponent
                isDragging={isDragging}
                columns={columns}
                handleDragEnd={handleDragEnd}
                handleDragStart={handleDragStart}
                columnHeaderButton={(column) => {
                    return () => (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={() => {
                                setAddTask(true);
                            }}
                        >
                            <PlusCircle />
                        </Button>
                    );
                }}
            />
            <Sheet open={addTask} onOpenChange={(open) => !open && setAddTask(false)}>
                <SheetContent className="w-1/2 xl:w-1/3">
                    <div className="mt-10 px-5">
                        <TaskForm onSubmit={() => {}} statuses={statuses} />
                    </div>
                </SheetContent>
            </Sheet>
        </AppLayout>
    );
}
