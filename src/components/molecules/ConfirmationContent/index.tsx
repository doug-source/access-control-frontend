import { Btn } from '@/components/atoms/Btn';
import dialogStyles from '@/shared/stylessheets/dialog.module.scss';

interface ConfirmationContentProps {
    action: string;
    onPositive(): Promise<void>;
    onNegative(): void;
    setLoading?: (value: boolean) => void;
}

export const ConfirmationContent = ({
    action,
    onPositive,
    onNegative,
    setLoading,
}: ConfirmationContentProps) => (
    <>
        <h3 className={dialogStyles.heading}>Deseja {action}?</h3>
        <Btn.Group
            className={dialogStyles.dialogBtnGroup}
            firstLabel="Sim"
            secondLabel="Não"
            onFirstClick={async (evt) => {
                evt.stopPropagation();
                setLoading?.(true);
                await onPositive();
                setLoading?.(false);
            }}
            onSecondClick={(evt) => {
                evt.stopPropagation();
                onNegative();
            }}
        />
    </>
);
