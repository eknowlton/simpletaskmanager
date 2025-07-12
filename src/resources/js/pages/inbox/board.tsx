import { KanbanBoardProvider } from '@/components/kanban';
import { MyKanbanBoard } from '@/components/kanban-board';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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

export default function Board({ columns }: { columns: any }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />

            <div className="h-full p-4">
                <KanbanBoardProvider>
                    <MyKanbanBoard value={columns} />
                </KanbanBoardProvider>
            </div>
        </AppLayout>
    );
}
