import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import type { ForgotPasswordState } from '@/shared/types/States';

interface ForgotPasswordTemplateProps {
    state: ForgotPasswordState;
    formAction(payload: FormData): void;
    pending: boolean;
}

export const ForgotPasswordTemplate = ({
    state,
    formAction,
    pending,
}: ForgotPasswordTemplateProps) => (
    <FormCardContainer
        topContent={<GateLinkBox />}
        heading="Esqueceu a senha?"
        formAction={formAction}
        pending={pending}
        submitBtnText="Solicitar"
        state={state}
    >
        <FieldGroup.Box>
            <LabelWarned request={state.requestStatus} field="email">
                E-mail
            </LabelWarned>
            <FieldGroup.Input
                type="text"
                name="email"
                defaultValue={state.fields.email}
            />
        </FieldGroup.Box>
    </FormCardContainer>
);
