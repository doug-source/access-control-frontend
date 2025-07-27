import { InfoStack } from '@/components/atoms/InfoStack';
import { type User } from '@/shared/types/Models/User';

interface UserInfoStackContentProps {
    user: User | null;
}

export const UserInfoStackContent = ({ user }: UserInfoStackContentProps) => (
    <>
        <InfoStack.Item header>Email</InfoStack.Item>
        <InfoStack.Item>{user?.email}</InfoStack.Item>
        <InfoStack.Item header>Telefone</InfoStack.Item>
        <InfoStack.Item>{user?.phone ?? '-'}</InfoStack.Item>
        <InfoStack.Item header>Email Verificado</InfoStack.Item>
        <InfoStack.Item>{user?.emailVerifiedAt ?? 'Não'}</InfoStack.Item>
        <InfoStack.Item header>Data de criação</InfoStack.Item>
        <InfoStack.Item>{user?.createdAt}</InfoStack.Item>
        <InfoStack.Item header>Última atualização</InfoStack.Item>
        <InfoStack.Item>{user?.updatedAt}</InfoStack.Item>
        <InfoStack.Item show={Boolean(user?.deletedAt)} header>
            Data de remoção
        </InfoStack.Item>
        <InfoStack.Item show={Boolean(user?.deletedAt)}>
            {user?.deletedAt}
        </InfoStack.Item>
    </>
);
