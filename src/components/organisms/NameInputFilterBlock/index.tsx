import { InputFilterBlock } from '@/components/molecules/InputFilterBlock';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { type ChangeFilterAction } from '@/shared/types/Reducers/Custom/PaginationAction';
import { ComponentPropsWithoutRef } from 'react';

interface NameInputFilterBlockProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    subject: string;
}

export const NameInputFilterBlock = ({
    subject,
    className,
    ...remain
}: NameInputFilterBlockProps) => {
    const dispatch = useDispatch<ChangeFilterAction>();
    return (
        <InputFilterBlock
            {...remain}
            className={className}
            label={`Nome de ${subject}`}
            placeholder={`Nome de ${subject}`}
            btnText="Atualizar"
            onChange={() =>
                dispatch({
                    type: 'change-filter',
                })
            }
            nameInput="name"
        />
    );
};
