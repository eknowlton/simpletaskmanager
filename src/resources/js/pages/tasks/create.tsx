import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { TaskForm, TaskFormSchema } from '@/components/task-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { z } from 'zod';

export default function Create({ projects, statuses }: { projects: Project[]; statuses: Status[] | null }) {
    const breadcrumbs: BreadcrumbItem[] = [];

    breadcrumbs.push(
        {
            title: 'All Tasks',
            href: route('tasks.index'),
        },
        {
            title: 'Create Task',
            href: route('tasks.create'),
        },
    );

    const onSubmit = (data: z.infer<typeof TaskFormSchema>) => {
        const task = { ...data, due_date: data.due_date?.toISOString() };
        router.post(route('tasks.store'), task, {
            onFinish: () => {
                toast.success('Task created successfully!');
                router.visit(route('tasks.index'));
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a Task" />
            <div className="flex h-full flex-1 flex-row flex-wrap gap-4 overflow-x-auto rounded-xl p-4">
                <ContentContainer>
                    <ContentHeader title={`Create a Task`} />
                    <ContentBody>
                        <TaskForm onSubmit={onSubmit} statuses={statuses} projects={projects} />
                    </ContentBody>
                </ContentContainer>
            </div>
        </AppLayout>
    );
}
