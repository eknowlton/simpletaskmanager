import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationLinks,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export const PaginatedCollectionPaging = <T extends object>({ collection }: { collection: PaginatedCollection<T> }) => {
    const numberOfPages = Math.ceil(collection.total / collection.per_page);

    const pageUrl = (page: number) => {
        return collection.path + '?page=' + page;
    };

    return (
        <Pagination>
            <PaginationContent>
                {collection.prev_page_url ? (
                    <PaginationItem className="w-24">
                        <PaginationPrevious href={collection.prev_page_url} />
                    </PaginationItem>
                ) : (
                    <div className="w-24">&nbsp;</div>
                )}
                <PaginationLinks>
                    <div className="pr-4">Pages: </div>
                    {[...Array(numberOfPages).keys()].map((page) => {
                        const num = page + 1;
                        const isActive = collection.current_page === num;
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink isActive={isActive} href={pageUrl(num)}>
                                    {num}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                </PaginationLinks>
                {collection.next_page_url ? (
                    <PaginationItem className="w-24">
                        <PaginationNext href={collection.next_page_url} />
                    </PaginationItem>
                ) : (
                    <div className="w-24">&nbsp;</div>
                )}
            </PaginationContent>
        </Pagination>
    );
};
