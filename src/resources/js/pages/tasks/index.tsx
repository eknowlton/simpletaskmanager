import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { PaginatedCollectionPaging } from '@/components/paginated-collection-paging';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

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

export default function Index({ tasks }: { tasks: PaginatedCollection<Task> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="flex flex-row flex-wrap gap-4 overflow-x-auto rounded-xl px-4 pt-4">
                <Button asChild>
                    <Link href={route('tasks.create')} prefetch>
                        New Task
                    </Link>
                </Button>
            </div>
            <div className="flex h-full flex-1 flex-row flex-wrap gap-4 overflow-x-auto rounded-xl p-4">
                <ContentContainer>
                    <ContentHeader title="All Tasks" />
                    <ContentBody>
                        {tasks.data.length > 0 ? (
                            <>
                                <div className="p-4">
                                    {tasks.data.map((task) => (
                                        <div
                                            key={task.id}
                                            className="mb-2 flex flex-col justify-between rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-white/3"
                                        >
                                            <div className="flex flex-grow">
                                                <Link href={`/tasks/${task.id}/show`} className="flex-grow text-lg">
                                                    {task.title}
                                                </Link>
                                                <div>
                                                    {task.status_label}{' '}
                                                    <span className="text-sm text-gray-700 dark:text-gray-400">( {task.priority} )</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-grow">
                                                <div className="flex-grow text-gray-700 dark:text-gray-400">{task.description}</div>
                                                <div>
                                                    <span className="bold text-sm text-gray-700 dark:text-gray-400">Due On</span>
                                                    <span className="pl-4">{task.due_date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <PaginatedCollectionPaging collection={tasks} />
                            </>
                        ) : (
                            <p className="p-4">No tasks.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
            </div>
        </AppLayout>
    );
}
