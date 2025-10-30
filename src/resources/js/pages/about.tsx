import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function AboutPage() {
    const { props } = usePage<SharedData>();

    const Content = () => (
        <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-10 lg:px-8">
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">About simpletaskmanager</h1>
                <p className="text-neutral-600 dark:text-neutral-300">Simple task management designed for desktop</p>
            </div>

            <div className="space-y-6">
                <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <h2 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">What is simpletaskmanager?</h2>
                    <p className="text-neutral-700 dark:text-neutral-300">
                        simpletaskmanager is a Laravel-based server-side SPA for managing tasks, built with Inertia.js, React, Vite, TailwindCSS, and
                        ShadCN UI components. The application is designed primarily for desktop use and features an integrated AI agent that helps
                        users create and plan projects with tasks, due dates, and tags.
                    </p>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <h2 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">Key Features</h2>
                    <ul className="list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
                        <li>Task Management - Create, update, delete, and organize tasks</li>
                        <li>Project Management - Group tasks into projects with status tracking</li>
                        <li>AI-Powered Planning - Natural language project creation via chat interface</li>
                        <li>Drag-and-Drop - Reorder tasks and projects</li>
                        <li>Tags & Priorities - Organize tasks with custom tags and priority levels</li>
                        <li>Calendar Views - Visualize tasks and due dates</li>
                        <li>Kanban Board - Visual task management</li>
                        <li>Server-Side Rendering - Fast initial page loads with Inertia SSR</li>
                    </ul>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <h2 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">Technology Stack</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="mb-2 font-medium text-neutral-900 dark:text-neutral-100">Backend</h3>
                            <p className="text-neutral-700 dark:text-neutral-300">
                                PHP 8.2+ with Laravel 12, Inertia.js, Spatie Laravel Data, Laravel Sanctum, and LaraAgent for AI functionality
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 font-medium text-neutral-900 dark:text-neutral-100">Frontend</h3>
                            <p className="text-neutral-700 dark:text-neutral-300">
                                React 19 with TypeScript, Vite 6, TailwindCSS 4, ShadCN UI components, and React Hook Form with Zod validation
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 font-medium text-neutral-900 dark:text-neutral-100">Infrastructure</h3>
                            <p className="text-neutral-700 dark:text-neutral-300">
                                Docker, PostgreSQL, Redis, Nginx, AWS Lightsail for hosting, and GitHub Actions for CI/CD
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <h2 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">Open Source</h2>
                    <p className="mb-3 text-neutral-700 dark:text-neutral-300">
                        This project is open source and available on GitHub. Contributions, issues, and feature requests are welcome!
                    </p>
                    <a
                        href="https://github.com/eknowlton/simpletaskmanager"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
                    >
                        View on GitHub →
                    </a>
                </div>
            </div>
        </div>
    );

    if (!props.auth.user) {
        return (
            <>
                <Head title="About" />
                <Content />
            </>
        );
    }

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'About',
                    href: '#',
                },
            ]}
            header={false}
        >
            <Head title="About" />
            <Content />
        </AppLayout>
    );
}
