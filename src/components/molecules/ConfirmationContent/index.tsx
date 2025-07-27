import { BtnGroup } from '@/components/organisms/BtnGroup';
import dialogStyles from '@/shared/stylessheets/dialog.module.scss';

interface ConfirmationContentProps {
    action: string;
    setLoading(value: boolean): void;
    onPositive(): Promise<void>;
    onNegative(): void;
}

export const ConfirmationContent = ({
    action,
    setLoading,
    onPositive,
    onNegative,
}: ConfirmationContentProps) => (
    <>
        <h3 className={dialogStyles.heading}>Deseja {action}?</h3>
        <BtnGroup
            className={dialogStyles.dialogBtnGroup}
            firstLabel="Sim"
            secondLabel="Não"
            onFirstClick={async () => {
                setLoading(true);
                await onPositive();
                setLoading(false);
            }}
            onSecondClick={onNegative}
        />
    </>
);
