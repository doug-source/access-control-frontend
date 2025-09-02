import { Backdrop } from '@/components/atoms/Backdrop';
import { Spinner } from '@/components/atoms/Spinner';
import type { ComponentPropsWithRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './SpinnerCovering.module.scss';

type SpinnerCoveringProps = Omit<
    ComponentPropsWithRef<typeof Backdrop>,
    'children'
>;

export const SpinnerCovering = (props: SpinnerCoveringProps) => {
    return createPortal(
        <Backdrop {...props}>
            <Spinner className={styles.spinner} />
        </Backdrop>,
        document.getElementById('cover') ?? document.createDocumentFragment()
    );
};
