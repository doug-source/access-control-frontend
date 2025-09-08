import classNames from 'classnames';
import type { ComponentPropsWithRef, MouseEventHandler } from 'react';
import { PrimaryBtn } from '../PrimaryBtn';
import { SecondaryBtn } from '../SecondaryBtn';
import styles from './Group.module.scss';

interface BtnGroupProps extends ComponentPropsWithRef<'div'> {
    firstLabel: string;
    secondLabel: string;
    onFirstClick: MouseEventHandler<HTMLButtonElement>;
    onSecondClick: MouseEventHandler<HTMLButtonElement>;
    orientation?: 'horizontal' | 'vertical';
    pattern?: 'no-equal' | 'equal';
}

export const BtnGroup = ({
    firstLabel,
    secondLabel,
    onFirstClick,
    onSecondClick,
    className,
    orientation = 'horizontal',
    pattern = 'no-equal',
    ...remain
}: BtnGroupProps) => (
    <div
        {...remain}
        className={classNames(
            styles.group,
            orientation === 'vertical' && styles.vertical,
            className
        )}
    >
        <PrimaryBtn type="button" onClick={onFirstClick}>
            {firstLabel}
        </PrimaryBtn>
        {pattern === 'no-equal' && (
            <SecondaryBtn type="button" onClick={onSecondClick}>
                {secondLabel}
            </SecondaryBtn>
        )}
        {pattern === 'equal' && (
            <PrimaryBtn type="button" onClick={onSecondClick}>
                {secondLabel}
            </PrimaryBtn>
        )}
    </div>
);
