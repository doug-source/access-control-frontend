import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import type { RequestAccountState } from '@/shared/types/States';
import { AfterContent } from './shared/AfterContent';
import { useDeps } from './shared/useDeps';

interface RequestAccountTemplateProps {
    state: RequestAccountState;
    formAction(payload: FormData): void;
    pending: boolean;
}

export const RequestAccountTemplate = ({
    state,
    formAction,
    pending,
}: RequestAccountTemplateProps) => {
    const { providerLink, emailId, phoneId } = useDeps();
    return (
        <FormCardContainer
            state={state}
            heading="Solicitar Acesso"
            topContent={<GateLinkBox />}
            submitBtnText="Solicitar"
            formAction={formAction}
            pending={pending}
            afterContent={<AfterContent providerLink={providerLink} />}
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
            <FieldGroup.Box>
                <LabelWarned
                    request={state.requestStatus}
                    field="phone"
                    htmlFor={phoneId}
                >
                    Telefone
                </LabelWarned>
                <FieldGroup.Input
                    name="phone"
                    id={phoneId}
                    defaultValue={state.fields.phone}
                />
            </FieldGroup.Box>
        </FormCardContainer>
    );
};
