import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FolderCheck, FolderPlus, LayoutGrid, LayoutList, Plus } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    { title: 'All Tasks', href: '/tasks', icon: LayoutList },
    {
        title: 'Create a task',
        href: '/tasks/create',
        icon: Plus,
    },
    {
        title: 'All Projects',
        href: '/projects',
        icon: FolderCheck,
    },
    {
        title: 'Create a Project',
        href: '/projects/create',
        icon: FolderPlus,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Help',
        href: '/help',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { props } = usePage();
    let projectMenuItems: NavItem[] = [];
    const project = props.project as Project | null;
    if (project) {
        projectMenuItems = [
            {
                title: 'Project',
                href: `/projects/${project.id}`,
                icon: FolderCheck,
            },
            {
                title: 'Create Task',
                href: `/projects/${project.id}/tasks/create`,
                icon: Plus,
            },
        ];
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                {(props.project as Project | null) && <NavMain items={projectMenuItems} title={project?.title} />}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
