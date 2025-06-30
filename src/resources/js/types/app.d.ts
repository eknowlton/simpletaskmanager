interface Task {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: number;
    status: string;
    status_label: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    status: string;
    status_label: string;
    slug: string;
    color: string;
    icon: string | null;
}

interface FlashMessage {
    title: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

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
