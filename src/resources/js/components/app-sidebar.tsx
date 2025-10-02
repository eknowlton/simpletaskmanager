import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, BotMessageSquare, Calendar, Columns, FolderCheck, LayoutGrid, ListCheck } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Inbox',
        href: route('inbox.index'),
        icon: LayoutGrid,
    },
    {
        title: 'Calendar',
        href: route('inbox.calendar'),
        icon: Calendar,
    },
    {
        title: 'Board',
        href: route('inbox.board'),
        icon: Columns,
    },
    {
        title: 'All Tasks',
        href: route('tasks.index'),
        icon: ListCheck,
    },
    {
        title: 'Projects',
        href: route('projects.index'),
        icon: FolderCheck,
    },
    {
        title: 'Chat',
        href: route('chat.index'),
        icon: BotMessageSquare,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Help',
        href: 'mailto:eknowlton@gmail.com',
        icon: BookOpen,
    },
    {
        title: 'Changelog',
        href: route('updates'),
        icon: BookOpen,
        target: "_blank"
    },
];

export function AppSidebar() {
    const { props } = usePage();
    let projectMenuItems: NavItem[] = [];
    const project = props.project as Shared.Data.Project | null;
    if (project) {
        projectMenuItems = [
            {
                title: 'Inbox',
                href: route('projects.inbox', { project: project.id }),
                icon: FolderCheck,
            },
            {
                title: 'Calendar',
                href: route('projects.calendar', { project: project.id }),
                icon: Calendar,
            },
            {
                title: 'Board',
                href: route('projects.board', { project: project.id }),
                icon: Columns,
            },
            {
                title: 'All Tasks',
                href: route('projects.show', { project: project.id }),
                icon: ListCheck,
            },
        ];
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/inbox" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain title="Tasks" items={mainNavItems} />
                {(props.project as Shared.Data.Project | null) && <NavMain items={projectMenuItems} title={project?.title} />}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
