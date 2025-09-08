import { BtnRow } from '@/components/atoms/BtnRow';
import { UndoIcon } from '@/components/atoms/icons/UndoIcon';
import { BoxListItem } from '@/components/molecules/BoxListItem';
import { Dialog } from '@/components/molecules/Dialog';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { TrashBtnRow } from '@/components/molecules/TrashBtnRow';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import type { UserIndex } from '@/shared/types/Models/User';
import { useDeps } from './shared/useDeps';

interface UserRemovedItemProps {
    data: UserIndex;
}

export const UserRemovedItem = ({ data }: UserRemovedItemProps) => {
    const {
        abilities,

        showConfirmRemotion,
        setShowConfirmRemotion,
        remotionPending,
        setRemotionPending,

        removeHandler,
        removeClickHandler,

        showConfirmRestoration,
        setShowConfirmRestoration,
        restorePending,
        setRestorationPending,

        restoreHandler,
        restoreClickHandler,
    } = useDeps(data);
    return (
        <BoxListItem
            data={data}
            keyDesk="name"
            makeNavigation={(id) => `/users/removed/${id}`}
        >
            <BtnRow
                description={`Botão para restaurar o usuário de nome ${data.name}.`}
                onClick={restoreClickHandler}
                show={abilities.includes('restore-user')}
            >
                <UndoIcon title="Restaurar" className={iconStyles.iconSwing} />
            </BtnRow>
            <TrashBtnRow
                target={`usuário de nome ${data.name}`}
                onClick={removeClickHandler}
                show={abilities.includes('remove-user')}
            />
            <Dialog.Remotion
                show={showConfirmRemotion}
                setShowDialog={setShowConfirmRemotion}
                setPending={setRemotionPending}
                handler={removeHandler}
                subject="usuário"
            />
            <SpinnerCovering show={remotionPending || restorePending} />
            <Dialog.Restoration
                show={showConfirmRestoration}
                setPending={setRestorationPending}
                setShowDialog={setShowConfirmRestoration}
                handler={restoreHandler}
                subject="usuário"
            />
        </BoxListItem>
    );
};
