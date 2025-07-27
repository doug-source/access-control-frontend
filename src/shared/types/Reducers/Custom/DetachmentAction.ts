export interface IdToDetachAction<T = unknown> {
    type: 'to-detach';
    payload: T;
}

export interface DetachmentSuccessAction<T = unknown> {
    type: 'detachment-success';
    payload: T;
}

export type DetachmentAction<T> =
    | IdToDetachAction<T | null>
    | DetachmentSuccessAction<T>;
