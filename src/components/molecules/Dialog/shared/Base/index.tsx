import { Backdrop } from '@/components/atoms/Backdrop';
import { CloseIcon } from '@/components/atoms/icons/CloseIcon';
import { TabIndexReset } from '@/components/atoms/TabIndexReset';
import {
    type ComponentPropsWithRef,
    type PropsWithChildren,
    useId,
} from 'react';
import styles from './Base.module.scss';

type BaseContainerProps = Pick<
    ComponentPropsWithRef<'div'>,
    'aria-label' | 'children'
>;
type BackdropProps = ComponentPropsWithRef<typeof Backdrop>;
type RemainProps = Omit<BackdropProps, keyof BaseContainerProps>;

interface BaseProps extends PropsWithChildren, RemainProps {
    heading: string;
    'aria-label': NonNullable<BaseContainerProps['aria-label']>;
    onClose?: () => void;
}

export const Base = ({
    show = false,
    heading,
    'aria-label': ariaLabel,
    children,
    onClose,
    ...remain
}: BaseProps) => {
    const headingId = useId();
    const descId = useId();
    return (
        <Backdrop
            {...remain}
            show={show}
            onClick={(evt) => evt.stopPropagation()}
        >
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
