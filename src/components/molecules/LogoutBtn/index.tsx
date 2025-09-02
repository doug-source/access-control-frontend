import { Btn } from '@/components/atoms/Btn';
import type { ComponentPropsWithRef } from 'react';
import { useLogoutHandler } from './shared/useLogoutHandler';

interface LogoutBtnProps extends ComponentPropsWithRef<typeof Btn> {
    logoutLoading: Parameters<typeof useLogoutHandler>[number];
}

export const LogoutBtn = ({
    logoutLoading,
    children,
    ...remain
}: LogoutBtnProps) => {
    const logoutHandler = useLogoutHandler(logoutLoading);
    return (
        <Btn {...remain} onClick={logoutHandler}>
            {children}
        </Btn>
    );
};
