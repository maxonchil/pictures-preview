export interface PaginatorResponse<T> {
    currentPage: number,
    nextPage: number,
    items: T[],
}
