import { type State } from '../../States';

export interface PaginationState<T = unknown> extends State {
    data: T[];
    page: number;
    group: number;
    lastPage: number;
    total: number;
    error: null;
    warning: boolean;
    requestType: 'list' | 'remotion' | null;
}
