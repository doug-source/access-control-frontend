import { Backdrop } from '@/components/atoms/Backdrop';
import { Spinner } from '@/components/atoms/Spinner';
import { ComponentPropsWithoutRef } from 'react';
import styles from './SpinnerCovering.module.scss';

type SpinnerCoveringProps = Omit<
    ComponentPropsWithoutRef<typeof Backdrop>,
    'children'
>;

export const SpinnerCovering = (props: SpinnerCoveringProps) => (
    <Backdrop {...props}>
        <Spinner className={styles.spinner} />
    </Backdrop>
);
