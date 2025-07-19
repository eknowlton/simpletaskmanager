import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Projects',
        href: route('projects.index'),
    },
];

export default function Board({ project, columns }: { project: Project; columns: any }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs.concat([{ title: `${project.title}`, href: `/project/${project.id}/show` }])}>
            <Head title="Tasks" />

            <div className="h-full p-4"></div>
        </AppLayout>
    );
}
