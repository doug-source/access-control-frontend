import { BoxListItem } from '@/components/molecules/BoxListItem';
import type { RoleIndex } from '@/shared/types/Models/Role';
import { Default } from './shared/Default';
import { FromUser } from './shared/FromUser';

interface RoleItemProps {
    data: RoleIndex;
}

export const RoleItem = ({ data }: RoleItemProps) => (
    <BoxListItem
        data={data}
        keyDesk="name"
        makeNavigation={(id) => `/roles/${id}`}
    >
        <Default data={data} />
    </BoxListItem>
);

RoleItem.FromUser = ({ data }: RoleItemProps) => (
    <BoxListItem
        data={data}
        keyDesk="name"
        makeNavigation={(id) => `/roles/${id}`}
    >
        <FromUser data={data} />
    </BoxListItem>
);
