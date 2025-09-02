import { ContentBox } from '@/components/atoms/ContentBox';
import classNames from 'classnames';
import { memo, type ComponentPropsWithRef } from 'react';
import styles from './FormContentBox.module.scss';

type FormContentBoxProps = ComponentPropsWithRef<typeof ContentBox>;

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
