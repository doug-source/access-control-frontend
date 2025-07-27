import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './SocialLoginLink.module.scss';

type SocialLoginLinkProps = ComponentPropsWithoutRef<'a'> & {
    type: 'primary' | 'secondary';
};

export const SocialLoginLink = ({
    type,
    className,
    children,
    ...remain
}: SocialLoginLinkProps) => (
    <a
        {...remain}
        className={classNames(
            styles.link,
            type === 'primary' ? styles.primary : styles.secondary,
            className
        )}
    >
        <div className={styles.socialIconBox}>{children}</div>
    </a>
);
