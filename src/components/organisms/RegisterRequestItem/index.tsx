import { BtnRow } from '@/components/atoms/BtnRow';
import { ApproveIcon } from '@/components/atoms/icons/ApproveIcon';
import { BoxListItem } from '@/components/molecules/BoxListItem';
import { Dialog } from '@/components/molecules/Dialog';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { TrashBtnRow } from '@/components/molecules/TrashBtnRow';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import type { RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import { useDeps } from './shared/useDeps';

interface RegisterRequestItemProps {
    data: RegisterRequestIndex;
}

export const RegisterRequestItem = ({ data }: RegisterRequestItemProps) => {
    const {
        abilities,

        removeClickHandler,
        setShowConfirmRemotion,
        showConfirmRemotion,
        removeHandler,
        remotionPending,

        approvalClickHandler,
        setShowConfirmApproval,
        showConfirmApproval,
        approvalHandler,
        approvalPending,
    } = useDeps(data);
    return (
        <BoxListItem
            data={data}
            keyDesk="email"
            makeNavigation={(id) => `/register-requests/${id}`}
        >
            <BtnRow
                show={abilities.includes('approve-register-request')}
                description={`Botão para aprovar o pedido de registro, de email ${data.email}.`}
                onClick={approvalClickHandler}
            >
                <ApproveIcon
                    title="Aprovação"
                    className={iconStyles.iconSwing}
                />
            </BtnRow>
            <TrashBtnRow
                show={abilities.includes('remove-register-request')}
                target={`pedido de registro, de email ${data.email}`}
                onClick={removeClickHandler}
            />
            <Dialog.Remotion
                show={showConfirmRemotion}
                setShowDialog={setShowConfirmRemotion}
                handler={removeHandler}
                subject="pedido"
            />
            <SpinnerCovering show={remotionPending || approvalPending} />
            <Dialog.Approval
                show={showConfirmApproval}
                setShowDialog={setShowConfirmApproval}
                handler={approvalHandler}
                subject="pedido"
            />
        </BoxListItem>
    );
};
