import { BehaviorSubject, map, mergeScan, Observable, tap } from 'rxjs';
import { PaginatorResponse } from './get-with-paginator.types';

export const getWithPaginator = <T>(
    factory$: (page: number) => Observable<T[]>,
    paginator$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined),
): Observable<PaginatorResponse<T>> => {
    const initialState: PaginatorResponse<T> = {
        currentPage: 0,
        nextPage: 1,
        items: [],
    };

    return paginator$.pipe(
        tap(() => console.log('paginator emitted')),
        mergeScan((state: PaginatorResponse<T>) => {
            return factory$(state.nextPage).pipe(
                map((newItems: T[]) => ({
                    currentPage: state.currentPage,
                    nextPage: state.currentPage + 1,
                    items: [...state.items, ...newItems],
                })),
            )
        }, initialState),
    )
}
