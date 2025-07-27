import { List } from '@/components/atoms/List';
import { RegisterRequestItem } from '@/components/molecules/RegisterRequestItem';
import { ComponentPropsWithoutRef } from 'react';

type RegisterRequestItemProps = ComponentPropsWithoutRef<
    typeof RegisterRequestItem
>;

interface RegisterRequestItemsProps {
    items: RegisterRequestItemProps['registerRequest'][];
}

export const RegisterRequestItems = ({ items }: RegisterRequestItemsProps) => {
    if (items.length === 0) {
        return <List.Empty />;
    }
    return (
        <>
            {items.map((registerRequest) => (
                <RegisterRequestItem
                    key={registerRequest.id}
                    registerRequest={registerRequest}
                />
            ))}
        </>
    );
};
