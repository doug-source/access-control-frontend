import { Btn } from '@/components/atoms/Btn';
import { DoubleArrowIcon } from '@/components/atoms/icons/DoubleArrowIcon';
import classNames from 'classnames';
import { useId, type ComponentPropsWithRef } from 'react';
import styles from './Controls.module.scss';

interface ControlsProps extends ComponentPropsWithRef<'div'> {
    page: number;
    lastPage: number;
    onChangePage: (value: number) => void;
}

export const Controls = ({
    className,
    page,
    lastPage,
    onChangePage,
    ...remain
}: ControlsProps) => {
    const descLeftBtnId = useId();
    const descRightBtnId = useId();
    return (
        <div {...remain} className={classNames(styles.controls, className)}>
            <Btn
                className={styles.controlsBtn}
                aria-describedby={descLeftBtnId}
                onClick={() => {
                    if (page > 1) {
                        onChangePage(Math.max(page - 1, 1));
                    }
                }}
            >
                <DoubleArrowIcon className={styles.controlsBtnIconLeft} />
                <span id={descLeftBtnId} className="screen-reader-only">
                    Botão para diminuir a paginação atual.
                </span>
            </Btn>
            <div className={styles.controlsCounter}>
                <span>Página:&nbsp;</span>
                <span>{page}</span>
                <span>&nbsp;de&nbsp;</span>
                <span>{lastPage}</span>
            </div>
            <Btn
                className={styles.controlsBtn}
                aria-describedby={descRightBtnId}
                onClick={() => {
                    if (page < lastPage) {
                        onChangePage(Math.min(page + 1, lastPage));
                    }
                }}
            >
                <DoubleArrowIcon />
                <span id={descRightBtnId} className="screen-reader-only">
                    Botão para aumentar a paginação atual.
                </span>
            </Btn>
        </div>
    );
};
