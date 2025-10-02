import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const useInView = (options) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.disconnect();
            }
        };
    }, [options]);

    return [ref, inView];
};

// --- SVG Icon Components (HeroIcons & Custom) ---

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CheckCircleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ChevronDownIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
);

const SunIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
    </svg>
);

const MoonIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
    </svg>
);

const AnimatedAppPreview = ({ theme }) => (
    <svg viewBox="0 0 800 450" className="h-auto w-full rounded-md shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10">
        {/* Background and Frame */}
        <defs>
            <linearGradient id="app-bg-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={theme === 'dark' ? '#1F2937' : '#F9FAFB'} />
                <stop offset="100%" stopColor={theme === 'dark' ? '#111827' : '#FFFFFF'} />
            </linearGradient>
        </defs>
        <rect width="800" height="450" rx="8" fill="url(#app-bg-gradient)" />
        <rect x="1" y="1" width="798" height="448" rx="7" fill="none" stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} />

        {/* Sidebar */}
        <rect x="0" y="0" width="150" height="450" fill={theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'} />
        <circle cx="30" cy="30" r="10" fill="#3B82F6" />
        <rect x="50" y="25" width="70" height="10" rx="3" fill={theme === 'dark' ? '#4B5563' : '#E5E7EB'} />
        {/* Sidebar links */}
        <rect x="20" y="70" width="110" height="15" rx="4" fill={theme === 'dark' ? '#374151' : '#E5E7EB'} />
        <rect x="20" y="100" width="90" height="15" rx="4" fill={theme === 'dark' ? '#374151' : '#E5E7EB'} />
        <rect x="20" y="130" width="110" height="15" rx="4" fill={theme === 'dark' ? '#4B5563' : '#D1D5DB'} />
        <rect x="20" y="160" width="80" height="15" rx="4" fill={theme === 'dark' ? '#374151' : '#E5E7EB'} />

        {/* Main Content Area - Kanban Board */}
        <g>
            {/* Columns */}
            <rect x="180" y="20" width="190" height="410" rx="6" fill={theme === 'dark' ? '#111827' : '#F3F4F6'} />
            <rect x="390" y="20" width="190" height="410" rx="6" fill={theme === 'dark' ? '#111827' : '#F3F4F6'} />
            <rect x="600" y="20" width="190" height="410" rx="6" fill={theme === 'dark' ? '#111827' : '#F3F4F6'} />

            {/* Column Headers */}
            <text x="190" y="45" fontFamily="sans-serif" fontSize="14" fontWeight="600" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'}>
                To Do
            </text>
            <text x="400" y="45" fontFamily="sans-serif" fontSize="14" fontWeight="600" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'}>
                In Progress
            </text>
            <text x="610" y="45" fontFamily="sans-serif" fontSize="14" fontWeight="600" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'}>
                Done
            </text>

            {/* Static Cards */}
            <rect
                x="190"
                y="70"
                width="170"
                height="50"
                rx="4"
                fill={theme === 'dark' ? '#1F2937' : '#FFFFFF'}
                stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
            />
            <rect
                x="190"
                y="130"
                width="170"
                height="70"
                rx="4"
                fill={theme === 'dark' ? '#1F2937' : '#FFFFFF'}
                stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
            />
            <rect
                x="400"
                y="70"
                width="170"
                height="60"
                rx="4"
                fill={theme === 'dark' ? '#1F2937' : '#FFFFFF'}
                stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
            />

            {/* Animated Card */}
            <g className="anim-card-1">
                <rect x="190" y="210" width="170" height="60" rx="4" fill="#3B82F6" />
                <rect x="200" y="220" width="100" height="8" rx="3" fill="white" fillOpacity="0.8" />
                <rect x="200" y="235" width="130" height="8" rx="3" fill="white" fillOpacity="0.8" />
            </g>

            {/* Animated Checkmark on Done Card */}
            <g className="anim-check">
                <rect x="610" y="70" width="170" height="50" rx="4" fill="#10B981" />
                <path d="M685 90 l 10 10 l 20 -20" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </g>

        {/* Animated cursor */}
        <g className="anim-cursor">
            <path d="M350 250 l -15 -5 l 0 -15 l 5 -5 l 15 5 Z" fill={theme === 'dark' ? 'white' : 'black'} />
        </g>
    </svg>
);

// --- Main App Component ---

export default function App() {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Check for saved theme in localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (prefersDark) {
            setTheme('dark');
        }
    }, []);

    useEffect(() => {
        // Apply theme class to root element
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        // Trigger hero animation shortly after component mounts
        const timer = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const features = [
        { name: 'Intuitive Task Management', description: 'Easily create, assign, and track tasks with a clean interface designed for speed.' },
        { name: 'Project-Based Organization', description: 'Group related tasks into projects to keep your work organized and focused.' },
        { name: 'Kanban Board View', description: 'Visualize your workflow with a drag-and-drop Kanban board to seamlessly track progress.' },
        { name: 'Calendar View', description: 'Stay on top of deadlines with a clear calendar view of all your upcoming tasks.' },
        { name: 'AI-Powered Assistance', description: 'Leverage artificial intelligence to automate tasks, generate insights, and work smarter.' },
        { name: 'Customizable Workflows', description: "Adapt the app to your team's unique process, not the other way around." },
    ];

    const faqs = [
        {
            question: 'Is JobShop really free?',
            answer: 'Yes! JobShop is currently free to use for teams of any size. We plan to introduce optional paid plans for advanced features in the future, but the core functionality will remain free.',
        },
        {
            question: 'Can I change my plan later?',
            answer: 'Absolutely. When we introduce premium plans, you will be able to upgrade, downgrade, or cancel at any time from your account settings.',
        },
        {
            question: 'What makes JobShop different?',
            answer: "JobShop focuses on a clean, intuitive user experience while providing powerful features. We prioritize speed, collaboration, and flexibility to fit your team's workflow.",
        },
        {
            question: 'Is my data secure?',
            answer: 'Data security is our top priority. We use industry-standard encryption and security protocols to ensure your information is always safe and protected.',
        },
    ];

    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Refs for scroll animations
    const [featuresRef, featuresInView] = useInView({ threshold: 0.1 });
    const [testimonialRef, testimonialInView] = useInView({ threshold: 0.2 });
    const [ctaRef, ctaInView] = useInView({ threshold: 0.2 });
    const [faqRef, faqInView] = useInView({ threshold: 0.2 });

    return (
        <div className="bg-white font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <style>{`
        .anim-card-1 { animation: move-card 8s ease-in-out infinite; }
        .anim-cursor { animation: move-cursor 8s ease-in-out infinite; }
        .anim-check path { stroke-dasharray: 50; stroke-dashoffset: 50; animation: draw-check 8s ease-in-out infinite; }

        @keyframes move-card {
            0%, 20% { transform: translate(0, 0); }
            40%, 60% { transform: translate(210px, -140px); }
            80%, 100% { transform: translate(420px, 0); }
        }
        @keyframes move-cursor {
            0% { opacity: 0; transform: translate(0, 0); }
            15% { opacity: 1; transform: translate(0, 0); }
            35% { transform: translate(210px, -140px); }
            45% { opacity: 1; }
            50% { opacity: 0; }
            75% { opacity: 0; transform: translate(420px, 0); }
            80% { opacity: 1; transform: translate(420px, 0); }
            100% { opacity: 1; transform: translate(420px, 0); }
        }
        @keyframes draw-check {
            0%, 80% { stroke-dashoffset: 50; }
            90%, 100% { stroke-dashoffset: 0; }
        }

        .bg-grid-pattern {
            background-image: radial-gradient(circle, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'} 1px, transparent 1px);
            background-size: 2rem 2rem;
        }

        .hero-bg > div { position: absolute; border-radius: 50%; animation: float 20s infinite linear; }
        .shape1 { width: 150px; height: 150px; left: 10%; top: 20%; background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0,0,0,0.03)'}; animation-duration: 25s; }
        .shape2 { width: 50px; height: 50px; left: 25%; top: 70%; background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.04)'}; animation-duration: 18s; animation-delay: 3s; }
        .shape3 { width: 100px; height: 100px; left: 80%; top: 10%; background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0,0,0,0.03)'}; animation-duration: 22s; animation-delay: 5s; }
        .shape4 { width: 80px; height: 80px; left: 90%; top: 80%; background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.04)'}; animation-duration: 20s; animation-delay: 1s; }
        .shape5 { width: 30px; height: 30px; left: 50%; top: 50%; background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.05)'}; animation-duration: 15s; animation-delay: 2s; }

        @keyframes float {
            0% { transform: translateY(0) rotate(0deg) scale(1); }
            50% { transform: translateY(-50px) translateX(20px) rotate(180deg) scale(1.1); }
            100% { transform: translateY(0) rotate(360deg) scale(1); }
        }
    `}</style>
            {/* Header */}
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">JobShop</span>
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <a
                            href="#features"
                            className="text-sm leading-6 font-semibold text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
                        >
                            Features
                        </a>
                        <a
                            href="#faq"
                            className="text-sm leading-6 font-semibold text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
                        >
                            FAQ
                        </a>
                    </div>
                    <div className="hidden items-center gap-x-6 lg:flex lg:flex-1 lg:justify-end">
                        <button
                            onClick={toggleTheme}
                            className="rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            <span className="sr-only">Toggle theme</span>
                            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                        </button>
                        {auth.user ? (
                            <Link
                                href={route('inbox.index')}
                                className="text-sm leading-6 font-semibold text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
                            >
                                Inbox <span aria-hidden="true">&rarr;</span>
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="text-sm leading-6 font-semibold text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
                            >
                                Log In <span aria-hidden="true">&rarr;</span>
                            </Link>
                        )}
                    </div>
                </nav>
                {mobileMenuOpen && (
                    <div className="lg:hidden">
                        <div className="bg-opacity-25 fixed inset-0 z-50 bg-black" onClick={() => setMobileMenuOpen(false)}></div>
                        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:ring-white/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">JobShop</span>
                                </a>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XIcon />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-200/10">
                                    <div className="space-y-2 py-6">
                                        <a
                                            href="#features"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                                        >
                                            Features
                                        </a>
                                        <a
                                            href="#faq"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                                        >
                                            FAQ
                                        </a>
                                    </div>
                                    <div className="py-6">
                                        {auth.user ? (
                                            <Link
                                                href={route('inbox.index')}
                                                className="text-sm leading-6 font-semibold text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
                                            >
                                                Inbox <span aria-hidden="true">&rarr;</span>
                                            </Link>
                                        ) : (
                                            <Link
                                                href={route('login')}
                                                className="text-sm leading-6 font-semibold text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
                                            >
                                                Log In <span aria-hidden="true">&rarr;</span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <main>
                {/* Hero Section */}
                <div className="relative isolate overflow-hidden bg-white pt-14 dark:bg-gray-900">
                    <div className="hero-bg" aria-hidden="true">
                        <div className="shape1"></div>
                        <div className="shape2"></div>
                        <div className="shape3"></div>
                        <div className="shape4"></div>
                        <div className="shape5"></div>
                    </div>
                    <div className="py-24 sm:py-32 lg:pb-40">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h1
                                    className={`text-4xl font-bold tracking-tight text-gray-900 transition-all duration-1000 ease-in-out sm:text-6xl dark:text-white ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                                >
                                    Turn Chaos into Clarity
                                </h1>
                                <p
                                    className={`mt-6 text-lg leading-8 text-gray-600 transition-all delay-200 duration-1000 ease-in-out dark:text-gray-300 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                                >
                                    JobShop is the refreshingly simple, yet powerful way to manage your team's tasks, projects, and deadlines.
                                    Finally, a task tracker that works as hard as you do.
                                </p>
                                <div
                                    className={`mt-10 flex items-center justify-center gap-x-6 transition-all delay-300 duration-1000 ease-in-out ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                                >
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:outline-white"
                                    >
                                        Get started for free
                                    </Link>
                                    <a
                                        href="#features"
                                        className="text-sm leading-6 font-semibold text-gray-900 transition-transform hover:scale-105 dark:text-gray-100"
                                    >
                                        Learn more <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                            <div
                                className={`mt-16 flow-root transition-all delay-500 duration-1000 ease-in-out sm:mt-24 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 transition-transform duration-300 ring-inset hover:scale-[1.02] lg:-m-4 lg:rounded-2xl lg:p-4 dark:bg-white/5 dark:ring-white/10">
                                    <AnimatedAppPreview theme={theme} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div
                    id="features"
                    ref={featuresRef}
                    className={`relative overflow-hidden bg-gray-50 py-24 transition-opacity duration-1000 sm:py-32 dark:bg-gray-800 ${featuresInView ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="bg-grid-pattern absolute inset-0"></div>
                    <div className="relative">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:text-center">
                                <p className="text-base leading-7 font-semibold text-gray-900 dark:text-gray-100">Work Smarter</p>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    Everything you need to ship great work
                                </h2>
                                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                    From solo projects to enterprise-level collaboration, JobShop has the features to keep your team aligned and
                                    moving forward.
                                </p>
                            </div>
                            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                                    {features.map((feature, index) => (
                                        <div
                                            key={feature.name}
                                            className={`relative pl-16 transition-all duration-700 ease-in-out ${featuresInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                                            style={{ transitionDelay: `${index * 150}ms` }}
                                        >
                                            <dt className="text-base leading-7 font-semibold text-gray-900 dark:text-white">
                                                <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 dark:bg-white">
                                                    <CheckCircleIcon className="h-6 w-6 text-white dark:text-gray-900" />
                                                </div>
                                                {feature.name}
                                            </dt>
                                            <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonial Section */}
                <section
                    ref={testimonialRef}
                    className={`relative isolate overflow-hidden bg-white px-6 py-24 transition-opacity duration-1000 sm:py-32 lg:px-8 dark:bg-gray-900 ${testimonialInView ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.gray.100),white)] opacity-20 dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.gray.800),black)]" />
                    <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-gray-600/10 ring-gray-100 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center dark:bg-gray-900 dark:shadow-black/20 dark:ring-gray-800" />
                    <div className="mx-auto max-w-2xl lg:max-w-4xl">
                        <p className="text-center text-lg leading-8 font-semibold tracking-tight text-gray-900 dark:text-gray-100">Testimonials</p>
                        <figure className="mt-10">
                            <blockquote className="text-center text-xl leading-8 font-semibold text-gray-900 sm:text-2xl sm:leading-9 dark:text-white">
                                <p>
                                    “JobShop has completely transformed how our team manages projects. What used to be a mess of spreadsheets and
                                    emails is now a streamlined, collaborative process. We're shipping faster than ever before.”
                                </p>
                            </blockquote>
                            <figcaption className="mt-10">
                                <img
                                    className="mx-auto h-10 w-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                                    <div className="font-semibold text-gray-900 dark:text-white">Jane Doe</div>
                                    <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" className="fill-gray-900 dark:fill-gray-300">
                                        <circle cx="1" cy="1" r="1" />
                                    </svg>
                                    <div className="text-gray-600 dark:text-gray-400">CEO of TechCorp</div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </section>

                {/* CTA Section */}
                <div
                    id="cta"
                    ref={ctaRef}
                    className={`relative overflow-hidden bg-gray-50 py-24 transition-opacity duration-1000 sm:py-32 dark:bg-gray-800 ${ctaInView ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="bg-grid-pattern absolute inset-0"></div>
                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Get Started for Free</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                No credit card required. Sign up and start managing your tasks in minutes.
                            </p>
                            <div className="mt-10 flex items-center justify-center">
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:outline-white"
                                >
                                    Sign up now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div
                    id="faq"
                    ref={faqRef}
                    className={`bg-white transition-opacity duration-1000 dark:bg-gray-900 ${faqInView ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10 dark:divide-white/10">
                            <h2 className="text-center text-2xl leading-10 font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                                Frequently asked questions
                            </h2>
                            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-white/10">
                                {faqs.map((faq, index) => (
                                    <div key={faq.question} className="pt-6">
                                        <dt>
                                            <button
                                                onClick={() => toggleFaq(index)}
                                                className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white"
                                            >
                                                <span className="text-base leading-7 font-semibold">{faq.question}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    <ChevronDownIcon
                                                        className={`h-6 w-6 transform transition-transform duration-300 ease-in-out ${openFaq === index ? 'rotate-180' : ''}`}
                                                    />
                                                </span>
                                            </button>
                                        </dt>
                                        <dd
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}
                                        >
                                            <div className="mt-2 pr-12">
                                                <p className="text-base leading-7 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                                            </div>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 dark:bg-black" aria-labelledby="footer-heading">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        <div className="space-y-8">
                            <span className="text-2xl font-bold text-white">JobShop</span>
                            <p className="text-sm leading-6 text-gray-300">The easiest way to manage your team's work and hit your deadlines.</p>
                        </div>
                    </div>
                    <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                        <p className="text-xs leading-5 text-gray-400">&copy; 2024 JobShop, All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
