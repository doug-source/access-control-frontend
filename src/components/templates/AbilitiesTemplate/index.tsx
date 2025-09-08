import { ColumnBox } from '@/components/atoms/ColumnBox';
import { FiltersBlock } from '@/components/atoms/FiltersBlock';
import { StretchedBox } from '@/components/atoms/StretchedBox';
import { ListItems } from '@/components/organisms/ListItems';
import { ListWrapper } from '@/components/organisms/ListWrapper';
import { NameInputFilterBlock } from '@/components/organisms/NameInputFilterBlock';
import { PaginationDispatch } from '@/components/organisms/PaginationDispatch';
import inputFilterStyles from '@/shared/stylessheets/inputFilter.module.scss';
import type { AbilityIndex } from '@/shared/types/Models/Ability';
import type { PaginationLoaderData } from '@/shared/types/Pagination/PaginationLoaderData';
import type { ReloadHandle } from '@/shared/types/ReactHandles/ReloadHandle';
import type { ListNavigations } from '@/shared/types/Urls/shared/Navigations';
import { type ComponentType, type ReactNode, Suspense, useRef } from 'react';
import { Await, useLoaderData, useLocation } from 'react-router';

interface AbilitiesTemplateProps {
    navigation: ListNavigations['ability'];
    item: ComponentType<{
        data: AbilityIndex;
    }>;
    tools?: ReactNode;
    remain?: ReactNode;
}

export const AbilitiesTemplate = ({
    navigation,
    item: Item,
    tools,
    remain,
}: AbilitiesTemplateProps) => {
    const { pagination, output } =
        useLoaderData() as PaginationLoaderData<AbilityIndex>;
    const searchParams = new URLSearchParams(useLocation().search);
    const changeRef = useRef<ReloadHandle>(null);
    return (
        <>
            <StretchedBox>
                <ColumnBox>
                    <FiltersBlock>
                        <NameInputFilterBlock
                            className={inputFilterStyles.inputFilterBlock}
                            subject="habilidade"
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
                    {remain}
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
