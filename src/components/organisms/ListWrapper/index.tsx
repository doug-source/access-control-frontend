import { List } from '@/components/atoms/List';
import { SkeletonList } from '@/components/molecules/SkeletonList';
import type { ReloadHandle } from '@/shared/types/ReactHandles/ReloadHandle';
import type { ComponentType, RefObject } from 'react';
import { useDeps } from './shared/useDeps';

type ItemProp<I> = ComponentType<{
    data: I;
}>;

interface ListWrapperProps<T, I> {
    output: Promise<{ data: T[] }>;
    list: ComponentType<{
        items: T[];
        item: ItemProp<I>;
    }>;
    item: ItemProp<I>;
    ref?: RefObject<ReloadHandle | null>;
}

export const ListWrapper = <T, I>({
    output,
    list: ListComp,
    item: ItemComp,
    ref = { current: { wait() {} } },
}: ListWrapperProps<T, I>) => {
    const status = useDeps(output, ref);
    if (status.wait) {
        return <SkeletonList />;
    }
    return (
        <List.Box>
            <ListComp items={status.result?.data ?? []} item={ItemComp} />
        </List.Box>
    );
};
