import { InputFilterBlock } from '@/components/molecules/InputFilterBlock';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { type ChangeFilterAction } from '@/shared/types/Reducers/Custom/PaginationAction';

interface EmailInputFilterBlockProps {
    subject: string;
    className?: string;
}

export const EmailInputFilterBlock = ({
    subject,
    className,
}: EmailInputFilterBlockProps) => {
    const dispatch = useDispatch<ChangeFilterAction>();
    return (
        <InputFilterBlock
            className={className}
            label={`Email de ${subject}`}
            placeholder={`Email de ${subject}`}
            btnText="Atualizar"
            onChange={() =>
                dispatch({
                    type: 'change-filter',
                })
            }
            nameInput="email"
        />
    );
};
