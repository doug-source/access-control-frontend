export interface RestorationDataProvided {
    restorationConfirm: boolean;
    onRestore(): Promise<void>;
}
