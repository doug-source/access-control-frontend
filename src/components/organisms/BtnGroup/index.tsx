import { PrimaryBtn } from '@/components/molecules/PrimaryBtn';
import { SecondaryBtn } from '@/components/molecules/SecondaryBtn';
import classNames from 'classnames';
import { MouseEventHandler, type ComponentPropsWithoutRef } from 'react';
import styles from './BtnGroup.module.scss';

type BtnGroupProps = ComponentPropsWithoutRef<'div'> & {
    firstLabel: string;
    secondLabel: string;
    onFirstClick: MouseEventHandler<HTMLButtonElement>;
    onSecondClick: MouseEventHandler<HTMLButtonElement>;
    orientation?: 'horizontal' | 'vertical';
    pattern?: 'no-equal' | 'equal';
};

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
