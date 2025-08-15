import { CommonRow } from '@/components/atoms/CommonRow';
import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GoogleIcon } from '@/components/atoms/icons/GoogleIcon';
import { Divisor } from '@/components/molecules/Divisor';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { SocialLoginLink } from '@/components/molecules/SocialLoginLink';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import { type State } from '@/shared/types/Reducers/Standard/State';
import { btnIsDisabled } from '@/shared/utils/btnIsDisabled';
import { useDeps } from './shared/useDeps';

interface RequestAccountTemplateProps {
    state: State;
}

export const RequestAccountTemplate = ({
    state,
}: RequestAccountTemplateProps) => {
    const {
        emailRef,
        phoneRef,
        providerLink,
        handler: submitHandler,
    } = useDeps();
    return (
        <FormCardContainer
            state={state}
            heading="Solicitar Acesso"
            topContent={<GateLinkBox />}
            submitHandler={submitHandler}
            submitBtnText="Solicitar"
            disabledBtn={btnIsDisabled(state.requestStatus, 0)}
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
                <FieldGroup.Input type="text" ref={emailRef} />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="phone">
                    Telefone
                </LabelWarned>
                <FieldGroup.Input ref={phoneRef} />
            </FieldGroup.Box>
        </FormCardContainer>
    );
};
