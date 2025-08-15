import { CommonRow } from '@/components/atoms/CommonRow';
import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GoogleIcon } from '@/components/atoms/icons/GoogleIcon';
import { Divisor } from '@/components/molecules/Divisor';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { SocialLoginLink } from '@/components/molecules/SocialLoginLink';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import { type RegisterAccountState } from '@/shared/types/Reducers/Guest/RegisterAccount';
import { btnIsDisabled } from '@/shared/utils/btnIsDisabled';
import { useDeps } from './shared/useDeps';

interface RegisterAccountTemplateProps {
    state: RegisterAccountState;
}

export const RegisterAccountTemplate = ({
    state,
}: RegisterAccountTemplateProps) => {
    const {
        nameRef,
        emailRef,
        passwordRef,
        passConfirmationRef,
        handler: submitHandler,
        providerLink,
    } = useDeps(state.token);
    return (
        <FormCardContainer
            state={state}
            heading="Registro"
            topContent={<GateLinkBox />}
            submitHandler={submitHandler}
            submitBtnText="Registrar"
            disabledBtn={btnIsDisabled(state.requestStatus, 0)}
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
                <FieldGroup.Input ref={nameRef} />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="email">
                    E-mail
                </LabelWarned>
                <FieldGroup.Input ref={emailRef} />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="password">
                    Senha
                </LabelWarned>
                <FieldGroup.Input type="password" ref={passwordRef} blurred />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <FieldGroup.Label>Confirme a senha</FieldGroup.Label>
                <FieldGroup.Input
                    type="password"
                    ref={passConfirmationRef}
                    blurred
                />
            </FieldGroup.Box>
        </FormCardContainer>
    );
};
