import KanbanBoardPage from '@/components/kanban-board';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Projects',
        href: route('projects.index'),
    },
];

export default function Board({ project, tasks }: { project: Project; tasks: PaginatedCollection<Task> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs.concat([{ title: `${project.title}`, href: `/project/${project.id}/show` }])}>
            <Head title="Tasks" />
            <KanbanBoardPage />
        </AppLayout>
    );
}
