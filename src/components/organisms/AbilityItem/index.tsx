import { BoxListItem } from '@/components/molecules/BoxListItem';
import type { AbilityIndex } from '@/shared/types/Models/Ability';
import { Default } from './shared/Default';
import { FromRole } from './shared/FromRole';
import { FromUser } from './shared/FromUser';

interface AbilityItemProps {
    data: AbilityIndex;
}

export const AbilityItem = ({ data }: AbilityItemProps) => (
    <BoxListItem
        data={data}
        keyDesk="name"
        makeNavigation={(id) => `/abilities/${id}`}
    >
        <Default data={data} />
    </BoxListItem>
);

AbilityItem.FromUser = ({ data }: AbilityItemProps) => (
    <BoxListItem
        data={data}
        keyDesk="name"
        makeNavigation={(id) => `/abilities/${id}`}
    >
        <FromUser data={data} />
    </BoxListItem>
);

AbilityItem.FromRole = ({ data }: AbilityItemProps) => (
    <BoxListItem
        data={data}
        keyDesk="name"
        makeNavigation={(id) => `/abilities/${id}`}
    >
        <FromRole data={data} />
    </BoxListItem>
);
