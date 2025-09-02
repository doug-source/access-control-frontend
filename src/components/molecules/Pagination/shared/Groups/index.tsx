import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import { Group } from '../Group';
import styles from './Groups.module.scss';

interface GroupsProps extends ComponentPropsWithRef<'div'> {
    selected: number;
    values: number[];
    onChangeGroup(value: number): void;
}

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
