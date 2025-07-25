import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { PaginatedCollectionPaging } from '@/components/paginated-collection-paging';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Check, CheckCheck, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Projects',
        href: '/projects',
    },
];

export default function Index({ projects }: { projects: PaginatedCollection<App.Data.Project> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex flex-row flex-wrap gap-4 overflow-x-auto rounded-xl px-4 pt-4">
                <Button asChild>
                    <Link href={route('projects.create')} prefetch>
                        <Plus />
                        New Project
                    </Link>
                </Button>
            </div>
            <div className="flex h-full flex-1 flex-row flex-wrap gap-4 overflow-x-auto rounded-xl p-4">
                <ContentContainer className="w-auto">
                    <ContentHeader title="All Projects" />
                    <ContentBody>
                        {projects.data.length > 0 ? (
                            <>
                                <div className="p-4">
                                    {projects.data.map((project: App.Data.Project) => (
                                        <div
                                            key={project.id}
                                            className="mb-2 flex flex-col rounded-md border border-l-8 p-4 hover:bg-gray-100 dark:hover:bg-gray-900"
                                            style={{ borderColor: project.color ?? '#4F46E5' }}
                                        >
                                            <div className="flex flex-grow flex-row">
                                                <Link href={route('projects.show', project.id)} className="flex-grow text-xl">
                                                    {project.title}
                                                </Link>
                                                <div>{project.status.label}</div>
                                            </div>
                                            <div className="flex">
                                                <div className="flex-grow text-gray-700 dark:text-gray-400">{project.description}</div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span className="ml-2 flex items-center gap-2 text-sm text-gray-500">
                                                        <Check className="h-4 w-4" />
                                                        {project.tasks_count}
                                                    </span>
                                                    <span className="ml-2 flex items-center gap-2 text-sm text-gray-500">
                                                        <CheckCheck className="h-4 w-4" />
                                                        {project.completed_tasks_count}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <PaginatedCollectionPaging collection={projects} />
                            </>
                        ) : (
                            <p className="p-4">No projects.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
            </div>
        </AppLayout>
    );
}
