import { UserTemplate } from '@/components/templates/UserTemplate';

interface UserProps {
    removed?: boolean;
}

export const User = ({ removed = false }: UserProps) => (
    <UserTemplate removed={removed} />
);
