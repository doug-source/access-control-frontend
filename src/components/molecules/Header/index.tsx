import { Anchor } from '@/components/atoms/Anchor';
import { BrandIcon } from '@/components/atoms/icons/BrandIcon';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './Header.module.scss';
import { UserBtn } from './shared/UserBtn';

type HeaderProps = Omit<ComponentPropsWithoutRef<'header'>, 'children'>;

export const Header = ({ className, ...remain }: HeaderProps) => (
    <header {...remain} className={classNames(styles.header, className)}>
        <div className={styles.headerTop}>
            <div
                className={classNames(
                    styles.headerTopItem,
                    styles.headerTopLeftItem
                )}
            >
                <Anchor to="/home" className={styles.headerTopBrandIconAnchor}>
                    <BrandIcon />
                </Anchor>
                <div className={styles.appTitleBox}>
                    <h1 id="app-title" className={styles.appTitle}></h1>
                </div>
            </div>
            <div
                className={classNames(
                    styles.headerTopItem,
                    styles.headerTopRightItem
                )}
            >
                <UserBtn />
            </div>
        </div>
    </header>
);
