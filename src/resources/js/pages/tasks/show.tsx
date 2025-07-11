import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { TaskForm } from '@/components/task-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Tasks',
        href: '/tasks',
    },
];

export default function Show({ task, projects, statuses }: { task: Task; projects: Project[]; statuses: { name: string; value: string }[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs.concat([{ title: `${task.title}`, href: `/tasks/${task.id}/show` }])}>
            <Head title={`${task.title}`} />
            <div className="flex h-full flex-1 flex-row flex-wrap gap-4 overflow-x-auto rounded-xl p-4">
                <ContentContainer>
                    <ContentHeader title={`${task.title}`} />
                    <ContentBody>
                        <TaskForm task={task} statuses={statuses} projects={projects} onSubmit={() => {}} />
                    </ContentBody>
                </ContentContainer>
            </div>
        </AppLayout>
    );
}
