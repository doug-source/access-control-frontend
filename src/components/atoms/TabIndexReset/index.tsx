import type { ComponentPropsWithRef } from 'react';

type TabIndexResetProps = Omit<ComponentPropsWithRef<'div'>, 'children'>;

export const TabIndexReset = (props: TabIndexResetProps) => (
    <div {...props} tabIndex={0}></div>
);
