import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DndContext, DragEndEvent, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { ClockAlert } from 'lucide-react';
import React from 'react';

function Card({ item, columnId }: { item: App.Data.BoardItem; columnId: string }) {
    const task = item.data as App.Data.Task;
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: item.id,
        data: { item, currentColumnId: columnId },
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
                    task.tags.map((tag: App.Data.Tag) => (
                        <Badge key={tag.value} variant={`default`} className="ml-2">
                            {tag.label}
                        </Badge>
                    ))}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-400">
                <div className="flex-grow">&nbsp;</div>
                {task.due_date && (
                    <>
                        <ClockAlert className="h-4 w-4" /> {new Date(task.due_date ?? '').toLocaleString()}
                    </>
                )}
            </div>
        </button>
    );
}

function Column({ id, title, items, columnHeaderButton }: App.Data.BoardColumn & { columnHeaderButton?: () => React.ReactNode }) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <ContentContainer ref={setNodeRef} className={cn('scroll-hide w-1/4', isOver ? 'bg-gray-100 dark:bg-white/10' : '')}>
            <ContentHeader title={`${title} ( ${items.length} )`} right={columnHeaderButton?.()} />
            <ContentBody className="flex flex-col gap-3">
                {items && items.map((item) => <Card columnId={id} key={item.id} item={item} />)}
            </ContentBody>
        </ContentContainer>
    );
}

export type CustomDragEndEvent<a> = DragEndEvent & {
    active: {
        data: {
            current: a;
        };
    };
};

export function Board({
    columns,
    handleDragEnd,
    handleDragStart,
    isDragging,
    columnHeaderButton,
}: {
    columns: App.Data.BoardColumn[];
    handleDragEnd: (event: CustomDragEndEvent<{ item: App.Data.Task; currentColumnId: string }>) => void;
    handleDragStart: (event: DragEndEvent) => void;
    isDragging: any;
    columnHeaderButton?: (props: { id: string; title: string }) => () => React.ReactNode;
}) {
    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="flex flex-grow flex-row gap-4 rounded-xl p-4">
                {columns &&
                    columns.map(({ id, title, items, color }: App.Data.BoardColumn) => (
                        <Column color={color} key={id} id={id} title={title} items={items} columnHeaderButton={columnHeaderButton?.({ id, title })} />
                    ))}
            </div>
            {isDragging && (
                <DragOverlay>
                    <Card item={isDragging.data.current.item} columnId={isDragging.data.current.currentColumnId} />
                </DragOverlay>
            )}
        </DndContext>
    );
}
