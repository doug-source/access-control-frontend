import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import type { ForgotPasswordState } from '@/shared/types/States';
import { useDeps } from './shared/useDeps';

interface ForgotPasswordTemplateProps {
    state: ForgotPasswordState;
    formAction(payload: FormData): void;
    pending: boolean;
}

export const ForgotPasswordTemplate = ({
    state,
    formAction,
    pending,
}: ForgotPasswordTemplateProps) => {
    const [emailId] = useDeps();
    return (
        <FormCardContainer
            topContent={<GateLinkBox />}
            heading="Esqueceu a senha?"
            formAction={formAction}
            pending={pending}
            submitBtnText="Solicitar"
            state={state}
        >
            <FieldGroup.Box>
                <LabelWarned
                    request={state.requestStatus}
                    field="email"
                    htmlFor={emailId}
                >
                    E-mail
                </LabelWarned>
                <FieldGroup.Input
                    type="text"
                    name="email"
                    id={emailId}
                    defaultValue={state.fields.email}
                />
            </FieldGroup.Box>
        </FormCardContainer>
    );
};
