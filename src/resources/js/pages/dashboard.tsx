import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    pending_tasks,
    completed_tasks,
    cancelled_tasks,
    test,
}: {
    pending_tasks: Task[];
    completed_tasks: Task[];
    cancelled_tasks: Task[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-row flex-wrap gap-4 overflow-x-auto rounded-xl p-4">
                <ContentContainer className="w-auto">
                    <ContentHeader title="Pending" />
                    <ContentBody>
                        {pending_tasks.length > 0 ? (
                            <div className="p-4">
                                {pending_tasks.map((task) => (
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
                        ) : (
                            <p className="p-4">No pending tasks.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
                <ContentContainer className="w-auto">
                    <ContentHeader title="Completed" />
                    <ContentBody>
                        {completed_tasks.length > 0 ? (
                            <div className="p-4">
                                {completed_tasks.map((task) => (
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
                        ) : (
                            <p className="p-4">No completed tasks.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
                <ContentContainer className="w-auto">
                    <ContentHeader title="Cancelled" />
                    <ContentBody>
                        {cancelled_tasks.length > 0 ? (
                            <div className="p-4">
                                {cancelled_tasks.map((task) => (
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
                        ) : (
                            <p className="p-4">No cancelled tasks.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
            </div>
        </AppLayout>
    );
}
