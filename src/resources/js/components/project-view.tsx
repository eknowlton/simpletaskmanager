import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { ProjectForm, ProjectFormData } from './project-form';

export function ProjectView({ project }: { project: Shared.Data.Project }) {
    const form = useForm<ProjectFormData>({
        title: project.title,
        description: project.description,
        status: project.status.value,
        color: project.color,
        icon: project.icon,
        id: project.id,
    });

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        form.put(route('projects.update', { project: project.id }), {
            replace: false,
            onSuccess: () => {
                toast.success('Project updated successfully');
            },
            onError: (errors) => {
                toast.error('Failed to update project');
                console.error(errors);
            },
        });
    };

    return (
        <div className="mt-10 px-5">
            <ProjectForm onSubmit={onSubmit} form={form} />
        </div>
    );
}
