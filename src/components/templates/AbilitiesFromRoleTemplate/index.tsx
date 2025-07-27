import { ColumnBox } from '@/components/atoms/ColumnBox';
import { FiltersBlock } from '@/components/atoms/FiltersBlock';
import { PaginationPurpose } from '@/components/atoms/PaginationPurpose';
import { StretchedBox } from '@/components/atoms/StretchedBox';
import { AbilityFromSubjectItem } from '@/components/molecules/AbilityFromSubjectItem';
import { AbilitiesItems } from '@/components/organisms/AbilitiesItems';
import { AttachmentConfirmation } from '@/components/organisms/AttachmentConfirmation';
import { DetashmentConfirmation } from '@/components/organisms/DetashmentConfirmation';
import { ListWrapper } from '@/components/organisms/ListWrapper';
import { NameInputFilterBlock } from '@/components/organisms/NameInputFilterBlock';
import { PaginationDispatch } from '@/components/organisms/PaginationDispatch';
import { AttachmentDataProvider } from '@/shared/providers/AttachmentDataProvider';
import { DetachmentDataProvider } from '@/shared/providers/DetachmentDataProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { type AbilitiesState } from '@/shared/types/Reducers/Abilities';
import { useDeps } from './shared/useDeps';

interface AbilitiesFromRoleTemplateProps {
    state: AbilitiesState;
}

export const AbilitiesFromRoleTemplate = ({
    state,
}: AbilitiesFromRoleTemplateProps) => {
    const { attachHandler, dettachHandler, inputRef, info } = useDeps(state);
    return (
        <>
            <StretchedBox>
                <ColumnBox>
                    <FiltersBlock>
                        <InputRefProvider inputRef={inputRef}>
                            <NameInputFilterBlock subject="papel" />
                        </InputRefProvider>
                    </FiltersBlock>
                    <PaginationDispatch state={state} />
                </ColumnBox>
                <StretchedBox>
                    <PaginationPurpose show {...info} />
                    <ListWrapper requestType={state.requestType}>
                        <AttachmentDataProvider
                            attachmentConfirm={state.attachmentConfirm}
                            onAttach={attachHandler}
                        >
                            <DetachmentDataProvider
                                detachmentConfirm={state.detachmentConfirm}
                                onDetach={dettachHandler}
                            >
                                <AbilitiesItems
                                    items={state.data}
                                    item={AbilityFromSubjectItem}
                                />
                            </DetachmentDataProvider>
                        </AttachmentDataProvider>
                    </ListWrapper>
                </StretchedBox>
            </StretchedBox>
            <AttachmentConfirmation
                show={state.idAttached !== null}
                action="adicionar esta habilidade"
                label="adição de habilidade"
                onPositive={attachHandler}
            />
            <DetashmentConfirmation
                show={state.idDetached !== null}
                action="remover esta habilidade"
                label="remoção de habilidade"
                onPositive={dettachHandler}
            />
        </>
    );
};
