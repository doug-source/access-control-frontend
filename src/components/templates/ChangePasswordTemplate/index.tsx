import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import { type ResetPasswordState } from '@/shared/types/Reducers/Guest/ChangePassword';
import styles from './ChangePasswordTemplate.module.scss';
import { resetPassBtnIsDisabled } from './shared/resetPassBtnIsDisabled';
import { useDeps } from './shared/useDeps';

interface ChangePasswordTemplateProps {
    state: ResetPasswordState;
}

export const ChangePasswordTemplate = ({
    state,
}: ChangePasswordTemplateProps) => {
    const {
        emailRef,
        passwordRef,
        passConfirmRef,
        tokenRef,
        handler: submitHandler,
    } = useDeps();
    return (
        <FormCardContainer
            state={state}
            heading="Alterar senha"
            topContent={<GateLinkBox />}
            submitHandler={submitHandler}
            submitBtnText="Alterar"
            disabledBtn={resetPassBtnIsDisabled(state, 0)}
        >
            <FieldGroup.Box>
                <LabelWarned
                    request={state.requestStatus}
                    field="password"
                    className={styles.labelBox}
                >
                    Nova senha
                </LabelWarned>
                <FieldGroup.Input type="password" ref={passwordRef} blurred />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <FieldGroup.Label className={styles.label}>
                    Confirme a senha
                </FieldGroup.Label>
                <FieldGroup.Input
                    type="password"
                    ref={passConfirmRef}
                    blurred
                />
            </FieldGroup.Box>
            <input
                type="hidden"
                name="token"
                value={state.token ?? ''}
                ref={tokenRef}
            />
            <input
                type="hidden"
                name="email"
                value={state.email ?? ''}
                ref={emailRef}
            />
        </FormCardContainer>
    );
};
