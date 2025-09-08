import { ColumnBox } from '@/components/atoms/ColumnBox';
import { StretchedBox } from '@/components/atoms/StretchedBox';
import { EmailInputFilterBlock } from '@/components/organisms/EmailInputFilterBlock';
import { ListItems } from '@/components/organisms/ListItems';
import { ListWrapper } from '@/components/organisms/ListWrapper';
import { PaginationDispatch } from '@/components/organisms/PaginationDispatch';
import { RegisterRequestItem } from '@/components/organisms/RegisterRequestItem';
import inputFilterStyles from '@/shared/stylessheets/inputFilter.module.scss';
import type { RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import type { PaginationLoaderData } from '@/shared/types/Pagination/PaginationLoaderData';
import type { ReloadHandle } from '@/shared/types/ReactHandles/ReloadHandle';
import { Suspense, useRef } from 'react';
import { Await, useLoaderData, useLocation } from 'react-router';

export const RegisterRequestsTemplate = () => {
    const { pagination, output } =
        useLoaderData() as PaginationLoaderData<RegisterRequestIndex>;
    const searchParams = new URLSearchParams(useLocation().search);
    const changeRef = useRef<ReloadHandle>(null);
    return (
        <>
            <StretchedBox>
                <ColumnBox>
                    <EmailInputFilterBlock
                        className={inputFilterStyles.inputFilterBlock}
                        subject="usuário"
                        navigation="/register-requests"
                        defaultValue={searchParams.get('email') ?? ''}
                        onChange={() => changeRef.current?.wait()}
                    />
                    <Suspense
                        fallback={
                            <PaginationDispatch.Fallback {...pagination} />
                        }
                    >
                        <Await resolve={output}>
                            {({ lastPage, total }) => (
                                <PaginationDispatch
                                    {...{ ...pagination, lastPage, total }}
                                    navigation="/register-requests"
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
                        item={RegisterRequestItem}
                        ref={changeRef}
                    />
                </StretchedBox>
            </StretchedBox>
        </>
    );
};
