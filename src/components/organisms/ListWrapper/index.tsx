import { List } from '@/components/atoms/List';
import { SkeletonList } from '@/components/molecules/SkeletonList';
import { type UsersState } from '@/shared/types/Reducers/Users';
import { type ReactNode } from 'react';

interface ListWrapperProps {
    requestType: UsersState['requestType'];
    children: ReactNode;
}

export const ListWrapper = ({ requestType, children }: ListWrapperProps) => (
    <SkeletonList show={requestType !== 'list'}>
        <List.Box>{children}</List.Box>
    </SkeletonList>
);
