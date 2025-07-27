export interface RemotionDataProvided {
    remotionConfirm: boolean;
    onRemove(): Promise<void>;
}
