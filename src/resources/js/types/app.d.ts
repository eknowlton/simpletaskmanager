interface PaginatedCollectionLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedCollection<T> {
    data: T[];
    current_page: number;
    last_page: number;
    last_page_url: string;
    first_page: number;
    first_page_url: string;
    from: number;
    total: number;
    per_page: number;
    links: PaginatedCollectionLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
    to: number;
    total: number;
}

type SharedProps = {
    name: string;
    auth: SharedAuth;
    task_statuses: Shared.Data.TaskStatus[];
    project_statuses: Shared.Data.ProjectStatus[];
    projects: Shared.Data.Project[];
};

interface SharedAuth {
    user: App.Data.User;
}
