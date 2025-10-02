import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useHighlights, useMarkdown } from '@/lib/markdown';

export default function UpdatesPage() {
    const { props } = usePage<SharedData>();
    const changelog = props.changelog ?? '';

    const highlights = useHighlights(changelog);
    const rendered = useMarkdown(changelog);

    return (
        <AppLayout breadcrumbs={[{ title: 'Home', href: route('index') }, { title: 'Changelog', href: route('updates') }]}>
            <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Changelog</h1>
                    <p className="text-neutral-600 dark:text-neutral-300">What’s new and improved in this release.</p>
                </div>

                {/* Highlights section */}
                <div className="flex flex-col gap-2">
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">New & Improved</h2>
                        {highlights.added.length ? (
                            <ul className="list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
                                {highlights.added.map((item, idx) => (
                                    <li key={`a-${idx}`}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-neutral-600 dark:text-neutral-400">No new features listed in the latest release.</p>
                        )}
                    </div>
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Fixes</h2>
                        {highlights.fixed.length ? (
                            <ul className="list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
                                {highlights.fixed.map((item, idx) => (
                                    <li key={`f-${idx}`}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-neutral-600 dark:text-neutral-400">No fixes listed in the latest release.</p>
                        )}
                    </div>
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Other Changes</h2>
                        {highlights.other.length ? (
                            <ul className="list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
                                {highlights.other.map((item, idx) => (
                                    <li key={`o-${idx}`}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-neutral-600 dark:text-neutral-400">No other changes listed.</p>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="my-10 h-px w-full bg-neutral-200 dark:bg-neutral-800" />

                {/* Full Changelog section */}
                <div>
                    <div className="mb-4 flex items-baseline justify-between gap-4">
                        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Full Changelog</h2>
                        <a
                            href="https://raw.githubusercontent.com/eknowlton/simpletaskmanager/refs/heads/main/CHANGELOG.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
                        >
                            View raw file
                        </a>
                    </div>
                    <article className="prose max-w-none text-neutral-800 dark:prose-invert dark:text-neutral-200">
                        {rendered.length ? rendered : (
                            <p className="text-neutral-600 dark:text-neutral-400">No changelog available.</p>
                        )}
                    </article>
                </div>
            </div>
        </AppLayout>
    );
}
