import { InputFilterBlock } from '@/components/molecules/InputFilterBlock';
import type { Paths } from '@/shared/types/Urls/Paths';
import type { ComponentPropsWithRef } from 'react';
import { useNavigate } from 'react-router';

type RemainProps = Omit<ComponentPropsWithRef<'div'>, 'children' | 'onChange'>;
interface NameInputFilterBlockProps extends RemainProps {
    subject: string;
    navigation: Paths['navigation']['lists'];
    defaultValue?: ComponentPropsWithRef<
        typeof InputFilterBlock
    >['defaultValue'];
    onChange?: () => void;
}

export const NameInputFilterBlock = ({
    subject,
    navigation,
    className,
    defaultValue,
    onChange,
    ...remain
}: NameInputFilterBlockProps) => {
    const navigate = useNavigate();
    return (
        <InputFilterBlock
            {...remain}
            className={className}
            label={`Nome de ${subject}`}
            placeholder={`Nome de ${subject}`}
            btnText="Atualizar"
            onChange={(name) => {
                onChange?.();
                const searchParams = new URLSearchParams({
                    name: name?.trim() ?? '',
                });
                navigate(`${navigation}?${searchParams.toString()}`, {
                    replace: true,
                });
            }}
            nameInput="name"
            defaultValue={defaultValue}
        />
    );
};
