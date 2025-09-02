import { Anchor } from '@/components/atoms/Anchor';
import classNames from 'classnames';
import { memo, type ComponentPropsWithoutRef } from 'react';
import styles from './GateLinkBox.module.scss';

type GateLinkBoxProps = Omit<ComponentPropsWithoutRef<typeof Anchor>, 'to'>;

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
