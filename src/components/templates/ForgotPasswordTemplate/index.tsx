import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import { type State } from '@/shared/types/Reducers/Standard/State';
import { btnIsDisabled } from '@/shared/utils/btnIsDisabled';
import { useForgotPasswordSubmit } from './shared/useForgotPasswordSubmit';

interface ForgotPasswordTemplateProps {
    state: State;
}

export const ForgotPasswordTemplate = ({
    state,
}: ForgotPasswordTemplateProps) => {
    const [emailRef, submitHandler] = useForgotPasswordSubmit();
    return (
        <FormCardContainer
            topContent={<GateLinkBox />}
            heading="Esqueceu a senha?"
            submitHandler={submitHandler}
            submitBtnText="Solicitar"
            disabledBtn={btnIsDisabled(state.requestStatus, 0)}
            state={state}
        >
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="email">
                    E-mail
                </LabelWarned>
                <FieldGroup.Input type="text" ref={emailRef} />
            </FieldGroup.Box>
        </FormCardContainer>
    );
};
