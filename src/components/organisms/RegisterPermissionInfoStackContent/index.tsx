import { InfoStack } from '@/components/atoms/InfoStack';
import { type RegisterPermission } from '@/shared/types/Models/RegisterPermission';

type RegisterPermissionInfoStackContentProps = {
    registerPermission: RegisterPermission | null;
};

export const RegisterPermissionInfoStackContent = ({
    registerPermission,
}: RegisterPermissionInfoStackContentProps) => (
    <>
        <InfoStack.Item header>E-mail</InfoStack.Item>
        <InfoStack.Item>{registerPermission?.email}</InfoStack.Item>
        <InfoStack.Item header>Telefone</InfoStack.Item>
        <InfoStack.Item>{registerPermission?.phone ?? '-'}</InfoStack.Item>
        <InfoStack.Item header>Data de Expiração</InfoStack.Item>
        <InfoStack.Item>{registerPermission?.expirationData}</InfoStack.Item>
        <InfoStack.Item header>Data de criação</InfoStack.Item>
        <InfoStack.Item>{registerPermission?.createdAt}</InfoStack.Item>
        <InfoStack.Item header>Última atualização</InfoStack.Item>
        <InfoStack.Item>{registerPermission?.updatedAt}</InfoStack.Item>
    </>
);
