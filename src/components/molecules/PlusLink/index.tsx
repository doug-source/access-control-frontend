import { Anchor } from '@/components/atoms/Anchor';
import { PlusIcon } from '@/components/atoms/icons/PlusIcon';
import { type WithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './PlusLink.module.scss';

type PlusLinkProps = WithShow<ComponentPropsWithoutRef<typeof Anchor>>;

export const PlusLink = ({ className, ...remain }: PlusLinkProps) => (
    <Anchor {...remain} className={classNames(styles.plusLink, className)}>
        <PlusIcon />
    </Anchor>
);
