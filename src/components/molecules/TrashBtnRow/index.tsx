import { BtnRow } from '@/components/atoms/BtnRow';
import { TrashIcon } from '@/components/atoms/icons/TrashIcon';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import type { PropsWithShow } from '@/shared/types/Utils';
import type { MouseEventHandler } from 'react';

interface TrashBtnRowProps {
    target: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

export const TrashBtnRow = ({
    show = true,
    className,
    target,
    onClick,
}: PropsWithShow<TrashBtnRowProps>) => {
    if (!show) {
        return null;
    }
    return (
        <BtnRow
            description={`Botão para remoção de ${target}.`}
            className={className}
            onClick={onClick}
        >
            <TrashIcon title="Remover" className={iconStyles.iconSwing} />
        </BtnRow>
    );
};
