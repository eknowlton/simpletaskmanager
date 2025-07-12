import { MoreHorizontalIcon, PenIcon, Trash2Icon } from 'lucide-react';
import type { FormEvent, KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useJsLoaded } from '@/hooks/use-js-loaded';
import {
    KANBAN_BOARD_CIRCLE_COLORS,
    KanbanBoard,
    KanbanBoardCard,
    KanbanBoardCardButton,
    KanbanBoardCardButtonGroup,
    KanbanBoardCardDescription,
    KanbanBoardCardTextarea,
    KanbanBoardCircleColor,
    KanbanBoardColumn,
    KanbanBoardColumnHeader,
    KanbanBoardColumnIconButton,
    KanbanBoardColumnList,
    KanbanBoardColumnListItem,
    KanbanBoardColumnSkeleton,
    KanbanBoardColumnTitle,
    KanbanBoardDropDirection,
    KanbanBoardExtraMargin,
    KanbanColorCircle,
    useDndEvents,
} from './kanban';

const createId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Types
type Card = {
    id: string;
    title: string;
};

type Column = {
    id: string;
    title: string;
    color: KanbanBoardCircleColor;
    items: Card[];
};

export function MyKanbanBoard({ value }: { value: any }) {
    const [columns, setColumns] = useState<Column[]>(value);

    // Scroll to the right when a new column is added.
    const scrollContainerReference = useRef<HTMLDivElement>(null);

    function scrollRight() {
        if (scrollContainerReference.current) {
            scrollContainerReference.current.scrollLeft = scrollContainerReference.current.scrollWidth;
        }
    }

    /*
  Column logic
  */

    const handleAddColumn = (title?: string) => {
        if (title) {
            flushSync(() => {
                setColumns((previousColumns) => [
                    ...previousColumns,
                    {
                        id: createId(),
                        title,
                        color: KANBAN_BOARD_CIRCLE_COLORS[previousColumns.length] ?? 'primary',
                        items: [],
                    },
                ]);
            });
        }

        scrollRight();
    };

    function handleDeleteColumn(columnId: string) {
        flushSync(() => {
            setColumns((previousColumns) => previousColumns.filter((column) => column.id !== columnId));
        });

        scrollRight();
    }

    function handleUpdateColumnTitle(columnId: string, title: string) {
        setColumns((previousColumns) => previousColumns.map((column) => (column.id === columnId ? { ...column, title } : column)));
    }

    /*
  Card logic
  */

    function handleAddCard(columnId: string, cardContent: string) {
        setColumns((previousColumns) =>
            previousColumns.map((column) =>
                column.id === columnId
                    ? {
                          ...column,
                          items: [...column.items, { id: createId(), title: cardContent }],
                      }
                    : column,
            ),
        );
    }

    function handleDeleteCard(cardId: string) {
        setColumns((previousColumns) =>
            previousColumns.map((column) =>
                column.items.some((card) => card.id === cardId) ? { ...column, items: column.items.filter(({ id }) => id !== cardId) } : column,
            ),
        );
    }

    function handleMoveCardToColumn(columnId: string, index: number, card: Card) {
        setColumns((previousColumns) =>
            previousColumns.map((column) => {
                if (column.id === columnId) {
                    // Remove the card from the column (if it exists) before reinserting it.
                    const updatedItems = column.items.filter(({ id }) => id !== card.id);
                    return {
                        ...column,
                        items: [
                            // Items before the insertion index.
                            ...updatedItems.slice(0, index),
                            // Insert the card.
                            card,
                            // Items after the insertion index.
                            ...updatedItems.slice(index),
                        ],
                    };
                } else {
                    // Remove the card from other columns.
                    return {
                        ...column,
                        items: column.items.filter(({ id }) => id !== card.id),
                    };
                }
            }),
        );
    }

    function handleUpdateCardTitle(cardId: string, cardTitle: string) {
        setColumns((previousColumns) =>
            previousColumns.map((column) =>
                column.items.some((card) => card.id === cardId)
                    ? {
                          ...column,
                          items: column.items.map((card) => (card.id === cardId ? { ...card, title: cardTitle } : card)),
                      }
                    : column,
            ),
        );
    }

    /*
  Moving cards with the keyboard.
  */
    const [activeCardId, setActiveCardId] = useState<string>('');
    const originalCardPositionReference = useRef<{
        columnId: string;
        cardIndex: number;
    } | null>(null);
    const { onDragStart, onDragEnd, onDragCancel, onDragOver } = useDndEvents();

    // This helper returns the appropriate overId after a card is placed.
    // If there's another card below, return that card's id, otherwise return the column's id.
    function getOverId(column: Column, cardIndex: number): string {
        if (cardIndex < column.items.length - 1) {
            return column.items[cardIndex + 1].id;
        }

        return column.id;
    }

    // Find column and index for a given card.
    function findCardPosition(cardId: string): {
        columnIndex: number;
        cardIndex: number;
    } {
        for (const [columnIndex, column] of columns.entries()) {
            const cardIndex = column.items.findIndex((c) => c.id === cardId);

            if (cardIndex !== -1) {
                return { columnIndex, cardIndex };
            }
        }

        return { columnIndex: -1, cardIndex: -1 };
    }

    function moveActiveCard(cardId: string, direction: 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown') {
        const { columnIndex, cardIndex } = findCardPosition(cardId);
        if (columnIndex === -1 || cardIndex === -1) return;

        const card = columns[columnIndex].items[cardIndex];

        let newColumnIndex = columnIndex;
        let newCardIndex = cardIndex;

        switch (direction) {
            case 'ArrowUp': {
                newCardIndex = Math.max(cardIndex - 1, 0);

                break;
            }
            case 'ArrowDown': {
                newCardIndex = Math.min(cardIndex + 1, columns[columnIndex].items.length - 1);

                break;
            }
            case 'ArrowLeft': {
                newColumnIndex = Math.max(columnIndex - 1, 0);
                // Keep same cardIndex if possible, or if out of range, insert at end
                newCardIndex = Math.min(newCardIndex, columns[newColumnIndex].items.length);

                break;
            }
            case 'ArrowRight': {
                newColumnIndex = Math.min(columnIndex + 1, columns.length - 1);
                newCardIndex = Math.min(newCardIndex, columns[newColumnIndex].items.length);

                break;
            }
        }

        // Perform state update in flushSync to ensure immediate state update.
        flushSync(() => {
            handleMoveCardToColumn(columns[newColumnIndex].id, newCardIndex, card);
        });

        // Find the card's new position and announce it.
        const { columnIndex: updatedColumnIndex, cardIndex: updatedCardIndex } = findCardPosition(cardId);
        const overId = getOverId(columns[updatedColumnIndex], updatedCardIndex);

        onDragOver(cardId, overId);
    }

    function handleCardKeyDown(event: KeyboardEvent<HTMLButtonElement>, cardId: string) {
        const { key } = event;

        if (activeCardId === '' && key === ' ') {
            // Pick up the card.
            event.preventDefault();
            setActiveCardId(cardId);
            onDragStart(cardId);

            const { columnIndex, cardIndex } = findCardPosition(cardId);
            originalCardPositionReference.current = columnIndex !== -1 && cardIndex !== -1 ? { columnId: columns[columnIndex].id, cardIndex } : null;
        } else if (activeCardId === cardId) {
            // Card is already active.
            // eslint-disable-next-line unicorn/prefer-switch
            if (key === ' ' || key === 'Enter') {
                event.preventDefault();
                // Drop the card.
                flushSync(() => {
                    setActiveCardId('');
                });

                const { columnIndex, cardIndex } = findCardPosition(cardId);
                if (columnIndex !== -1 && cardIndex !== -1) {
                    const overId = getOverId(columns[columnIndex], cardIndex);
                    onDragEnd(cardId, overId);
                } else {
                    // If we somehow can't find the card, just call onDragEnd with cardId.
                    onDragEnd(cardId);
                }

                originalCardPositionReference.current = null;
            } else if (key === 'Escape') {
                event.preventDefault();

                // Cancel the drag.
                if (originalCardPositionReference.current) {
                    const { columnId, cardIndex } = originalCardPositionReference.current;
                    const { columnIndex: currentColumnIndex, cardIndex: currentCardIndex } = findCardPosition(cardId);

                    // Revert card only if it moved.
                    if (currentColumnIndex !== -1 && (columnId !== columns[currentColumnIndex].id || cardIndex !== currentCardIndex)) {
                        const card = columns[currentColumnIndex].items[currentCardIndex];
                        flushSync(() => {
                            handleMoveCardToColumn(columnId, cardIndex, card);
                        });
                    }
                }

                onDragCancel(cardId);
                originalCardPositionReference.current = null;

                setActiveCardId('');
            } else if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
                event.preventDefault();
                moveActiveCard(cardId, key);
                // onDragOver is called inside moveActiveCard after placement.
            }
        }
    }

    function handleCardBlur() {
        setActiveCardId('');
    }

    const jsLoaded = useJsLoaded();

    return (
        <KanbanBoard ref={scrollContainerReference}>
            {columns.map((column) =>
                jsLoaded ? (
                    <MyKanbanBoardColumn
                        activeCardId={activeCardId}
                        column={column}
                        key={column.id}
                        onAddCard={handleAddCard}
                        onCardBlur={handleCardBlur}
                        onCardKeyDown={handleCardKeyDown}
                        onDeleteCard={handleDeleteCard}
                        onDeleteColumn={handleDeleteColumn}
                        onMoveCardToColumn={handleMoveCardToColumn}
                        onUpdateCardTitle={handleUpdateCardTitle}
                        onUpdateColumnTitle={handleUpdateColumnTitle}
                    />
                ) : (
                    <KanbanBoardColumnSkeleton key={column.id} />
                ),
            )}

            <KanbanBoardExtraMargin />
        </KanbanBoard>
    );
}

function MyKanbanBoardColumn({
    activeCardId,
    column,
    onAddCard,
    onCardBlur,
    onCardKeyDown,
    onDeleteCard,
    onDeleteColumn,
    onMoveCardToColumn,
    onUpdateCardTitle,
    onUpdateColumnTitle,
}: {
    activeCardId: string;
    column: Column;
    onAddCard: (columnId: string, cardContent: string) => void;
    onCardBlur: () => void;
    onCardKeyDown: (event: KeyboardEvent<HTMLButtonElement>, cardId: string) => void;
    onDeleteCard: (cardId: string) => void;
    onDeleteColumn: (columnId: string) => void;
    onMoveCardToColumn: (columnId: string, index: number, card: Card) => void;
    onUpdateCardTitle: (cardId: string, cardTitle: string) => void;
    onUpdateColumnTitle: (columnId: string, columnTitle: string) => void;
}) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const listReference = useRef<HTMLUListElement>(null);
    const moreOptionsButtonReference = useRef<HTMLButtonElement>(null);
    const { onDragCancel, onDragEnd } = useDndEvents();

    function scrollList() {
        if (listReference.current) {
            listReference.current.scrollTop = listReference.current.scrollHeight;
        }
    }

    function closeDropdownMenu() {
        flushSync(() => {
            setIsEditingTitle(false);
        });

        moreOptionsButtonReference.current?.focus();
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const columnTitle = formData.get('columnTitle') as string;
        onUpdateColumnTitle(column.id, columnTitle);
        closeDropdownMenu();
    }

    function handleDropOverColumn(dataTransferData: string) {
        const card = JSON.parse(dataTransferData) as Card;
        onMoveCardToColumn(column.id, 0, card);
    }

    function handleDropOverListItem(cardId: string) {
        return (dataTransferData: string, dropDirection: KanbanBoardDropDirection) => {
            const card = JSON.parse(dataTransferData) as Card;
            const cardIndex = column.items.findIndex(({ id }) => id === cardId);
            const currentCardIndex = column.items.findIndex(({ id }) => id === card.id);

            const baseIndex = dropDirection === 'top' ? cardIndex : cardIndex + 1;
            const targetIndex = currentCardIndex !== -1 && currentCardIndex < baseIndex ? baseIndex - 1 : baseIndex;

            // Safety check to ensure targetIndex is within bounds
            const safeTargetIndex = Math.max(0, Math.min(targetIndex, column.items.length));
            const overCard = column.items[safeTargetIndex];

            if (card.id === overCard?.id) {
                onDragCancel(card.id);
            } else {
                onMoveCardToColumn(column.id, safeTargetIndex, card);
                onDragEnd(card.id, overCard?.id || column.id);
            }
        };
    }

    return (
        <KanbanBoardColumn columnId={column.id} key={column.id} onDropOverColumn={handleDropOverColumn} className="h-full">
            <KanbanBoardColumnHeader>
                {isEditingTitle ? (
                    <form
                        className="w-full"
                        onSubmit={handleSubmit}
                        onBlur={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget)) {
                                closeDropdownMenu();
                            }
                        }}
                    >
                        <Input
                            aria-label="Column title"
                            autoFocus
                            defaultValue={column.title}
                            name="columnTitle"
                            onKeyDown={(event) => {
                                if (event.key === 'Escape') {
                                    closeDropdownMenu();
                                }
                            }}
                            required
                        />
                    </form>
                ) : (
                    <>
                        <KanbanBoardColumnTitle columnId={column.id}>
                            <KanbanColorCircle color={column.color} />
                            {column.title}
                        </KanbanBoardColumnTitle>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <KanbanBoardColumnIconButton ref={moreOptionsButtonReference}>
                                    <MoreHorizontalIcon />

                                    <span className="sr-only">More options for {column.title}</span>
                                </KanbanBoardColumnIconButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Column</DropdownMenuLabel>

                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => setIsEditingTitle(true)}>
                                        <PenIcon />
                                        Edit Details
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="text-destructive" onClick={() => onDeleteColumn(column.id)}>
                                        <Trash2Icon />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}
            </KanbanBoardColumnHeader>

            <KanbanBoardColumnList ref={listReference}>
                {column.items.map((card) => (
                    <KanbanBoardColumnListItem cardId={card.id} key={card.id} onDropOverListItem={handleDropOverListItem(card.id)}>
                        <MyKanbanBoardCard
                            card={card}
                            isActive={activeCardId === card.id}
                            onCardBlur={onCardBlur}
                            onCardKeyDown={onCardKeyDown}
                            onDeleteCard={onDeleteCard}
                            onUpdateCardTitle={onUpdateCardTitle}
                        />
                    </KanbanBoardColumnListItem>
                ))}
            </KanbanBoardColumnList>
        </KanbanBoardColumn>
    );
}

function MyKanbanBoardCard({
    card,
    isActive,
    onCardBlur,
    onCardKeyDown,
    onDeleteCard,
    onUpdateCardTitle,
}: {
    card: Card;
    isActive: boolean;
    onCardBlur: () => void;
    onCardKeyDown: (event: KeyboardEvent<HTMLButtonElement>, cardId: string) => void;
    onDeleteCard: (cardId: string) => void;
    onUpdateCardTitle: (cardId: string, cardTitle: string) => void;
}) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const kanbanBoardCardReference = useRef<HTMLButtonElement>(null);
    // This ref tracks the previous `isActive` state. It is used to refocus the
    // card after it was discarded with the keyboard.
    const previousIsActiveReference = useRef(isActive);
    // This ref tracks if the card was cancelled via Escape.
    const wasCancelledReference = useRef(false);

    useEffect(() => {
        // Maintain focus after the card is picked up and moved.
        if (isActive && !isEditingTitle) {
            kanbanBoardCardReference.current?.focus();
        }

        // Refocus the card after it was discarded with the keyboard.
        if (!isActive && previousIsActiveReference.current && wasCancelledReference.current) {
            kanbanBoardCardReference.current?.focus();
            wasCancelledReference.current = false;
        }

        previousIsActiveReference.current = isActive;
    }, [isActive, isEditingTitle]);

    function handleBlur() {
        flushSync(() => {
            setIsEditingTitle(false);
        });

        kanbanBoardCardReference.current?.focus();
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cardTitle = formData.get('cardTitle') as string;
        onUpdateCardTitle(card.id, cardTitle);
        handleBlur();
    }

    return isEditingTitle ? (
        <form onBlur={handleBlur} onSubmit={handleSubmit}>
            <KanbanBoardCardTextarea
                aria-label="Edit card title"
                autoFocus
                defaultValue={card.title}
                name="cardTitle"
                onFocus={(event) => event.target.select()}
                onInput={(event) => {
                    const input = event.currentTarget as HTMLTextAreaElement;
                    if (/\S/.test(input.value)) {
                        // Clear the error message if input is valid
                        input.setCustomValidity('');
                    } else {
                        input.setCustomValidity('Card content cannot be empty or just whitespace.');
                    }
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        event.currentTarget.form?.requestSubmit();
                    }

                    if (event.key === 'Escape') {
                        handleBlur();
                    }
                }}
                placeholder="Edit card title ..."
                required
            />
        </form>
    ) : (
        <KanbanBoardCard
            data={card}
            isActive={isActive}
            onBlur={onCardBlur}
            onClick={() => setIsEditingTitle(true)}
            onKeyDown={(event) => {
                if (event.key === ' ') {
                    // Prevent the button "click" action on space because that should
                    // be used to pick up and move the card using the keyboard.
                    event.preventDefault();
                }

                if (event.key === 'Escape') {
                    // Mark that this card was cancelled.
                    wasCancelledReference.current = true;
                }

                onCardKeyDown(event, card.id);
            }}
            ref={kanbanBoardCardReference}
        >
            <KanbanBoardCardDescription className="text-sm">{card.title}</KanbanBoardCardDescription>
            <KanbanBoardCardButtonGroup disabled={isActive}>
                <KanbanBoardCardButton className="text-destructive" onClick={() => onDeleteCard(card.id)} tooltip="Delete card">
                    <Trash2Icon />

                    <span className="sr-only">Delete card</span>
                </KanbanBoardCardButton>
            </KanbanBoardCardButtonGroup>
        </KanbanBoardCard>
    );
}
