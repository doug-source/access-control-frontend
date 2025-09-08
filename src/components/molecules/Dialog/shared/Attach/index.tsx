import { ConfirmationContent } from '@/components/molecules/ConfirmationContent';
import dialogStyles from '@/shared/stylessheets/dialog.module.scss';
import type { PropsWithShow } from '@/shared/types/Utils';
import { pickDom } from '@/shared/utils/pickDom';
import { createPortal } from 'react-dom';
import { Base } from '../Base';

interface AttachDialogProps {
    setShowDialog(show: boolean): void;
    setPending(pending: boolean): void;
    handler(): void;
    subject: string;
}

export const AttachDialog = ({
    show,
    setShowDialog,
    setPending,
    handler,
    subject,
}: PropsWithShow<AttachDialogProps, true>) => {
    if (!show) {
        return null;
    }
    return createPortal(
        <Base
            show
            aria-label={`Confirmação de vinculação: ${subject}`}
            heading="Confirmação"
            className={dialogStyles.dialog}
            onClose={() => setShowDialog(false)}
        >
            <ConfirmationContent
                action="vincular"
                onPositive={async () => {
                    setShowDialog(false);
                    setPending(true);
                    handler();
                }}
                onNegative={() => {
                    setShowDialog(false);
                }}
            />
        </Base>,
        pickDom('confirmation')
    );
};
