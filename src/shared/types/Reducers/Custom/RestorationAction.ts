export interface IdToRestoreAction<T = unknown> {
    type: 'to-restore';
    payload: T;
}

export interface RestorationSuccessAction<T = unknown> {
    type: 'restoration-success';
    payload: T;
}

export type RestorationAction<T> =
    | IdToRestoreAction<T | null>
    | RestorationSuccessAction<T>;
