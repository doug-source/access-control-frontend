import { Anchor } from '@/components/atoms/Anchor';
import classNames from 'classnames';
import { memo, type ComponentPropsWithRef } from 'react';
import styles from './GateLinkBox.module.scss';

type GateLinkBoxProps = Omit<ComponentPropsWithRef<typeof Anchor>, 'to'>;

export const GateLinkBox = memo(
    ({ className, ...remain }: GateLinkBoxProps) => (
        <Anchor
            {...remain}
            to="/"
            className={classNames(styles.linkBox, className)}
        >
            <img
                className={styles.imageRoot}
                src="/img/flowers.png"
                alt="flowers login image"
            />
        </Anchor>
    )
);
