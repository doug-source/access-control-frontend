import { type State } from '@/shared/types/Reducers/Standard/State';

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
