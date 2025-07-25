import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export const ProjectFormSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters long',
    }),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters long',
    }),
    status: z.string().optional(),
    color: z.string().optional(),
    icon: z.string().nullable().optional(),
});

export const ProjectForm = ({
    onSubmit,
    statuses,
    project,
}: {
    onSubmit: SubmitHandler<z.infer<typeof ProjectFormSchema>>;
    project?: App.Data.Project;
    statuses: App.Data.ProjectStatus[] | null;
}) => {
    const form = useForm<z.infer<typeof ProjectFormSchema>>({
        resolver: zodResolver(ProjectFormSchema),
        defaultValues: {
            title: project?.title || '',
            description: project?.description || '',
            status: project?.status.value || '',
            color: project?.color || '#2596be',
            icon: project?.icon || null,
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
                                <Label htmlFor="title">Status</Label>
                                <Select onValueChange={field.onChange} value={field.value} name="status">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses && statuses.map((status) => <SelectItem value={status.value}>{status.label}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {fieldState.error && <InputError message={fieldState.error.message} />}
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="color"
                        render={({ field, fieldState }) => (
                            <div className="grid gap-2">
                                <Label htmlFor="color">Color</Label>
                                <div className="flex flex-row items-center justify-center gap-4">
                                    <div
                                        className="rounded-xl border-2 p-2 px-5"
                                        style={{
                                            backgroundColor: field.value || '#2596be',
                                        }}
                                    >
                                        &nbsp;
                                    </div>
                                    <Input id="color" type="text" autoFocus tabIndex={3} placeholder="eg. #2596be" {...field} />
                                </div>
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
