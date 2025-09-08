import type { Paths } from '@/shared/types/Urls/Paths';
import type { PropsWithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import { Link } from 'react-router';
import styles from './Anchor.module.scss';

type BaseProps = Omit<ComponentPropsWithRef<typeof Link>, 'to'>;
interface AnchorProps extends BaseProps {
    to: Paths['navigation']['concrete'];
}

export const Anchor = ({
    show = true,
    to,
    className,
    children,
    ...remain
}: PropsWithShow<AnchorProps>) => {
    if (!show) {
        return null;
    }
    return (
        <Link
            {...remain}
            to={to}
            className={classNames(styles.anchor, className)}
        >
            {children}
        </Link>
    );
};
