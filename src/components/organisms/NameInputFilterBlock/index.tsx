import { InputFilterBlock } from '@/components/molecules/InputFilterBlock';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { usePageGroupPagination } from '@/shared/hooks/usePageGroupPagination';
import type { ChangeFilterAction } from '@/shared/types/Reducers/Custom/PaginationAction';
import { groups, type PaginateKeyContext } from '@/shared/utils/pagination';
import type { ComponentPropsWithoutRef } from 'react';

interface NameInputFilterBlockProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    subject: string;
    context: PaginateKeyContext;
}

export const NameInputFilterBlock = ({
    subject,
    context,
    className,
    ...remain
}: NameInputFilterBlockProps) => {
    const { setPage, setGroup } = usePageGroupPagination(context);
    const dispatch = useDispatch<ChangeFilterAction>();
    return (
        <InputFilterBlock
            {...remain}
            className={className}
            label={`Nome de ${subject}`}
            placeholder={`Nome de ${subject}`}
            btnText="Atualizar"
            onChange={() => {
                dispatch({
                    type: 'change-filter',
                });
                setPage(1);
                setGroup(groups[0]);
            }}
            nameInput="name"
        />
    );
};
