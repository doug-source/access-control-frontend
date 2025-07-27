export interface DetachmentDataProvided {
    detachmentConfirm: boolean;
    onDetach(): Promise<void>;
}
