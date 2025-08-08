import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { InertiaFormProps, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { TagInput } from './ui/tag-input';

export type TaskFormData = {
    title: string;
    description: string;
    status: Shared.TaskStatus;
    priority: number;
    project_id: string | null;
    due_date?: Date;
    tags?: { label: string; value: string }[];
    id: string;
};

export const TaskForm = ({
    form,
    project,
    onSubmit,
}: {
    form: InertiaFormProps<TaskFormData>;
    project?: Shared.Data.Project | null;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}) => {
    const { task_statuses: statuses, projects } = usePage<SharedProps>().props;
    const { data, setData, errors } = form;
    const [hasDueDate, setHasDueDate] = useState<boolean>(!!data.due_date);
    const showProjectSelection = !project && projects && projects.length > 0;

    const convertDateToDatetimeLocalInputValue = (date?: Date): string | undefined => {
        if (!date) return;

        const isoString = date.toISOString();
        return isoString.slice(0, 16); // Convert to 'YYYY-MM-DDTHH:mm' format
    };

    return (
        <form onSubmit={onSubmit} className="z-10 flex flex-col gap-6">
            <div className="relative z-10 grid grid-cols-2 gap-6">
                <div className="col-span-2 grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        type="text"
                        autoFocus
                        tabIndex={1}
                        placeholder="eg. Complete the project documentation"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    {errors.title && <InputError message={errors.title} />}
                </div>
                <div className="col-span-2 grid gap-2">
                    <Label htmlFor="title">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="eg. Write detailed documentation for the project."
                        tabIndex={2}
                        defaultValue={data.description}
                        name="description"
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    {errors.description && <InputError message={errors.description} />}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select onValueChange={(status) => setData('status', status as Shared.TaskStatus)} value={data.status} name="status">
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses &&
                                statuses.map((status, idx) => (
                                    <SelectItem value={status.value} key={idx}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    {errors.status && <InputError message={errors.status} />}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select onValueChange={(value) => setData('priority', parseInt(value, 0))} value={`${data.priority}`} name="priority">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((priority) => (
                                <SelectItem value={`${priority}`} key={priority}>
                                    {priority}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.priority && <InputError message={errors.priority} />}
                </div>
                {showProjectSelection && (
                    <div className="grid gap-2">
                        <Label htmlFor="project_id">Project</Label>
                        <Select onValueChange={(value) => setData('project_id', value)} value={data.project_id ?? undefined} name="project_id">
                            <SelectTrigger>
                                <SelectValue placeholder={'Select a Project'} />
                            </SelectTrigger>
                            <SelectContent>
                                {projects &&
                                    projects.map((project) => (
                                        <SelectItem value={project.id as string} key={project.id}>
                                            {project.title}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        {errors.project_id && <InputError message={errors.project_id} />}
                    </div>
                )}

                {hasDueDate ? (
                    <>
                        <div>
                            <Label htmlFor="due_date">Due Date</Label>
                            <Input type="datetime-local" id="due_date" value={convertDateToDatetimeLocalInputValue(data.due_date)} className="mt-1" />
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setData('due_date', undefined);
                                setHasDueDate(false);
                            }}
                        >
                            Clear due date
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={() => {
                            setData('due_date', new Date());
                            setHasDueDate(true);
                        }}
                    >
                        Set due date
                    </button>
                )}
                <div
                    className={`grid items-start gap-2 ${(!showProjectSelection && hasDueDate) || (showProjectSelection && !hasDueDate) ? 'col-span-2' : 'col-span-1'}`}
                >
                    <Label htmlFor="tags" className="flex">
                        <span className="flex-grow">Tags</span>
                    </Label>
                    <TagInput<string>
                        tags={data.tags ?? []}
                        setTags={(tags) => setData('tags', tags)}
                        allTags={[
                            { label: 'Urgent', value: 'urgent' },
                            { label: 'Important', value: 'important' },
                            { label: '2-Minute Task', value: 'two-minute' },
                        ]}
                        placeholder="eg. Urgent, Important, 2-Minute Task"
                        onKeyDown={(e) => {
                            if (
                                e.key === 'Enter' &&
                                data.tags &&
                                !data.tags.some((tag) => tag.label.toLowerCase() === e.currentTarget.value.toLowerCase())
                            ) {
                                setData('tags', [...(data.tags || []), { label: e.currentTarget.value, value: e.currentTarget.value.toLowerCase() }]);
                                e.currentTarget.value = '';
                            }
                        }}
                    />
                    {errors.tags && <InputError message={errors.tags} />}
                </div>

                <Button type="submit" className="col-span-full mt-4" tabIndex={4}>
                    Save Task
                </Button>
            </div>
        </form>
    );
};
