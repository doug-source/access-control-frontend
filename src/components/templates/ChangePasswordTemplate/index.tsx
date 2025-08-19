import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import { type ResetPasswordState } from '@/shared/types/States';
import styles from './ChangePasswordTemplate.module.scss';
import { resetPassBtnIsDisabled } from './shared/resetPassBtnIsDisabled';

interface ChangePasswordTemplateProps {
    state: ResetPasswordState;
    formAction(payload: FormData): void;
    pending: boolean;
}

export const ChangePasswordTemplate = ({
    state,
    formAction,
    pending,
}: ChangePasswordTemplateProps) => {
    return (
        <FormCardContainer
            state={state}
            heading="Alterar senha"
            topContent={<GateLinkBox />}
            formAction={formAction}
            pending={resetPassBtnIsDisabled(state, pending)}
            submitBtnText="Alterar"
        >
            <FieldGroup.Box>
                <LabelWarned
                    request={state.requestStatus}
                    field="password"
                    className={styles.labelBox}
                >
                    Nova senha
                </LabelWarned>
                <FieldGroup.Input
                    type="password"
                    name="password"
                    defaultValue={state.fields.password}
                    blurred
                />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <FieldGroup.Label className={styles.label}>
                    Confirme a senha
                </FieldGroup.Label>
                <FieldGroup.Input
                    type="password"
                    name="passConfirm"
                    defaultValue={state.fields.passConfirm}
                    blurred
                />
            </FieldGroup.Box>
            <input type="hidden" name="token" value={state.token ?? ''} />
            <input type="hidden" name="email" value={state.email ?? ''} />
        </FormCardContainer>
    );
};
