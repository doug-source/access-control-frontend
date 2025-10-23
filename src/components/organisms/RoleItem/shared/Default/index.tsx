import { BtnRow } from '@/components/atoms/BtnRow';
import { AbilitiesIcon } from '@/components/atoms/icons/AbilitiesIcon';
import { AttachIcon } from '@/components/atoms/icons/AttachIcon';
import { Dialog } from '@/components/molecules/Dialog';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { TrashBtnRow } from '@/components/molecules/TrashBtnRow';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import type { RoleIndex } from '@/shared/types/Models/Role';
import { useDeps } from './shared/useDeps';

interface DefaultProps {
    data: RoleIndex;
}

export const Default = ({ data }: DefaultProps) => {
    const {
        abilities,
        abilitiesHandler,
        abilitiesToAttachHandler,

        removeHandler,
        remotionPending,
        showConfirmRemotion,
        setShowConfirmRemotion,
        removeClickHandler,
    } = useDeps(data);

    return (
        <>
            <BtnRow
                description={`Botão para vincular novas abilities ao papel de nome ${data.name}.`}
                onClick={abilitiesToAttachHandler(data)}
                show={abilities.includes('attach-ability-to-role')}
            >
                <AttachIcon className={iconStyles.iconSwing} title="Vincular" />
            </BtnRow>
            <BtnRow
                description={`Botão para visualizar as habilidades vinculadas ao papel de nome ${data.name}.`}
                onClick={abilitiesHandler(data)}
                show={abilities.includes('ability-from-role-screen')}
            >
                <AbilitiesIcon
                    className={iconStyles.iconSwing}
                    title="Habilidades"
                />
            </BtnRow>
            <TrashBtnRow
                target={`usuário de nome ${data.name}`}
                onClick={removeClickHandler}
                show={abilities.includes('remove-role')}
            />
            <SpinnerCovering show={remotionPending} />
            <Dialog.Remotion
                show={showConfirmRemotion}
                setShowDialog={setShowConfirmRemotion}
                handler={removeHandler}
                subject="papel"
            />
        </>
    );
};
