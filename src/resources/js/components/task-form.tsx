import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { add, parseISO } from 'date-fns';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { DateTimeInput } from './ui/date-time-input';
import { TagInput } from './ui/tag-input';

export const TaskFormSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters long',
    }),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters long',
    }),
    status: z.string().nullable().optional(),
    due_date: z.date().nullable().optional(),
    priority: z.string().optional(),
    project_id: z.string().nullable().optional(),
    tags: z
        .array(
            z.object({
                label: z.string(),
                value: z.string(),
            }),
        )
        .nullable()
        .optional(),
});

export const TaskForm = ({
    onSubmit,
    task,
    statuses,
    projects,
    project,
}: {
    onSubmit: SubmitHandler<z.infer<typeof TaskFormSchema>>;
    task?: App.Data.Task | null;
    statuses: App.Data.TaskStatus[] | null;
    projects?: App.Data.Project[] | null;
    project?: App.Data.Project | null;
}) => {
    console.log(task);
    const form = useForm<z.infer<typeof TaskFormSchema>>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: task
            ? {
                  ...task,
                  status: task.status.value,
                  due_date: task.due_date ? parseISO(task.due_date) : null,
                  priority: `${task.priority}`,
                  project_id: task.project_id ? `${task.project_id}` : null,
              }
            : {
                  title: '',
                  description: '',
                  status: 'in_progress',
                  due_date: add(new Date(), {
                      weeks: 1,
                  }),
                  priority: '5',
                  project_id: project ? `${project.id}` : null,
                  tags: [],
              },
    });
    const [hasDueDate, setHasDueDate] = useState<boolean>(!!form.getValues('due_date'));

    const showProjectSelection = !project && projects && projects.length > 0;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field, fieldState }) => (
                            <div className="col-span-2 grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    placeholder="eg. Complete the project documentation"
                                    {...field}
                                />
                                {fieldState.error && <InputError message={fieldState.error.message} />}
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field, fieldState }) => (
                            <div className="col-span-2 grid gap-2">
                                <Label htmlFor="title">Description</Label>
                                <Textarea id="description" placeholder="eg. Write detailed documentation for the project." tabIndex={2} {...field}>
                                    {field.value}
                                </Textarea>
                                {fieldState.error && <InputError message={fieldState.error.message} />}
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field, fieldState }) => (
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select onValueChange={field.onChange} value={field.value} name="status">
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
                                {fieldState.error && <InputError message={fieldState.error.message} />}
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field, fieldState }) => (
                            <div className="grid gap-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select onValueChange={field.onChange} value={field.value} name="priority">
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
                                {fieldState.error && <InputError message={fieldState.error.message} />}
                            </div>
                        )}
                    />
                    {showProjectSelection && (
                        <FormField
                            control={form.control}
                            name="project_id"
                            render={({ field, fieldState }) => (
                                <div className="grid gap-2">
                                    <Label htmlFor="project_id">Project</Label>
                                    <Select onValueChange={field.onChange} value={field?.value || undefined} name="status">
                                        <SelectTrigger>
                                            <SelectValue placeholder={!project ? `No project selected` : 'Select a Project'} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projects &&
                                                projects.map((project) => (
                                                    <SelectItem value={`${project.id}`} key={project.id}>
                                                        {project.title}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.error && <InputError message={fieldState.error.message} />}
                                </div>
                            )}
                        />
                    )}

                    {hasDueDate ? (
                        <>
                            <FormField
                                control={form.control}
                                name="due_date"
                                render={({ field, fieldState }) => {
                                    return (
                                        <div>
                                            <Label htmlFor="due_date">Due Date</Label>
                                            <DateTimeInput
                                                value={field.value || new Date()}
                                                onChange={(date) => {
                                                    console.log(date);
                                                    field.onChange(date);
                                                }}
                                            />
                                        </div>
                                    );
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    form.setValue('due_date', null);
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
                                form.setValue('due_date', new Date());
                                setHasDueDate(true);
                            }}
                        >
                            Set due date
                        </button>
                    )}
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field, fieldState }) => (
                            <div
                                className={`grid items-start gap-2 ${(!showProjectSelection && hasDueDate) || (showProjectSelection && !hasDueDate) ? 'col-span-2' : 'col-span-1'}`}
                            >
                                <Label htmlFor="tags" className="flex">
                                    <span className="flex-grow">Tags</span>
                                </Label>
                                <TagInput<string>
                                    tags={field.value || []}
                                    setTags={field.onChange}
                                    allTags={[
                                        { label: 'Urgent', value: 'urgent' },
                                        { label: 'Important', value: 'important' },
                                        { label: '2-Minute Task', value: 'two-minute' },
                                    ]}
                                    placeholder="eg. Urgent, Important, 2-Minute Task"
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === 'Enter' &&
                                            !field.value?.some((tag) => tag.label.toLowerCase() === e.currentTarget.value.toLowerCase())
                                        ) {
                                            field.onChange([
                                                ...(field.value || []),
                                                { label: e.currentTarget.value, value: e.currentTarget.value.toLowerCase() },
                                            ]);
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                                {fieldState.error && <InputError message={fieldState.error.message} />}
                            </div>
                        )}
                    />

                    <Button type="submit" className="col-span-full mt-4" tabIndex={4}>
                        Save Task
                    </Button>
                </div>
            </form>
        </Form>
    );
};
