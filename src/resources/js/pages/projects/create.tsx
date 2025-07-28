import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { ProjectForm, ProjectFormData } from '@/components/project-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';

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

export default function Create({}: {}) {
    const { project_statuses: statuses } = usePage<SharedProps>().props;
    const form = useForm<ProjectFormData>({
        title: '',
        description: '',
        status: statuses?.[0]?.value || 'active',
        icon: '',
        color: '',
        id: 0,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('projects.store'), {
            onSuccess: () => {
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
                        <ProjectForm form={form} onSubmit={onSubmit} />
                    </ContentBody>
                </ContentContainer>
            </div>
        </AppLayout>
    );
}
