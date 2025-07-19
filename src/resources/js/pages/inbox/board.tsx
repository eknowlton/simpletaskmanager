import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { ClockAlert } from 'lucide-react';
import React, { useState } from 'react';

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

function Card({ task, columnId }: { task: Task; columnId: string }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id,
        data: { task, currentColumnId: columnId },
    });

    const style = {
        transform: isDragging ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)` : undefined,
    } as React.CSSProperties;

    return (
        <button
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="border-acccent relative flex w-full flex-col items-start rounded-lg border-2 bg-background p-3 dark:border-sidebar"
        >
            <div className="flex flex-row px-2 font-bold">
                <div>{task.title}</div>
                {task.tags &&
                    task.tags.map((tag) => (
                        <Badge key={tag.id} variant={`default`} className="ml-2">
                            {tag.label}
                        </Badge>
                    ))}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-400">
                <div className="flex-grow">&nbsp;</div>
                <ClockAlert className="h-4 w-4" /> {new Date(task.due_date).toLocaleString()}
            </div>
        </button>
    );
}

function Column({ id, title, items }: { id: string; title: string; items: Task[] }) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <ContentContainer ref={setNodeRef} className={cn('scroll-hide w-1/4', isOver ? 'bg-gray-100 dark:bg-white/10' : '')}>
            <ContentHeader title={`${title} ( ${items.length} )`} />
            <ContentBody className="flex flex-col gap-3">
                {items && items.map((item) => <Card columnId={id} key={item.id} task={item} />)}
            </ContentBody>
        </ContentContainer>
    );
}

type CustomDragEndEvent<a> = DragEndEvent & {
    active: {
        data: {
            current: a;
        };
    };
};

export default function Board({ columns: apiColumns }: { columns: { id: string; title: string; items: Task[] }[] }) {
    const [columns, setColumns] = useState<{ id: string; title: string; items: Task[] }[]>(apiColumns);
    const [isDragging, setIsDragging] = useState<any>(null);

    const handleDragEnd = ({ active, over }: CustomDragEndEvent<{ task: Task; currentColumnId: string }>) => {
        const {
            data: {
                current: { task, currentColumnId },
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

            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <div className="flex flex-grow flex-row gap-4 rounded-xl p-4">
                    {columns &&
                        columns.map(({ id, title, items }: { id: string; title: string; items: Task[] }) => (
                            <Column key={id} id={id} title={title} items={items} />
                        ))}
                </div>
                {isDragging && (
                    <DragOverlay>
                        <Card task={isDragging.data.current.task} columnId={isDragging.data.current.currentColumnId} />
                    </DragOverlay>
                )}
            </DndContext>
        </AppLayout>
    );
}
