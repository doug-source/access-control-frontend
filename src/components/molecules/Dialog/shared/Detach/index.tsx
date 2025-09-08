import { ConfirmationContent } from '@/components/molecules/ConfirmationContent';
import dialogStyles from '@/shared/stylessheets/dialog.module.scss';
import type { PropsWithShow } from '@/shared/types/Utils';
import { pickDom } from '@/shared/utils/pickDom';
import { createPortal } from 'react-dom';
import { Base } from '../Base';

interface DetachDialogProps {
    setShowDialog(show: boolean): void;
    setPending(pending: boolean): void;
    handler(): void;
    subject: string;
}

export const DetachDialog = ({
    show,
    setShowDialog,
    setPending,
    handler,
    subject,
}: PropsWithShow<DetachDialogProps, true>) => {
    if (!show) {
        return null;
    }
    return createPortal(
        <Base
            show
            aria-label={`Confirmação de desvinculação: ${subject}`}
            heading="Confirmação"
            className={dialogStyles.dialog}
            onClose={() => setShowDialog(false)}
        >
            <ConfirmationContent
                action="desvincular"
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
