import { Backdrop } from '@/components/atoms/Backdrop';
import { CloseIcon } from '@/components/atoms/icons/CloseIcon';
import { TabIndexReset } from '@/components/atoms/TabIndexReset';
import {
    type ComponentPropsWithRef,
    type PropsWithChildren,
    useId,
} from 'react';
import styles from './Dialog.module.scss';

type DialogContainerProps = Pick<
    ComponentPropsWithRef<'div'>,
    'aria-label' | 'children'
>;
type BackdropProps = ComponentPropsWithRef<typeof Backdrop>;
type RemainProps = Omit<BackdropProps, keyof DialogContainerProps>;

interface DialogProps extends PropsWithChildren, RemainProps {
    heading: string;
    'aria-label': NonNullable<DialogContainerProps['aria-label']>;
    onClose?: () => void;
}

export const Dialog = ({
    show = false,
    heading,
    'aria-label': ariaLabel,
    children,
    onClose,
    ...remain
}: DialogProps) => {
    const headingId = useId();
    const descId = useId();
    return (
        <Backdrop {...remain} show={show}>
            <TabIndexReset />
            <div
                className={styles.dialogContainer}
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                aria-labelledby={headingId}
            >
                <button
                    type="button"
                    className={styles.btnClose}
                    aria-describedby={descId}
                    onClick={() => onClose && onClose()}
                >
                    <CloseIcon className={styles.closeIcon} />
                    <span id={descId} className="screen-reader-only">
                        Botão para fechar a caixa de diálogo.
                    </span>
                </button>
                <h2 id={headingId} className={styles.heading}>
                    {heading}
                </h2>
                {children}
            </div>
            <TabIndexReset />
        </Backdrop>
    );
};
