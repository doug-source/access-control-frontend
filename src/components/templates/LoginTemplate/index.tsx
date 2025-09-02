import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import type { LoginState } from '@/shared/types/States';
import classNames from 'classnames';
import styles from './LoginTemplate.module.scss';
import { AfterContent } from './shared/AfterContent';
import { BeforeContent } from './shared/BeforeContext';
import { ForgotPassLink } from './shared/ForgotPassLink';
import { useDeps } from './shared/useDeps';

interface LoginTemplateProps {
    state: LoginState;
    formAction(payload: FormData): void;
    pending: boolean;
    'data-testid'?: string;
}

export const LoginTemplate = ({
    state: formState,
    formAction,
    pending,
    'data-testid': dataTestId,
}: LoginTemplateProps) => {
    const { providerLink, emailId, passwordId } = useDeps();
    return (
        <FormCardContainer
            data-testid={dataTestId}
            className={classNames(
                styles.gateLayout,
                formState.requestStatus.statusCode === 200 && styles.logged
            )}
            state={formState}
            heading="Autenticação"
            topContent={<GateLinkBox />}
            beforeContent={<BeforeContent providerLink={providerLink} />}
            afterContent={<AfterContent />}
            formAction={formAction}
            submitBtnText="Logar"
            pending={pending}
        >
            <FieldGroup.Box>
                <LabelWarned
                    request={formState.requestStatus}
                    field="email"
                    htmlFor={emailId}
                >
                    E-mail
                </LabelWarned>
                <FieldGroup.Input
                    type="email"
                    name="email"
                    id={emailId}
                    defaultValue={formState.fields.email}
                />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned
                    request={formState.requestStatus}
                    field="password"
                    htmlFor={passwordId}
                >
                    Senha
                </LabelWarned>
                <FieldGroup.Input
                    type="password"
                    name="password"
                    id={passwordId}
                    defaultValue={formState.fields.password}
                    blurred
                />
                <ForgotPassLink />
            </FieldGroup.Box>
        </FormCardContainer>
    );
};
