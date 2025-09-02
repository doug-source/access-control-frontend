import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import { Group } from '../Group';
import styles from './Groups.module.scss';

type GroupsProps = ComponentPropsWithoutRef<'div'> & {
    selected: number;
    values: number[];
    onChangeGroup(value: number): void;
};

export const Groups = ({
    className,
    selected,
    values,
    onChangeGroup,
    ...remain
}: GroupsProps) => {
    return (
        <div {...remain} className={classNames(styles.groups, className)}>
            {values.map((value) => (
                <Group
                    key={value}
                    selected={selected}
                    valueGroup={value}
                    onChangeGroup={() => onChangeGroup(value)}
                />
            ))}
        </div>
    );
};
