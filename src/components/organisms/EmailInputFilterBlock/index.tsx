import { InputFilterBlock } from '@/components/molecules/InputFilterBlock';
import type { Paths } from '@/shared/types/Urls/Paths';
import type { ComponentPropsWithRef } from 'react';
import { useNavigate } from 'react-router';

type RemainProps = Omit<ComponentPropsWithRef<'div'>, 'children' | 'onChange'>;
interface EmailInputFilterBlockProps extends RemainProps {
    subject: string;
    navigation: Paths['navigation']['lists'];
    defaultValue?: ComponentPropsWithRef<
        typeof InputFilterBlock
    >['defaultValue'];
    onChange?: () => void;
}

export const EmailInputFilterBlock = ({
    subject,
    navigation,
    className,
    defaultValue,
    onChange,
    ...remain
}: EmailInputFilterBlockProps) => {
    const navigate = useNavigate();
    return (
        <InputFilterBlock
            {...remain}
            className={className}
            label={`Email de ${subject}`}
            placeholder={`Email de ${subject}`}
            btnText="Atualizar"
            onChange={(email) => {
                onChange?.();
                const searchParams = new URLSearchParams({
                    email: email?.trim() ?? '',
                });
                navigate(`${navigation}?${searchParams.toString()}`, {
                    replace: true,
                });
            }}
            nameInput="email"
            defaultValue={defaultValue}
        />
    );
};
