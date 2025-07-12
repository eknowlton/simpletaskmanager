import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: '/inbox',
    },
];

export default function Inbox({ inbox, twoMinute }: { inbox: Task[]; twoMinute: Task[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inbox" />
            <div className="flex h-full flex-row gap-4 overflow-x-auto rounded-xl p-4">
                <ContentContainer className="flex-grow">
                    <ContentHeader title="Inbox" />
                    <ContentBody>
                        {inbox.length > 0 ? (
                            <div className="p-4">
                                {inbox.map((task) => (
                                    <div
                                        key={task.id}
                                        className="dark:hover:bg-white/3 mb-2 flex flex-col justify-between rounded-md border p-2 hover:bg-gray-100"
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
                                                <span className="pl-4">{new Date(task.due_date).toLocaleString()}</span>
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
                <ContentContainer className="w-1/5">
                    <ContentHeader title="2-Minute Tasks" />
                    <ContentBody>
                        {twoMinute.length > 0 ? (
                            <div className="p-4">
                                {twoMinute.map((task) => (
                                    <div
                                        key={task.id}
                                        className="dark:hover:bg-white/3 mb-2 flex flex-col justify-between rounded-md border p-2 hover:bg-gray-100"
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
                                                <span className="pl-4">{new Date(task.due_date).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="p-4">No two minute tasks.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
            </div>
        </AppLayout>
    );
}
