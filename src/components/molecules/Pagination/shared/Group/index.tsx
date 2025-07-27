import { Btn } from '@/components/atoms/Btn';
import classNames from 'classnames';
import { ComponentPropsWithoutRef, useId } from 'react';
import styles from './Group.module.scss';

interface GroupProps extends ComponentPropsWithoutRef<typeof Btn> {
    valueGroup: number;
    selected: number;
    onChangeGroup(): void;
}

export const Group = ({
    valueGroup,
    selected,
    onChangeGroup,
    ...remain
}: GroupProps) => {
    const descId = useId();
    return (
        <Btn
            {...remain}
            className={classNames(
                styles.groupItem,
                selected === valueGroup && styles.selected
            )}
            onClick={onChangeGroup}
            aria-describedby={descId}
        >
            {valueGroup}
            <span id={descId} className="screen-reader-only">
                Botão para definir o grupo atual de paginação como {valueGroup}.
            </span>
        </Btn>
    );
};
