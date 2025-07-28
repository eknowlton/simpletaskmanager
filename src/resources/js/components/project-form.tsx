import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { InertiaFormProps, usePage } from '@inertiajs/react';

export type ProjectFormData = {
    title: string;
    description: string | null;
    status: Shared.ProjectStatus;
    icon: string | null;
    color: string | null;
    id: number;
};

export const ProjectForm = ({ onSubmit, form }: { form: InertiaFormProps<ProjectFormData>; onSubmit: React.FormEventHandler<HTMLFormElement> }) => {
    const { project_statuses: statuses } = usePage<SharedProps>().props;
    const { errors, data, setData } = form;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        type="text"
                        autoFocus
                        tabIndex={1}
                        placeholder="eg. Complete the project documentation"
                        value={data.title}
                        onChange={(e) => setData('title', e.currentTarget.value)}
                    />
                    {errors.title && <InputError message={errors.title} />}
                </div>
                <div className="col-span-2 grid gap-2">
                    <Label htmlFor="title">Description</Label>
                    <Textarea
                        onChange={(e) => setData('description', e.currentTarget.value)}
                        id="description"
                        placeholder="eg. Write detailed documentation for the project."
                        tabIndex={2}
                        defaultValue={data.description ?? ''}
                    />
                    {errors.description && <InputError message={errors.description} />}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="title">Status</Label>
                    <Select onValueChange={(value) => setData('status', value as Shared.ProjectStatus)} value={data.status} name="status">
                        <SelectTrigger>
                            <SelectValue placeholder="Project" />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses && statuses.map((status) => <SelectItem value={status.value}>{status.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    {errors.status && <InputError message={errors.status} />}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="color">Color</Label>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <div
                            className="rounded-xl border-2 p-2 px-5"
                            style={{
                                backgroundColor: data.color || '#2596be',
                            }}
                        >
                            &nbsp;
                        </div>
                        <Input
                            id="color"
                            type="text"
                            autoFocus
                            tabIndex={3}
                            placeholder="eg. #2596be"
                            onChange={(e) => setData('color', e.currentTarget.value)}
                        />
                    </div>
                    {errors.color && <InputError message={errors.color} />}
                </div>
                <div className="col-span-2">
                    <Button type="submit" className="mt-4" tabIndex={4}>
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
};
