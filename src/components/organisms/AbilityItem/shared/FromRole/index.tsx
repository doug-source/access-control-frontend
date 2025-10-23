import { BtnRow } from '@/components/atoms/BtnRow';
import { AttachIcon } from '@/components/atoms/icons/AttachIcon';
import { DetachIcon } from '@/components/atoms/icons/DetachIcon';
import { Dialog } from '@/components/molecules/Dialog';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import type { AbilityIndex } from '@/shared/types/Models/Ability';
import { useDeps } from './shared/useDeps';

interface FromUserProps {
    data: AbilityIndex;
}

export const FromRole = ({ data }: FromUserProps) => {
    const {
        pathname,
        abilities,
        attachPending,
        detachPending,

        attachClickHandler,
        detachClickHandler,

        showConfirmAttach,
        setShowConfirmAttach,
        attachHandler,

        showConfirmDetach,
        setShowConfirmDetach,
        detachHandler,
    } = useDeps(data);
    return (
        <>
            <BtnRow
                show={
                    pathname.endsWith('/attach') &&
                    abilities.includes('attach-ability-to-role')
                }
                description={`Botão para vincular ao papel a habilidade de nome ${data.name}.`}
                onClick={attachClickHandler}
            >
                <AttachIcon
                    show
                    title="Vincular"
                    className={iconStyles.iconSwing}
                />
            </BtnRow>
            <BtnRow
                show={
                    !pathname.endsWith('/attach') &&
                    abilities.includes('detach-ability-from-role')
                }
                description={`Botão para desvincular do papel a habilidade de nome ${data.name}.`}
                onClick={detachClickHandler}
            >
                <DetachIcon
                    show
                    title="Desvincular"
                    className={iconStyles.iconSwing}
                />
            </BtnRow>
            <SpinnerCovering show={attachPending || detachPending} />
            <Dialog.Attach
                show={showConfirmAttach}
                setShowDialog={setShowConfirmAttach}
                handler={attachHandler}
                subject="habilidade"
            />
            <Dialog.Detach
                show={showConfirmDetach}
                setShowDialog={setShowConfirmDetach}
                handler={detachHandler}
                subject="habilidade"
            />
        </>
    );
};
