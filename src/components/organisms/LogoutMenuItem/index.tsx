import { LogoutIcon } from '@/components/atoms/icons/LogoutIcon';
import { Menu } from '@/components/atoms/Menu';
import { LogoutBtn } from '@/components/molecules/LogoutBtn';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { type ComponentPropsWithoutRef, useState } from 'react';
import styles from './LogoutMenuItem.module.scss';

type LogoutMenuItemProps = Omit<
    ComponentPropsWithoutRef<typeof Menu.Item>,
    'children'
>;

export const LogoutMenuItem = (props: LogoutMenuItemProps) => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <SpinnerCovering show={loading} />
            <Menu.Item {...props}>
                <LogoutBtn
                    className={styles.logoutBtn}
                    logoutLoading={setLoading}
                >
                    <LogoutIcon className={styles.logoutIcon} />
                    <div>Sair</div>
                </LogoutBtn>
            </Menu.Item>
        </>
    );
};
