import { AppTitle } from '@/shared/components/atoms/AppTitle';
import type { Resolve } from '@/shared/types/Utils';
import type { ComponentPropsWithRef, PropsWithChildren } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

type ScreenWrapperProps = Resolve<
    PropsWithChildren<Required<ComponentPropsWithRef<typeof AppTitle>>>
>;

export const ScreenWrapper = ({ title, children }: ScreenWrapperProps) => (
    <>
        <ScrollRestoration />
        <AppTitle title={title} />
        {children ?? <Outlet />}
    </>
);
