import { Anchor } from '@/components/atoms/Anchor';
import { AbilitiesIcon } from '@/components/atoms/icons/AbilitiesIcon';
import { RegisterPermissionIcon } from '@/components/atoms/icons/RegisterPermissionIcon';
import { RegisterRequestIcon } from '@/components/atoms/icons/RegisterRequestIcon';
import { RolesIcon } from '@/components/atoms/icons/RolesIcon';
import { UsersIcon } from '@/components/atoms/icons/UsersIcon';
import { UsersRemovedIcon } from '@/components/atoms/icons/UsersRemovedIcon';
import { Menu } from '@/components/atoms/Menu';
import { Header } from '@/components/molecules/Header';
import { LogoutMenuItem } from '@/components/organisms/LogoutMenuItem';
import classNames from 'classnames';
import { Outlet } from 'react-router';
import styles from './MainLayout.module.scss';
import { useDeps } from './shared/useDeps';

export const MainLayout = () => {
    const { pathname, usersMenuId, abilities } = useDeps();
    return (
        <>
            <Header />
            <main className={styles.mainLayout}>
                <Menu.Box show={pathname === '/home'}>
                    <Menu.Item show={abilities.includes('user-screen')}>
                        <Anchor
                            to="/users"
                            className={styles.menuItemAnchor}
                            aria-describedby={usersMenuId}
                        >
                            <UsersIcon
                                className={classNames(
                                    styles.menuItemIcon,
                                    styles.usersIcon
                                )}
                            />
                            <div id={usersMenuId}>Usuários</div>
                        </Anchor>
                    </Menu.Item>
                    <Menu.Item show={abilities.includes('user-screen')}>
                        <Anchor
                            to="/users/removed"
                            className={styles.menuItemAnchor}
                        >
                            <UsersRemovedIcon className={styles.menuItemIcon} />
                            <div>Usuários Removidos</div>
                        </Anchor>
                    </Menu.Item>
                    <Menu.Item show={abilities.includes('role-screen')}>
                        <Anchor to="/roles" className={styles.menuItemAnchor}>
                            <RolesIcon className={styles.menuItemIcon} />
                            <div>Papéis</div>
                        </Anchor>
                    </Menu.Item>
                    <Menu.Item show={abilities.includes('ability-screen')}>
                        <Anchor
                            to="/abilities"
                            className={styles.menuItemAnchor}
                        >
                            <AbilitiesIcon className={styles.menuItemIcon} />
                            <div>Habilidades</div>
                        </Anchor>
                    </Menu.Item>
                    <Menu.Item
                        show={abilities.includes('register-request-screen')}
                    >
                        <Anchor
                            to="/register-requests"
                            className={styles.menuItemAnchor}
                        >
                            <RegisterRequestIcon
                                className={styles.menuItemIcon}
                            />
                            <div>
                                <span className={styles.noWrap}>
                                    Pedidos de
                                </span>{' '}
                                registro
                            </div>
                        </Anchor>
                    </Menu.Item>
                    <Menu.Item
                        show={abilities.includes('register-permission-screen')}
                    >
                        <Anchor
                            to="/register-permissions"
                            className={styles.menuItemAnchor}
                        >
                            <RegisterPermissionIcon
                                className={styles.menuItemIcon}
                            />
                            <div>Permissões concedidas</div>
                        </Anchor>
                    </Menu.Item>
                    <LogoutMenuItem className={styles.logoutMenuItem} />
                </Menu.Box>
                <Outlet />
            </main>
        </>
    );
};
