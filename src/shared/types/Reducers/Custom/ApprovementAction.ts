export interface IdToApproveAction<T = unknown> {
    type: 'to-approve';
    payload: T;
}

export interface ApprovementSuccessAction<T = unknown> {
    type: 'approvement-success';
    payload: T;
}

export type ApprovementAction<T> =
    | IdToApproveAction<T | null>
    | ApprovementSuccessAction<T>;
