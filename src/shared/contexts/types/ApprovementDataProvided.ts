export interface ApprovementDataProvided {
    approvementConfirm: boolean;
    onApprove(): Promise<void>;
}
