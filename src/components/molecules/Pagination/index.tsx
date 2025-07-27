import { groups } from '@/shared/utils/pagination';
import { ComponentPropsWithoutRef } from 'react';
import { Box } from './shared/Box';
import { Controls } from './shared/Controls';
import { Groups } from './shared/Groups';
import { Total } from './shared/Total';

interface PaginationProps extends ComponentPropsWithoutRef<'div'> {
    page: number;
    lastPage: number;
    group: number;
    total: number;
    onChangePage(value: number): void;
    onChangeGroup(value: number): void;
}

export const Pagination = ({
    page,
    lastPage,
    group,
    total,
    onChangeGroup,
    onChangePage,
    ...remain
}: PaginationProps) => (
    <Box {...remain}>
        <Controls page={page} lastPage={lastPage} onChangePage={onChangePage} />
        <Groups
            selected={group}
            values={groups}
            onChangeGroup={onChangeGroup}
        />
        <Total value={total} />
    </Box>
);
