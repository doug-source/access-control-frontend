import { ComponentPropsWithoutRef } from 'react';

type TabIndexResetProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export const TabIndexReset = (props: TabIndexResetProps) => (
    <div {...props} tabIndex={0}></div>
);
