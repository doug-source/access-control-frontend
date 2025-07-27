import { ConfirmationContent } from '@/components/molecules/ConfirmationContent';
import { Dialog } from '@/components/molecules/Dialog';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { useDispatch } from '@/shared/hooks/useDispatch';
import dialogStyles from '@/shared/stylessheets/dialog.module.scss';
import { IdToAttachAction } from '@/shared/types/Reducers/Custom/AttachmentAction';
import { type WithShow } from '@/shared/types/Utils';
import { useState } from 'react';

interface AttachmentConfirmationProps {
    label: string;
    action: string;
    onPositive(): Promise<void>;
}

export const AttachmentConfirmation = ({
    show,
    label,
    action,
    onPositive,
}: WithShow<AttachmentConfirmationProps, true>) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<IdToAttachAction<null>>();
    if (loading) {
        return <SpinnerCovering show />;
    }
    return (
        <Dialog
            show={show}
            aria-label={`Confirmação de ${label}`}
            heading="Confirmação"
            className={dialogStyles.dialog}
            onClose={() => dispatch({ type: 'to-attach', payload: null })}
        >
            <ConfirmationContent
                action={action}
                setLoading={setLoading}
                onPositive={async () => {
                    await onPositive();
                    dispatch({ type: 'to-attach', payload: null });
                }}
                onNegative={() => {
                    dispatch({ type: 'to-attach', payload: null });
                }}
            />
        </Dialog>
    );
};
