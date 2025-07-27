import { List } from '@/components/atoms/List';
import { RegisterPermissionItem } from '@/components/molecules/RegisterPermissionItem';
import { type ComponentPropsWithoutRef } from 'react';

type RegisterPermissionItemProps = ComponentPropsWithoutRef<
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
