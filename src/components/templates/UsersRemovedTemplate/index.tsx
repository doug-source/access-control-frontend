import { ColumnBox } from '@/components/atoms/ColumnBox';
import { FiltersBlock } from '@/components/atoms/FiltersBlock';
import { StretchedBox } from '@/components/atoms/StretchedBox';
import { UserRemovedItem } from '@/components/molecules/UserRemovedItem';
import { ListWrapper } from '@/components/organisms/ListWrapper';
import { NameInputFilterBlock } from '@/components/organisms/NameInputFilterBlock';
import { PaginationDispatch } from '@/components/organisms/PaginationDispatch';
import { RemotionConfirmation } from '@/components/organisms/RemotionConfirmation';
import { RestorationConfirmation } from '@/components/organisms/RestorationConfirmation';
import { UsersItems } from '@/components/organisms/UsersItems';
import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import { RestorationDataProvider } from '@/shared/providers/RestorationDataProvider';
import inputFilterStyles from '@/shared/stylessheets/inputFilter.module.scss';
import { type UsersState } from '@/shared/types/Reducers/Users';
import { type ReactNode } from 'react';
import { useDeps } from './shared/useDeps';

interface UsersRemovedTemplateProps {
    state: UsersState;
    filters?: ReactNode;
}

export const UsersRemovedTemplate = ({ state }: UsersRemovedTemplateProps) => {
    const [removeHandler, restoreHandler] = useDeps(state);
    return (
        <>
            <StretchedBox>
                <ColumnBox>
                    <FiltersBlock>
                        <NameInputFilterBlock
                            className={inputFilterStyles.inputFilterBlock}
                            subject="usuário"
                        />
                    </FiltersBlock>
                    <PaginationDispatch state={state} />
                </ColumnBox>
                <StretchedBox>
                    <ListWrapper requestType={state.requestType}>
                        <RestorationDataProvider
                            restorationConfirm={state.restorationConfirm}
                            onRestore={restoreHandler}
                        >
                            <RemotionDataProvider
                                remotionConfirm={state.remotionConfirm}
                                onRemove={removeHandler}
                            >
                                <UsersItems
                                    items={state.data}
                                    item={UserRemovedItem}
                                />
                            </RemotionDataProvider>
                        </RestorationDataProvider>
                    </ListWrapper>
                </StretchedBox>
            </StretchedBox>
            <RemotionConfirmation
                show={state.idRemoved !== null}
                action="remover este usuário"
                label="remoção de usuário"
                onPositive={removeHandler}
            />
            <RestorationConfirmation
                show={state.idRestored !== null}
                action="restaurar este usuário"
                label="restauração de usuário"
                onPositive={restoreHandler}
            />
        </>
    );
};
