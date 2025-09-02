import { AppTitle } from '@/shared/components/atoms/AppTitle';
import type { Resolve } from '@/shared/types/Utils';
import type { ComponentPropsWithRef, PropsWithChildren } from 'react';
import { ScrollRestoration } from 'react-router';

type ScreenWrapperProps = Resolve<
    Required<PropsWithChildren<ComponentPropsWithRef<typeof AppTitle>>>
>;

export const ScreenWrapper = ({ title, children }: ScreenWrapperProps) => (
    <>
        <ScrollRestoration />
        <AppTitle title={title} />
        {children}
    </>
);
