import { ColumnBox } from '@/components/atoms/ColumnBox';
import { FiltersBlock } from '@/components/atoms/FiltersBlock';
import { PaginationPurpose } from '@/components/atoms/PaginationPurpose';
import { StretchedBox } from '@/components/atoms/StretchedBox';
import { RoleFromUserItem } from '@/components/molecules/RoleFromUserItem';
import { AttachmentConfirmation } from '@/components/organisms/AttachmentConfirmation';
import { DetashmentConfirmation } from '@/components/organisms/DetashmentConfirmation';
import { ListWrapper } from '@/components/organisms/ListWrapper';
import { NameInputFilterBlock } from '@/components/organisms/NameInputFilterBlock';
import { PaginationDispatch } from '@/components/organisms/PaginationDispatch';
import { RolesItems } from '@/components/organisms/RolesItems';
import { AttachmentDataProvider } from '@/shared/providers/AttachmentDataProvider';
import { DetachmentDataProvider } from '@/shared/providers/DetachmentDataProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import type { RolesState } from '@/shared/types/Reducers/Roles';
import { useDeps } from './shared/useDeps';

interface RolesFromTemplateProps {
    state: RolesState;
}

export const RolesFromUserTemplate = ({ state }: RolesFromTemplateProps) => {
    const { inputRef, attachHandler, detachHandler, info } = useDeps(state);
    return (
        <>
            <StretchedBox>
                <ColumnBox>
                    <FiltersBlock>
                        <InputRefProvider inputRef={inputRef}>
                            <NameInputFilterBlock
                                subject="papel"
                                context="role-from-user"
                            />
                        </InputRefProvider>
                    </FiltersBlock>
                    <PaginationDispatch
                        state={state}
                        context="role-from-user"
                    />
                </ColumnBox>
                <StretchedBox>
                    <AttachmentDataProvider
                        attachmentConfirm={state.attachmentConfirm}
                        onAttach={attachHandler}
                    >
                        <DetachmentDataProvider
                            detachmentConfirm={state.detachmentConfirm}
                            onDetach={detachHandler}
                        >
                            <PaginationPurpose show {...info} />
                            <ListWrapper requestType={state.requestType}>
                                <RolesItems
                                    items={state.data}
                                    item={RoleFromUserItem}
                                />
                            </ListWrapper>
                        </DetachmentDataProvider>
                    </AttachmentDataProvider>
                </StretchedBox>
            </StretchedBox>
            <AttachmentConfirmation
                show={state.idAttached !== null}
                action="vincular este papel"
                label="desvinculação de papel"
                onPositive={attachHandler}
            />
            <DetashmentConfirmation
                show={state.idDetached !== null}
                action="desvincular este papel"
                label="desvinculação de papel"
                onPositive={detachHandler}
            />
        </>
    );
};
