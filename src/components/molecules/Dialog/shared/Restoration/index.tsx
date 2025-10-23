import { ConfirmationContent } from '@/components/molecules/ConfirmationContent';
import dialogStyles from '@/shared/stylessheets/dialog.module.scss';
import { PropsWithShow } from '@/shared/types/Utils';
import { pickDom } from '@/shared/utils/pickDom';
import { createPortal } from 'react-dom';
import { Base } from '../Base';

interface RestorationDialogProps {
    setShowDialog(show: boolean): void;
    handler(): void;
    subject: string;
}

export const RestorationDialog = ({
    show,
    setShowDialog,
    handler,
    subject,
}: PropsWithShow<RestorationDialogProps, true>) => {
    if (!show) {
        return null;
    }
    return createPortal(
        <Base
            show={show}
            aria-label={`Confirmação de restauração: ${subject}`}
            heading="Confirmação"
            className={dialogStyles.dialog}
            onClose={() => setShowDialog(false)}
        >
            <ConfirmationContent
                action="restaurar"
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
