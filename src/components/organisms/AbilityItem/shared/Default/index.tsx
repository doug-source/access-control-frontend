import { Dialog } from '@/components/molecules/Dialog';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { TrashBtnRow } from '@/components/molecules/TrashBtnRow';
import type { AbilityIndex } from '@/shared/types/Models/Ability';
import { useDeps } from './shared/useDeps';

interface DefaultProps {
    data: AbilityIndex;
}

export const Default = ({ data }: DefaultProps) => {
    const {
        abilities,
        removeClickHandler,
        remotionPending,
        showConfirmRemotion,
        setShowConfirmRemotion,
        setRemotionPending,
        removeHandler,
    } = useDeps(data);
    return (
        <>
            <TrashBtnRow
                target={`habilidade de nome ${data.name}`}
                onClick={removeClickHandler}
                show={abilities.includes('remove-ability')}
            />
            <SpinnerCovering show={remotionPending} />
            <Dialog.Remotion
                show={showConfirmRemotion}
                setShowDialog={setShowConfirmRemotion}
                setPending={setRemotionPending}
                handler={removeHandler}
                subject="habilidade"
            />
        </>
    );
};
