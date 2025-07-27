import { ColumnBox } from '@/components/atoms/ColumnBox';
import { FiltersBlock } from '@/components/atoms/FiltersBlock';
import { PaginationPurpose } from '@/components/atoms/PaginationPurpose';
import { StretchedBox } from '@/components/atoms/StretchedBox';
import { AbilityItem } from '@/components/molecules/AbilityItem';
import { PlusLink } from '@/components/molecules/PlusLink';
import { AbilitiesItems } from '@/components/organisms/AbilitiesItems';
import { AttachmentConfirmation } from '@/components/organisms/AttachmentConfirmation';
import { ListWrapper } from '@/components/organisms/ListWrapper';
import { NameInputFilterBlock } from '@/components/organisms/NameInputFilterBlock';
import { PaginationDispatch } from '@/components/organisms/PaginationDispatch';
import { RemotionConfirmation } from '@/components/organisms/RemotionConfirmation';
import { AttachmentDataProvider } from '@/shared/providers/AttachmentDataProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import { type AbilitiesState } from '@/shared/types/Reducers/Abilities';
import { useDeps } from './shared/useDeps';

interface AbilitiesTemplateProps {
    state: AbilitiesState;
}

export const AbilitiesTemplate = ({ state }: AbilitiesTemplateProps) => {
    const { removeHandler, attachHandler, inputRef, info, abilities } =
        useDeps(state);
    return (
        <>
            <StretchedBox>
                <ColumnBox>
                    <FiltersBlock>
                        <InputRefProvider inputRef={inputRef}>
                            <NameInputFilterBlock subject="papel" />
                        </InputRefProvider>
                        <PlusLink
                            show={abilities.includes('add-ability-screen')}
                            to="/abilities-create"
                            title="Criar habilidade"
                        />
                    </FiltersBlock>
                    <PaginationDispatch state={state} />
                </ColumnBox>
                <StretchedBox>
                    <RemotionDataProvider
                        remotionConfirm={state.remotionConfirm}
                        onRemove={removeHandler}
                    >
                        <AttachmentDataProvider
                            attachmentConfirm={state.attachmentConfirm}
                            onAttach={attachHandler}
                        >
                            <PaginationPurpose
                                show={Boolean(info)}
                                label={info?.label}
                                value={info?.value}
                            />
                            <ListWrapper requestType={state.requestType}>
                                <AbilitiesItems
                                    items={state.data}
                                    item={AbilityItem}
                                />
                            </ListWrapper>
                        </AttachmentDataProvider>
                    </RemotionDataProvider>
                </StretchedBox>
            </StretchedBox>
            <RemotionConfirmation
                show={state.idRemoved !== null}
                action="remover esta habilidade"
                label="remoção de habilidade"
                onPositive={removeHandler}
            />
            <AttachmentConfirmation
                show={state.idAttached !== null}
                action="adicionar esta habilidade"
                label="adição de habilidade"
                onPositive={attachHandler}
            />
        </>
    );
};
