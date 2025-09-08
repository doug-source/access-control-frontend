import { BtnRow } from '@/components/atoms/BtnRow';
import { AttachIcon } from '@/components/atoms/icons/AttachIcon';
import { DetachIcon } from '@/components/atoms/icons/DetachIcon';
import { Dialog } from '@/components/molecules/Dialog';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import type { RoleIndex } from '@/shared/types/Models/Role';
import { useDeps } from './shared/useDeps';

interface FromUserProps {
    data: RoleIndex;
}

export const FromUser = ({ data }: FromUserProps) => {
    const {
        pathname,
        abilities,
        attachPending,
        detachPending,

        attachClickHandler,
        detachClickHandler,

        showConfirmAttach,
        setShowConfirmAttach,
        setAttachPending,
        attachHandler,

        showConfirmDetach,
        setShowConfirmDetach,
        setDetachPending,
        detachHandler,
    } = useDeps(data);
    return (
        <>
            <BtnRow
                show={
                    pathname.endsWith('/attach') &&
                    abilities.includes('attach-role-to-user')
                }
                description={`Botão para vincular ao usuário o papel de nome ${data.name}.`}
                onClick={attachClickHandler}
            >
                <AttachIcon title="Vincular" className={iconStyles.iconSwing} />
            </BtnRow>
            <BtnRow
                show={
                    !pathname.endsWith('/attach') &&
                    abilities.includes('detach-role-from-user')
                }
                description={`Botão para desvincular do usuário o papel de nome ${data.name}.`}
                onClick={detachClickHandler}
            >
                <DetachIcon
                    title="Desvincular"
                    className={iconStyles.iconSwing}
                />
            </BtnRow>
            <SpinnerCovering show={attachPending || detachPending} />
            <Dialog.Attach
                show={showConfirmAttach}
                setShowDialog={setShowConfirmAttach}
                setPending={setAttachPending}
                handler={attachHandler}
                subject="papel"
            />
            <Dialog.Detach
                show={showConfirmDetach}
                setShowDialog={setShowConfirmDetach}
                setPending={setDetachPending}
                handler={detachHandler}
                subject="papel"
            />
        </>
    );
};
