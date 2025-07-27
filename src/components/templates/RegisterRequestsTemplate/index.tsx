import { ColumnBox } from '@/components/atoms/ColumnBox';
import { StretchedBox } from '@/components/atoms/StretchedBox';
import { AprovationConfirmation } from '@/components/organisms/AprovationConfirmation';
import { EmailInputFilterBlock } from '@/components/organisms/EmailInputFilterBlock';
import { PaginationDispatch } from '@/components/organisms/PaginationDispatch';
import { RemotionConfirmation } from '@/components/organisms/RemotionConfirmation';
import { ApprovementDataProvider } from '@/shared/providers/ApprovementDataProvider';
import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import inputFilterStyles from '@/shared/stylessheets/inputFilter.module.scss';
import { type RegisterRequestsState } from '@/shared/types/Reducers/RegisterRequests';
import { type ReactNode } from 'react';
import { useDeps } from './shared/useDeps';

interface RegisterRequestsTemplateProps {
    state: RegisterRequestsState;
    children: ReactNode;
}

export const RegisterRequestsTemplate = ({
    state,
    children,
}: RegisterRequestsTemplateProps) => {
    const [onRemove, onApprove] = useDeps(state, '/api/registers/requests');
    return (
        <>
            <StretchedBox>
                <ColumnBox>
                    <EmailInputFilterBlock
                        className={inputFilterStyles.inputFilterBlock}
                        subject="usuário"
                    />
                    <PaginationDispatch state={state} />
                </ColumnBox>
                <StretchedBox>
                    <ApprovementDataProvider
                        approvementConfirm={state.approvementConfirm}
                        onApprove={onApprove}
                    >
                        <RemotionDataProvider
                            remotionConfirm={state.remotionConfirm}
                            onRemove={onRemove}
                        >
                            {children}
                        </RemotionDataProvider>
                    </ApprovementDataProvider>
                </StretchedBox>
            </StretchedBox>
            <RemotionConfirmation
                show={state.idRemoved !== null}
                action="remover este pedido"
                label="remoção de pedido"
                onPositive={onRemove}
            />
            <AprovationConfirmation
                show={state.idApproved !== null}
                action="aprovar este pedido"
                label="aprovação de pedido"
                onPositive={onApprove}
            />
        </>
    );
};
