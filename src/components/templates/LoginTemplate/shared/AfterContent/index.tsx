import { Anchor } from '@/components/atoms/Anchor';
import { BottomSection } from '@/components/molecules/BottomSection';
import { type ComponentPropsWithRef, memo } from 'react';

type AfterContentProps = Omit<
    ComponentPropsWithRef<typeof BottomSection>,
    'label'
>;

export const AfterContent = memo((props: AfterContentProps) => (
    <BottomSection {...props} label="Não possui uma conta?">
        <Anchor to="/request">Solicitação</Anchor>
    </BottomSection>
));
