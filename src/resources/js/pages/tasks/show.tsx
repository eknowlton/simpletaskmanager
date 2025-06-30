import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'All Tasks',
        href: '/tasks',
    },
];

export default function Show({ task }: { task: Task }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs.concat([{ title: `Task: ${task.title}`, href: `/tasks/${task.id}/show` }])}>
            <Head title={`Task: ${task.title}`} />
            <div className="flex h-full flex-1 flex-row flex-wrap gap-4 overflow-x-auto rounded-xl p-4">
                <ContentContainer>
                    <ContentHeader title={`Task: ${task.title}`} />
                    <ContentBody>Hello</ContentBody>
                </ContentContainer>
            </div>
        </AppLayout>
    );
}
