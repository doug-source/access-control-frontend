import { InfoStack } from '@/components/atoms/InfoStack';
import { type RegisterRequest } from '@/shared/types/Models/RegisterRequest';

interface RegisterRequestInfoStackContentProps {
    registerRequest: RegisterRequest | null;
}

export const RegisterRequestInfoStackContent = ({
    registerRequest,
}: RegisterRequestInfoStackContentProps) => (
    <>
        <InfoStack.Item header>E-mail</InfoStack.Item>
        <InfoStack.Item>{registerRequest?.email}</InfoStack.Item>
        <InfoStack.Item header>Telefone</InfoStack.Item>
        <InfoStack.Item>{registerRequest?.phone ?? '-'}</InfoStack.Item>
        <InfoStack.Item header>Data de criação</InfoStack.Item>
        <InfoStack.Item>{registerRequest?.createdAt}</InfoStack.Item>
        <InfoStack.Item header>Última atualização</InfoStack.Item>
        <InfoStack.Item>{registerRequest?.updatedAt}</InfoStack.Item>
    </>
);
