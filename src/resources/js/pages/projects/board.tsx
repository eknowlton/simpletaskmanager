import { Board as BoardComponent, CustomDragEndEvent } from '@/components/board';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DragStartEvent } from '@dnd-kit/core';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function Board({ columns: apiColumns, project }: { columns: { id: string; title: string; items: Task[] }[]; project: Project }) {
    console.log('columns', apiColumns);
    const [columns, setColumns] = useState<{ id: string; title: string; items: Task[] }[]>(apiColumns);
    const [isDragging, setIsDragging] = useState<any>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'All Projects',
            href: route('projects.index'),
        },
        {
            title: project.title,
            href: route('projects.show', project.id),
        },
        {
            title: 'Board',
            href: route('projects.board', project.id),
        },
    ];

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
                .post(route('projects.board.task.update', { project: project.id, task: task.id }), {
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
            <Head title={project.title} />

            <BoardComponent isDragging={isDragging} columns={columns} handleDragEnd={handleDragEnd} handleDragStart={handleDragStart} />
        </AppLayout>
    );
}
