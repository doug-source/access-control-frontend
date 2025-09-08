import { ColumnBox } from '@/components/atoms/ColumnBox';
import { FiltersBlock } from '@/components/atoms/FiltersBlock';
import { StretchedBox } from '@/components/atoms/StretchedBox';
import { ListItems } from '@/components/organisms/ListItems';
import { ListWrapper } from '@/components/organisms/ListWrapper';
import { NameInputFilterBlock } from '@/components/organisms/NameInputFilterBlock';
import { PaginationDispatch } from '@/components/organisms/PaginationDispatch';
import inputFilterStyles from '@/shared/stylessheets/inputFilter.module.scss';
import type { UserIndex } from '@/shared/types/Models/User';
import type { PaginationLoaderData } from '@/shared/types/Pagination/PaginationLoaderData';
import type { ReloadHandle } from '@/shared/types/ReactHandles/ReloadHandle';
import type { ListNavigations } from '@/shared/types/Urls/shared/Navigations';
import { ComponentType, type ReactNode, Suspense, useRef } from 'react';
import { Await, useLoaderData, useLocation } from 'react-router';

interface UsersNewTemplateProps {
    navigation: ListNavigations['user'];
    item: ComponentType<{
        data: UserIndex;
    }>;
    tools?: ReactNode;
}

export const UsersTemplate = ({
    navigation,
    tools,
    item: Item,
}: UsersNewTemplateProps) => {
    const { pagination, output } =
        useLoaderData() as PaginationLoaderData<UserIndex>;
    const searchParams = new URLSearchParams(useLocation().search);
    const changeRef = useRef<ReloadHandle>(null);
    return (
        <>
            <StretchedBox>
                <ColumnBox>
                    <FiltersBlock>
                        <NameInputFilterBlock
                            className={inputFilterStyles.inputFilterBlock}
                            subject="usuário"
                            navigation={navigation}
                            defaultValue={searchParams.get('name') ?? ''}
                            onChange={() => changeRef.current?.wait()}
                        />
                        {tools}
                    </FiltersBlock>
                    <Suspense
                        fallback={
                            <PaginationDispatch.Fallback {...pagination} />
                        }
                    >
                        <Await resolve={output}>
                            {({ lastPage, total }) => (
                                <PaginationDispatch
                                    {...{ ...pagination, lastPage, total }}
                                    navigation={navigation}
                                    onChange={() => changeRef.current?.wait()}
                                />
                            )}
                        </Await>
                    </Suspense>
                </ColumnBox>
                <StretchedBox>
                    <ListWrapper
                        output={output}
                        list={ListItems}
                        item={Item}
                        ref={changeRef}
                    />
                </StretchedBox>
            </StretchedBox>
        </>
    );
};
