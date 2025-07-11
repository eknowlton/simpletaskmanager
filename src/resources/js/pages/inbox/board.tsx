import KanbanBoardPage from '@/components/kanban-board';
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

export default function Board({ tasks }: { tasks: PaginatedCollection<Task> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <KanbanBoardPage />
        </AppLayout>
    );
}
