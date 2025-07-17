import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { PaginatedCollectionPaging } from '@/components/paginated-collection-paging';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, ChartNoAxesCombined, CircleX, Plus, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Tasks',
        href: '/tasks',
    },
];

interface TaskFilter {
    search?: string;
    tags?: string[];
    status?: string;
}

const enabledTags = [
    { value: 'two-minute', label: '2-Minute' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'important', label: 'Important' },
];

export default function Index({
    tasks,
    statuses,
    filter,
}: {
    tasks: PaginatedCollection<Task>;
    statuses: { value: string; label: string }[];
    filter: TaskFilter;
}) {
    const [search, setSearch] = useState(filter.search || '');
    const [tags, setTags] = useState(filter.tags || []);
    const [status, setStatus] = useState<string | null>(filter.status || null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value.trim());
    };

    const handleSeachKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSearch(e.currentTarget.value.trim());
            handleFilter();
        }
    };

    const handleTag = (tag: string) => {
        return (e: React.MouseEvent<HTMLButtonElement>) => {
            setTags((prevTags) => {
                if (tags.includes(tag)) {
                    return prevTags.filter((t) => t !== tag);
                } else {
                    return [...prevTags, tag];
                }
            });
        };
    };

    const handleStatus = (value: string) => {
        if (value === 'all') {
            setStatus(null);
        }
        setStatus(value);
    };

    const handleFilter = () => {
        router.get(
            route('tasks.index'),
            {
                search: search || undefined,
                tags: tags.length > 0 ? tags : undefined,
                status: status || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleFilter();
        }, 300);
        return () => clearTimeout(timeout);
    }, [tags, status]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="flex flex-row flex-wrap gap-4 overflow-x-auto rounded-xl px-4 pt-4">
                <Button asChild>
                    <Link href={route('tasks.create')} prefetch>
                        <Plus />
                        New Task
                    </Link>
                </Button>
            </div>
            <div className="flex h-full flex-1 flex-row flex-wrap gap-4 overflow-x-auto rounded-xl p-4">
                <ContentContainer>
                    <ContentHeader title="All Tasks" />
                    <ContentBody>
                        <div className="mx-4 flex flex-grow flex-row items-center gap-2">
                            <Input
                                name="search"
                                className="w-1/5"
                                placeholder="Search tasks..."
                                onChange={handleSearchChange}
                                onKeyDown={handleSeachKeyDown}
                                value={search}
                            />
                            <div className="flex-grow"></div>
                            {enabledTags.map((tag) => (
                                <div className="flex flex-row items-center gap-2 rounded-lg bg-gray-300 px-3 py-2 dark:bg-gray-900">
                                    <Checkbox
                                        id={tag.value}
                                        value={tag.value}
                                        className="border-gray-400"
                                        onClick={handleTag(tag.value)}
                                        checked={tags?.includes(tag.value)}
                                    />
                                    <Label htmlFor={tag.value}>{tag.label}</Label>
                                </div>
                            ))}
                            <Select name="status" onValueChange={handleStatus} value={status}>
                                <SelectTrigger className="w-1/5">
                                    <SelectValue placeholder="Filter by Status" />
                                </SelectTrigger>
                                <SelectContent className="">
                                    {statuses.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <CircleX className="h-6 w-6" />
                        </div>
                        {tasks.data.length > 0 ? (
                            <>
                                <div className="p-4">
                                    {tasks.data.map((task) => (
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
                                                    <span className="">{new Date(task.due_date).toLocaleString()}</span>
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
                                <PaginatedCollectionPaging collection={tasks} />
                            </>
                        ) : (
                            <p className="p-6">No tasks found.</p>
                        )}
                    </ContentBody>
                </ContentContainer>
            </div>
        </AppLayout>
    );
}
