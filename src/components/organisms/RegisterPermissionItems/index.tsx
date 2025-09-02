import { List } from '@/components/atoms/List';
import { RegisterPermissionItem } from '@/components/molecules/RegisterPermissionItem';
import type { ComponentPropsWithRef } from 'react';

type RegisterPermissionItemProps = ComponentPropsWithRef<
    typeof RegisterPermissionItem
>;

interface RegisterPermissionItemsProps {
    items: RegisterPermissionItemProps['registerPermission'][];
}

export const RegisterPermissionItems = ({
    items,
}: RegisterPermissionItemsProps) => {
    if (items.length === 0) {
        return <List.Empty />;
    }
    return (
        <>
            {items.map((d) => (
                <RegisterPermissionItem key={d.id} registerPermission={d} />
            ))}
        </>
    );
};
