import { ConfirmationContent } from '@/components/molecules/ConfirmationContent';
import { Dialog } from '@/components/molecules/Dialog';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { useDispatch } from '@/shared/hooks/useDispatch';
import dialogStyles from '@/shared/stylessheets/dialog.module.scss';
import { type IdToRemovedAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { type WithShow } from '@/shared/types/Utils';
import { useState } from 'react';

interface RemotionConfirmationProps {
    label: string;
    action: string;
    onPositive(): Promise<void>;
}

export const RemotionConfirmation = ({
    show,
    label,
    action,
    onPositive,
}: WithShow<RemotionConfirmationProps, true>) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<IdToRemovedAction<null>>();
    if (loading) {
        return <SpinnerCovering show />;
    }
    return (
        <Dialog
            show={show}
            aria-label={`Confirmação de ${label}`}
            heading="Confirmação"
            className={dialogStyles.dialog}
            onClose={() => dispatch({ type: 'to-remove', payload: null })}
        >
            <ConfirmationContent
                action={action}
                setLoading={setLoading}
                onPositive={async () => {
                    await onPositive();
                    dispatch({ type: 'to-remove', payload: null });
                }}
                onNegative={() => {
                    dispatch({ type: 'to-remove', payload: null });
                }}
            />
        </Dialog>
    );
};
