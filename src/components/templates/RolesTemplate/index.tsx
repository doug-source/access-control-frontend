import { ColumnBox } from '@/components/atoms/ColumnBox';
import { FiltersBlock } from '@/components/atoms/FiltersBlock';
import { StretchedBox } from '@/components/atoms/StretchedBox';
import { PlusLink } from '@/components/molecules/PlusLink';
import { RoleItem } from '@/components/molecules/RoleItem';
import { ListWrapper } from '@/components/organisms/ListWrapper';
import { NameInputFilterBlock } from '@/components/organisms/NameInputFilterBlock';
import { PaginationDispatch } from '@/components/organisms/PaginationDispatch';
import { RemotionConfirmation } from '@/components/organisms/RemotionConfirmation';
import { RolesItems } from '@/components/organisms/RolesItems';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import { type RolesState } from '@/shared/types/Reducers/Roles';
import { useDeps } from './shared/useDeps';

interface RolesTemplateProps {
    state: RolesState;
}

export const RolesTemplate = ({ state }: RolesTemplateProps) => {
    const { removeHandler, inputRef, abilities } = useDeps(state);
    return (
        <>
            <StretchedBox>
                <ColumnBox>
                    <FiltersBlock>
                        <InputRefProvider inputRef={inputRef}>
                            <NameInputFilterBlock
                                subject="papel"
                                context="role"
                            />
                        </InputRefProvider>
                        <PlusLink
                            show={abilities.includes('add-role-screen')}
                            to="/roles/create"
                            title="Criar papel"
                        />
                    </FiltersBlock>
                    <PaginationDispatch state={state} context="role" />
                </ColumnBox>
                <StretchedBox>
                    <RemotionDataProvider
                        remotionConfirm={state.remotionConfirm}
                        onRemove={removeHandler}
                    >
                        <ListWrapper requestType={state.requestType}>
                            <RolesItems items={state.data} item={RoleItem} />
                        </ListWrapper>
                    </RemotionDataProvider>
                </StretchedBox>
            </StretchedBox>
            <RemotionConfirmation
                show={state.idRemoved !== null}
                action="remover este papel"
                label="remoção de papel"
                onPositive={removeHandler}
            />
        </>
    );
};
