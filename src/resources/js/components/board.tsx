import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DndContext, DragEndEvent, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { ClockAlert, GripVertical } from 'lucide-react';
import React from 'react';

function Card({ item, columnId, onClick }: { item: Shared.Data.BoardItem; columnId: string; onClick?: () => void }) {
    const task = item.data as Shared.Data.Task;
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: item.id,
        data: { item, currentColumnId: columnId },
    });

    const style = {
        transform: isDragging ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)` : undefined,
    } as React.CSSProperties;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="border-acccent relative ml-1 flex w-full flex-row items-center rounded-lg border-2 bg-background p-3 transition-all transition-discrete dark:border-sidebar"
        >
            <button className="relative w-1 outline-none focus:outline-none" {...listeners}>
                <div className="-ml-8 inline-block border-t border-b border-l bg-black p-1">
                    <GripVertical size={15} />
                </div>
            </button>
            <div className="flex-grow">
                <div className="flex flex-row px-2 font-bold">
                    <button onClick={() => onClick?.()}>{task.title}</button>
                    {task.tags &&
                        task.tags.map((tag: Shared.Data.Tag) => (
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
            </div>
        </div>
    );
}

function Column({
    id,
    title,
    items,
    columnHeaderButton,
    onItemClick,
}: Shared.Data.BoardColumn & { columnHeaderButton?: () => React.ReactNode; onItemClick?: (item: Shared.Data.BoardItem) => void }) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <ContentContainer ref={setNodeRef} className={cn('scroll-hide w-1/4', isOver ? 'bg-gray-100 dark:bg-white/10' : '')}>
            <ContentHeader title={`${title} ( ${items.length} )`} right={columnHeaderButton?.()} />
            <ContentBody className="flex flex-col gap-3">
                {items && items.map((item) => <Card columnId={id} key={item.id} item={item} onClick={() => onItemClick?.(item)} />)}
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
    onItemClick,
}: {
    columns: Shared.Data.BoardColumn[];
    handleDragEnd: (event: CustomDragEndEvent<{ item: Shared.Data.BoardItem; currentColumnId: string }>) => void;
    handleDragStart: (event: DragEndEvent) => void;
    onItemClick?: (item: Shared.Data.BoardItem) => void;
    isDragging: any;
    columnHeaderButton?: (props: { id: string; title: string }) => () => React.ReactNode;
}) {
    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="flex flex-grow flex-row gap-4 rounded-xl p-4">
                {columns &&
                    columns.map(({ id, title, items, color }: Shared.Data.BoardColumn) => (
                        <Column
                            color={color}
                            key={id}
                            id={id}
                            title={title}
                            items={items}
                            columnHeaderButton={columnHeaderButton?.({ id, title })}
                            onItemClick={onItemClick}
                        />
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
