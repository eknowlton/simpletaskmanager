import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import BetaLogo from '../../images/beta-logo.png';
import ScreenBoard from '../../images/screen-board.png';
import ScreenInbox from '../../images/screen-inbox.png';
import ScreenProjects from '../../images/screen-projects.png';
import ScreenCalendar from '../../images/screens-calendar.png';
import ScreenChat from '../../images/screens-chat.png';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="container mx-auto flex min-h-screen flex-col items-center lg:justify-center lg:p-8 dark:text-white">
                <header className="mb-6 w-full rounded-lg border border-gray-900 bg-gray-800 p-10 not-has-[nav]:hidden dark:border-gray-500 dark:bg-gray-800">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('inbox.index')}
                                className="inline-block rounded-sm border border-white px-5 py-1.5 text-sm leading-normal"
                            >
                                Inbox
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-border px-5 py-1.5 text-sm leading-normal text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-white bg-gray-200 px-5 py-1.5 text-sm leading-normal dark:bg-gray-700"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                    <img src={BetaLogo} className="mx-auto" />
                </header>
                <div className="container my-5 flex flex-col gap-10 p-10">
                    <h3 className="text-2xl">Free Simple Task Management</h3>
                    <a href={route('register')} className="text-blue-500 underline">
                        Try out our simple task management today by registering for free
                    </a>
                    <img src={ScreenInbox} />
                </div>
                <div className="container my-5 flex flex-row gap-10 p-10">
                    <div className="flex flex-grow flex-col justify-center gap-10">
                        <h3 className="text-2xl">Organize Tasks by Projects</h3>
                        <a href={route('register')} className="text-blue-500 underline">
                            Try out our simple task management today by registering for free
                        </a>
                    </div>
                    <img src={ScreenProjects} />
                </div>
                <div className="container my-5 flex flex-col gap-10 p-10">
                    <h3 className="text-2xl">Manage Tasks with Board View</h3>
                    <a href={route('register')} className="text-blue-500 underline">
                        Try out our simple task management today by registering for free
                    </a>
                    <img src={ScreenBoard} />
                </div>
                <div className="container my-5 flex flex-col gap-10 p-10">
                    <h3 className="text-2xl">Task Deadlines & Calendar Views</h3>
                    <a href={route('register')} className="text-blue-500 underline">
                        Try out our simple task management today by registering for free
                    </a>
                    <img src={ScreenCalendar} />
                </div>
                <div className="container my-5 flex flex-col gap-10 p-10">
                    <h3 className="text-2xl">Breakdown New Projects with AI</h3>
                    <a href={route('register')} className="text-blue-500 underline">
                        Try out our simple task management today by registering for free
                    </a>
                    <img src={ScreenChat} />
                </div>
                <footer className="mb-6 flex w-full flex-row rounded-lg border border-gray-500 bg-gray-800 p-10 text-white">
                    <img src={BetaLogo} className="mx-auto mb-4" />
                    <div className="flex-grow"></div>
                    <div>
                        <p className="text-sm">© 2023 Simple Task Management. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
