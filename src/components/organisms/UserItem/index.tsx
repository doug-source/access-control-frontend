import { BtnRow } from '@/components/atoms/BtnRow';
import { AbilitiesIcon } from '@/components/atoms/icons/AbilitiesIcon';
import { AttachIcon } from '@/components/atoms/icons/AttachIcon';
import { RolesIcon } from '@/components/atoms/icons/RolesIcon';
import { BoxListItem } from '@/components/molecules/BoxListItem';
import { Dialog } from '@/components/molecules/Dialog';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { TrashBtnRow } from '@/components/molecules/TrashBtnRow';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import type { UserIndex } from '@/shared/types/Models/User';
import classNames from 'classnames';
import styles from './UserItem.module.scss';
import { useDeps } from './shared/useDeps';

interface UserItemProps {
    data: UserIndex;
}

export const UserItem = ({ data }: UserItemProps) => {
    const {
        abilities,
        rolesHandler,
        abilitiesHandler,
        isCurrentUser,

        showConfirm: showConfirmRemotion,
        setShowConfirm: setShowConfirmRemotion,
        pending: remotionPending,

        handler: removeHandler,
        clickHandler: removeClickHandler,

        showConfirmSelect,
        setShowConfirmSelect,
        onAttachHandler,
    } = useDeps(data);

    return (
        <BoxListItem
            data={data}
            keyDesk="name"
            makeNavigation={(id) => `/users/${id}`}
        >
            <BtnRow
                description={`Botão para vincular papéis ou habilidades ao usuário ${data.name}.`}
                onClick={onAttachHandler}
                show={abilities.includes('attach-role-and-ability')}
            >
                <AttachIcon title="Vincular" className={iconStyles.iconSwing} />
            </BtnRow>
            <BtnRow
                description={`Botão para visualizar habilidades ao usuário ${data.name}.`}
                onClick={abilitiesHandler(data)}
            >
                <AbilitiesIcon
                    title="Habilidades"
                    className={iconStyles.iconSwing}
                />
            </BtnRow>
            <BtnRow
                description={`Botão para visualizar papéis ao usuário ${data.name}.`}
                onClick={rolesHandler(data)}
            >
                <RolesIcon title="Papéis" className={iconStyles.iconSwing} />
            </BtnRow>
            <TrashBtnRow
                target={`usuário de nome ${data.name}`}
                onClick={removeClickHandler}
                className={classNames(
                    isCurrentUser(data) && styles.trashDisabled
                )}
                show={abilities.includes('remove-user')}
            />
            <Dialog.Remotion
                show={showConfirmRemotion}
                setShowDialog={setShowConfirmRemotion}
                handler={removeHandler}
                subject="usuário"
            />
            <SpinnerCovering show={remotionPending} />
            <Dialog.Select
                user={data}
                show={showConfirmSelect}
                setShowDialog={setShowConfirmSelect}
            />
        </BoxListItem>
    );
};
