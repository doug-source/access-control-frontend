import { InfoStack } from '@/components/atoms/InfoStack';
import { type Ability } from '@/shared/types/Models/Ability';

type AbilityInfoStackContentProps = {
    ability: Ability | null;
};

export const AbilityInfoStackContent = ({
    ability,
}: AbilityInfoStackContentProps) => (
    <>
        <InfoStack.Item header>Name</InfoStack.Item>
        <InfoStack.Item>{ability?.name}</InfoStack.Item>
        <InfoStack.Item header>Data de criação</InfoStack.Item>
        <InfoStack.Item>{ability?.createdAt}</InfoStack.Item>
        <InfoStack.Item header>Última atualização</InfoStack.Item>
        <InfoStack.Item>{ability?.updatedAt}</InfoStack.Item>
    </>
);
