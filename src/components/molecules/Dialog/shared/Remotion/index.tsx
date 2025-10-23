import { ConfirmationContent } from '@/components/molecules/ConfirmationContent';
import dialogStyles from '@/shared/stylessheets/dialog.module.scss';
import type { PropsWithShow } from '@/shared/types/Utils';
import { pickDom } from '@/shared/utils/pickDom';
import { createPortal } from 'react-dom';
import { Base } from '../Base';

interface RemotionDialogProps {
    setShowDialog(show: boolean): void;
    handler(): void;
    subject: string;
}

export const RemotionDialog = ({
    show,
    setShowDialog,
    handler,
    subject,
}: PropsWithShow<RemotionDialogProps, true>) => {
    if (!show) {
        return null;
    }
    return createPortal(
        <Base
            show
            aria-label={`Confirmação de remoção: ${subject}`}
            heading="Confirmação"
            className={dialogStyles.dialog}
            onClose={() => setShowDialog(false)}
        >
            <ConfirmationContent
                action="remover"
                onPositive={async () => {
                    setShowDialog(false);
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
