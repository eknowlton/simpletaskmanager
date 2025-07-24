import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { ProjectForm, ProjectFormSchema } from '@/components/project-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Projects',
        href: '/projects',
    },
    {
        title: 'Create a Project',
        href: '/projects/create',
    },
];

export default function Create({ statuses }: { statuses: Status[] | null }) {
    const onSubmit = (data: z.infer<typeof ProjectFormSchema>) => {
        console.log('Submitting project data:', data);
        router.post(route('projects.store'), data, {
            onFinish: () => {
                toast.success('Project created successfully!');
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a Project" />
            <div className="flex h-full flex-1 flex-row flex-wrap gap-4 overflow-x-auto rounded-xl p-4">
                <ContentContainer>
                    <ContentHeader title="Create a Project" />
                    <ContentBody>
                        <ProjectForm statuses={statuses} onSubmit={onSubmit} />
                    </ContentBody>
                </ContentContainer>
            </div>
        </AppLayout>
    );
}
