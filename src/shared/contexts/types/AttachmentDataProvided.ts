export interface AttachmentDataProvided {
    attachmentConfirm: boolean;
    onAttach(): Promise<void>;
}
