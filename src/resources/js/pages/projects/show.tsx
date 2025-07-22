import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ChartNoAxesCombined, Plus, Sparkles } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Projects',
        href: '/tasks',
    },
];

export default function Show({ project, tasks }: { project: Project; tasks: Task[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs.concat([{ title: `${project.title}`, href: `/project/${project.id}/show` }])}>
            <Head title={`${project.title}`} />

            <div className="flex flex-row flex-wrap gap-4 overflow-x-auto rounded-xl px-4 pt-4">
                <Button asChild>
                    <Link href={route('projects.tasks.create', project.id)} prefetch>
                        <Plus />
                        New Task
                    </Link>
                </Button>
                <Button asChild>
                    <Link href={route('projects.edit', project.id)} prefetch>
                        Edit Project
                    </Link>
                </Button>
            </div>

            <div className="flex h-full flex-1 flex-col flex-wrap gap-4 overflow-x-auto rounded-xl p-4">
                <ContentContainer>
                    <ContentHeader title={project.title} description={`Inbox`} />
                    <ContentBody>
                        <div className="mx-4 flex flex-grow flex-row gap-2">
                            <Input className="w-1/5" placeholder="Search tasks..." />
                            <div className="flex-grow"></div>
                            <div className="flex flex-row items-center gap-2 rounded-lg bg-gray-300 px-3 dark:bg-gray-900">
                                <Checkbox id="two-minute" className="border-gray-400" />
                                <Label htmlFor="two-minute">2-Minute</Label>
                            </div>
                            <div className="flex flex-row items-center gap-2 rounded-lg bg-gray-300 px-3 dark:bg-gray-900">
                                <Checkbox id="urgent" className="border-gray-400" />
                                <Label htmlFor="urgent">Urgent</Label>
                            </div>
                            <div className="flex flex-row items-center gap-2 rounded-lg bg-gray-300 px-3 dark:bg-gray-900">
                                <Checkbox id="important" className="border-gray-400" />
                                <Label htmlFor="important">Important</Label>
                            </div>
                            <Select name="status">
                                <SelectTrigger className="w-1/5">
                                    <SelectValue placeholder="Filter by Status" />
                                </SelectTrigger>
                                <SelectContent className="">
                                    <SelectItem value={'1'}>Test 1</SelectItem>
                                    <SelectItem value={'2'}>Test 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {tasks.length > 0 ? (
                            <>
                                <div className="p-4">
                                    {tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="mb-2 flex flex-col justify-between rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-white/3"
                                        >
                                            <div className="flex flex-grow">
                                                <Link href={route('tasks.show', task.id)} className="flex-grow text-lg">
                                                    {task.title}
                                                </Link>
                                                <div className="flex items-center gap-2">
                                                    <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                                                        <ChartNoAxesCombined className="h-4 w-4" /> {task.status_label}
                                                    </span>
                                                    <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                                                        <Sparkles className="h-4 w-4" /> {task.priority}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-grow">
                                                <div className="flex-grow text-gray-700 dark:text-gray-400">{task.description}</div>
                                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                                                    <Calendar className="h-4 w-4" />
                                                    <span className="">{task.due_date}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-grow pt-2">
                                                <div className="flex-grow"></div>
                                                <div className="text-gray-700 dark:text-gray-400">
                                                    {task.tags &&
                                                        task.tags.length > 0 &&
                                                        task.tags.map(({ label, value }) => (
                                                            <span
                                                                key={value}
                                                                className="ml-2 inline-block rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                                            >
                                                                {label}
                                                            </span>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className="p-6">No tasks in project.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
            </div>
        </AppLayout>
    );
}
