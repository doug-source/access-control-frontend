import { Pagination } from '@/components/molecules/Pagination';
import type { Paths } from '@/shared/types/Urls/Paths';
import { groups } from '@/shared/utils/defaultValues';
import type { ComponentPropsWithRef } from 'react';
import { useLocation, useNavigate } from 'react-router';

interface PaginationDispatchProps
    extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
    page: number;
    group: number;
    lastPage: number;
    total: number;
    navigation: Paths['navigation']['lists'];
    onChange?: () => void;
}

export const PaginationDispatch = ({
    page = 1,
    lastPage,
    group = groups[0],
    total,
    navigation,
    onChange,
    ...remain
}: PaginationDispatchProps) => {
    const navigate = useNavigate();
    const search = new URLSearchParams(useLocation().search);
    return (
        <Pagination
            {...remain}
            page={page}
            lastPage={lastPage}
            group={group}
            total={total}
            onChangePage={(newPage) => {
                if (total === 0) {
                    return;
                }
                onChange?.();
                search.set('page', newPage.toString());
                search.set('group', group.toString());
                navigate(`${navigation}?${search.toString()}`, {
                    replace: true,
                });
            }}
            onChangeGroup={(newGroup) => {
                if (total === 0) {
                    return;
                }
                onChange?.();
                search.set('page', page.toString());
                search.set('group', newGroup.toString());
                navigate(`${navigation}?${search.toString()}`, {
                    replace: true,
                });
            }}
        />
    );
};

PaginationDispatch.Fallback = ({
    page,
    group,
    ...remain
}: { page: number; group: number } & ComponentPropsWithRef<'div'>) => (
    <Pagination
        {...remain}
        page={page}
        group={group}
        lastPage={0}
        total={0}
        onChangePage={() => {}}
        onChangeGroup={() => {}}
    />
);
