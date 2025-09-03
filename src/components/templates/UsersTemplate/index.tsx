import { ColumnBox } from '@/components/atoms/ColumnBox';
import { FiltersBlock } from '@/components/atoms/FiltersBlock';
import { StretchedBox } from '@/components/atoms/StretchedBox';
import { PlusLink } from '@/components/molecules/PlusLink';
import { UserItem } from '@/components/molecules/UserItem';
import { AttachConfirmation } from '@/components/organisms/AttachConfirmation';
import { ListWrapper } from '@/components/organisms/ListWrapper';
import { NameInputFilterBlock } from '@/components/organisms/NameInputFilterBlock';
import { PaginationDispatch } from '@/components/organisms/PaginationDispatch';
import { RemotionConfirmation } from '@/components/organisms/RemotionConfirmation';
import { UsersItems } from '@/components/organisms/UsersItems';
import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import inputFilterStyles from '@/shared/stylessheets/inputFilter.module.scss';
import { type UsersState } from '@/shared/types/Reducers/Users';
import styles from './UsersTemplate.module.scss';
import { useDeps } from './shared/useDeps';

interface UsersTemplateProps {
    state: UsersState;
}

export const UsersTemplate = ({ state }: UsersTemplateProps) => {
    const { dispatch, removeHandler, canAddUser } = useDeps(state);
    return (
        <>
            <StretchedBox>
                <ColumnBox>
                    <FiltersBlock>
                        <NameInputFilterBlock
                            className={inputFilterStyles.inputFilterBlock}
                            subject="usuário"
                            context="user"
                        />
                        <PlusLink
                            to="/users/create"
                            title="Criar usuário"
                            show={canAddUser}
                        />
                    </FiltersBlock>
                    <PaginationDispatch state={state} context="user" />
                </ColumnBox>
                <StretchedBox>
                    <ListWrapper requestType={state.requestType}>
                        <RemotionDataProvider
                            remotionConfirm={state.remotionConfirm}
                            onRemove={removeHandler}
                        >
                            <UsersItems items={state.data} item={UserItem} />
                        </RemotionDataProvider>
                    </ListWrapper>
                </StretchedBox>
            </StretchedBox>
            <RemotionConfirmation
                show={state.idRemoved !== null}
                action="remover este usuário"
                label="remoção de usuário"
                onPositive={removeHandler}
            />
            <AttachConfirmation
                user={state.user}
                idToAttach={state.idToAttach}
                className={styles.dialogAttach}
                onClose={() =>
                    dispatch({
                        type: 'to-attach',
                        payload: null,
                    })
                }
            />
        </>
    );
};
