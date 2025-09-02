import { ContentBox } from '@/components/atoms/ContentBox';
import classNames from 'classnames';
import { memo, type ComponentPropsWithoutRef } from 'react';
import styles from './FormContentBox.module.scss';

type FormContentBoxProps = ComponentPropsWithoutRef<typeof ContentBox>;

export const FormContentBox = memo(
    ({ children, className, ...remain }: FormContentBoxProps) => (
        <ContentBox
            {...remain}
            className={classNames(styles.formContentBox, className)}
        >
            {children}
        </ContentBox>
    )
);
