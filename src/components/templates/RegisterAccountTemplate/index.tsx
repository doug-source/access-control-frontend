import { CommonRow } from '@/components/atoms/CommonRow';
import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GoogleIcon } from '@/components/atoms/icons/GoogleIcon';
import { Divisor } from '@/components/molecules/Divisor';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { SocialLoginLink } from '@/components/molecules/SocialLoginLink';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import type { RegisterAccountState } from '@/shared/types/States';
import { useDeps } from './shared/useDeps';

interface RegisterAccountTemplateProps {
    state: RegisterAccountState;
    formAction(payload: FormData): void;
    pending: boolean;
}

export const RegisterAccountTemplate = ({
    state,
    formAction,
    pending,
}: RegisterAccountTemplateProps) => {
    const [providerLink] = useDeps(state.token);
    return (
        <FormCardContainer
            state={state}
            heading="Registro"
            topContent={<GateLinkBox />}
            submitBtnText="Registrar"
            formAction={formAction}
            pending={pending}
            afterContent={
                <>
                    <Divisor>ou</Divisor>
                    <CommonRow>
                        <SocialLoginLink type="secondary" href={providerLink}>
                            <GoogleIcon />
                            <div>Continuar com Google</div>
                        </SocialLoginLink>
                    </CommonRow>
                </>
            }
        >
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="name">
                    Nome
                </LabelWarned>
                <FieldGroup.Input
                    name="name"
                    defaultValue={state.fields.name}
                />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="email">
                    E-mail
                </LabelWarned>
                <FieldGroup.Input
                    name="email"
                    defaultValue={state.fields.email}
                />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="password">
                    Senha
                </LabelWarned>
                <FieldGroup.Input
                    type="password"
                    name="password"
                    defaultValue={state.fields.password}
                    blurred
                />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <FieldGroup.Label>Confirme a senha</FieldGroup.Label>
                <FieldGroup.Input
                    type="password"
                    name="passConfirm"
                    defaultValue={state.fields.passConfirm}
                    blurred
                />
            </FieldGroup.Box>
        </FormCardContainer>
    );
};
