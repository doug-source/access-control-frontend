import type { Paths } from '@/shared/types/Urls/Paths';
import type { WithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import { NavLink } from 'react-router';
import styles from './Anchor.module.scss';

type AnchorProps = WithShow<
    ComponentPropsWithRef<typeof NavLink> & {
        to: Paths['navigation']['concrete'];
    }
>;

export const Anchor = ({
    show = true,
    to,
    className,
    children,
    ...remain
}: AnchorProps) => {
    if (!show) {
        return null;
    }
    return (
        <NavLink
            {...remain}
            to={to}
            className={classNames(styles.anchor, className)}
        >
            {children}
        </NavLink>
    );
};
