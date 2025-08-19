import { CommonRow } from '@/components/atoms/CommonRow';
import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GoogleIcon } from '@/components/atoms/icons/GoogleIcon';
import { Divisor } from '@/components/molecules/Divisor';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { SocialLoginLink } from '@/components/molecules/SocialLoginLink';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import type { RequestAccountState } from '@/shared/types/States';
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
    const [providerLink] = useDeps();
    return (
        <FormCardContainer
            state={state}
            heading="Solicitar Acesso"
            topContent={<GateLinkBox />}
            submitBtnText="Solicitar"
            formAction={formAction}
            pending={pending}
            afterContent={
                <>
                    <Divisor>ou</Divisor>
                    <CommonRow>
                        <SocialLoginLink href={providerLink} type="secondary">
                            <GoogleIcon />
                            <div>Continue com Google</div>
                        </SocialLoginLink>
                    </CommonRow>
                </>
            }
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
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="phone">
                    Telefone
                </LabelWarned>
                <FieldGroup.Input
                    name="phone"
                    defaultValue={state.fields.phone}
                />
            </FieldGroup.Box>
        </FormCardContainer>
    );
};
