// import { AttachConfirmContent } from '@/components/molecules/AttachConfirmContent';
import { Btn } from '@/components/atoms/Btn';
import dialogStyles from '@/shared/stylessheets/dialog.module.scss';
import type { UserIndex } from '@/shared/types/Models/User';
import type { PropsWithShow } from '@/shared/types/Utils';
import { pickDom } from '@/shared/utils/pickDom';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import { Base } from '../Base';
import styles from './SelectDialog.module.scss';

interface SelectDialogProps {
    user: UserIndex;
    setShowDialog(show: boolean): void;
}

export const SelectDialog = ({
    show,
    user,
    setShowDialog,
}: PropsWithShow<SelectDialogProps, true>) => {
    const navigate = useNavigate();
    if (!show) {
        return null;
    }
    return createPortal(
        <Base
            show
            aria-label={`Vinculação de papéis ou habilidades`}
            heading="Vinculação"
            className={classNames(dialogStyles.dialog, styles.selectDialog)}
            onClose={() => setShowDialog(false)}
        >
            <h3
                className={classNames(
                    dialogStyles.heading,
                    styles.attachConfirmHeading
                )}
            >
                Escolha o tipo
            </h3>
            <Btn.Group
                orientation="vertical"
                pattern="equal"
                className={dialogStyles.dialogBtnGroup}
                firstLabel="Papel"
                secondLabel="Habilidade"
                onFirstClick={() => {
                    navigate(`/roles/user/${user.id}/attach`);
                }}
                onSecondClick={() => {
                    navigate(`/abilities/user/${user.id}/attach`);
                }}
            />
        </Base>,
        pickDom('confirmation')
    );
};
