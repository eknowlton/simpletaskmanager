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
