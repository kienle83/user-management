export interface PaginationParams {
    _limit: number;
    _page: number;
    _totalRows: number;
}

export interface ListParams {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _oder?: 'asc' | 'desc';

    [key: string]: any; // other any param
}