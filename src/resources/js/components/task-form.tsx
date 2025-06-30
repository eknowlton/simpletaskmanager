import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { add } from 'date-fns';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { DatePicker } from './ui/date-picker';

export const TaskFormSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters long',
    }),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters long',
    }),
    status: z.string().optional(),
    due_date: z.date().optional(),
    priority: z.string().nullable().optional(),
    project_id: z.string().nullable().optional(),
});

export const TaskForm = ({
    onSubmit,
    statuses,
    projects,
    project,
}: {
    onSubmit: SubmitHandler<z.infer<typeof TaskFormSchema>>;
    statuses: { name: string; value: string }[] | null;
    projects?: Project[] | null;
    project?: Project | null;
}) => {
    const form = useForm<z.infer<typeof TaskFormSchema>>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            title: '',
            description: '',
            status: 'in_progress',
            due_date: add(new Date(), {
                weeks: 1,
            }),
            priority: '5',
            project_id: project ? `${project.id}` : null,
        },
    });

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
                                        <SelectValue placeholder="Project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses &&
                                            statuses.map((status, idx) => (
                                                <SelectItem value={status.value} key={idx}>
                                                    {status.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.error && <InputError message={fieldState.error.message} />}
                            </div>
                        )}
                    />
                    {!project && projects && projects.length > 0 && (
                        <FormField
                            control={form.control}
                            name="project_id"
                            render={({ field, fieldState }) => (
                                <div className="grid gap-2">
                                    <Label htmlFor="project_id">Project</Label>
                                    <Select onValueChange={field.onChange} value={field?.value || undefined} name="status">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projects &&
                                                projects.map((project) => (
                                                    <SelectItem value={`${project.id}`} key={project.id} key={project.id}>
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
                    <FormField
                        control={form.control}
                        name="due_date"
                        render={({ field, fieldState }) => (
                            <div className="grid gap-2">
                                <Label htmlFor="due_date">Due Date</Label>
                                <DatePicker date={field.value} onSelect={field.onChange} />
                                {fieldState.error && <InputError message={fieldState.error.message} />}
                            </div>
                        )}
                    />
                    <div className="col-span-2">
                        <Button type="submit" className="mt-4" tabIndex={4}>
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};
