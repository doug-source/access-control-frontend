import { InfoStack } from '@/components/atoms/InfoStack';
import { type Role } from '@/shared/types/Models/Role';

type RoleInfoStackContentProps = {
    roleInstance: Role | null;
};

export const RoleInfoStackContent = ({
    roleInstance,
}: RoleInfoStackContentProps) => (
    <>
        <InfoStack.Item header>Name</InfoStack.Item>
        <InfoStack.Item>{roleInstance?.name}</InfoStack.Item>
        <InfoStack.Item header>Data de criação</InfoStack.Item>
        <InfoStack.Item>{roleInstance?.createdAt}</InfoStack.Item>
        <InfoStack.Item header>Última atualização</InfoStack.Item>
        <InfoStack.Item>{roleInstance?.updatedAt}</InfoStack.Item>
    </>
);
