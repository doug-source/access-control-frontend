import { InputFilterBlock } from '@/components/molecules/InputFilterBlock';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { usePageGroupPagination } from '@/shared/hooks/usePageGroupPagination';
import type { ChangeFilterAction } from '@/shared/types/Reducers/Custom/PaginationAction';
import { groups, type PaginateKeyContext } from '@/shared/utils/pagination';

interface EmailInputFilterBlockProps {
    subject: string;
    context: PaginateKeyContext;
    className?: string;
}

export const EmailInputFilterBlock = ({
    subject,
    context,
    className,
}: EmailInputFilterBlockProps) => {
    const { setPage, setGroup } = usePageGroupPagination(context);
    const dispatch = useDispatch<ChangeFilterAction>();
    return (
        <InputFilterBlock
            className={className}
            label={`Email de ${subject}`}
            placeholder={`Email de ${subject}`}
            btnText="Atualizar"
            onChange={() => {
                dispatch({
                    type: 'change-filter',
                });
                setPage(1);
                setGroup(groups[0]);
            }}
            nameInput="email"
        />
    );
};
