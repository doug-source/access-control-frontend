import { Anchor } from '@/components/atoms/Anchor';
import { CommonRow } from '@/components/atoms/CommonRow';
import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GoogleIcon } from '@/components/atoms/icons/GoogleIcon';
import { BottomSection } from '@/components/molecules/BottomSection';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { SocialLoginLink } from '@/components/molecules/SocialLoginLink';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import type { LoginState } from '@/shared/types/States';
import classNames from 'classnames';
import styles from './LoginTemplate.module.scss';
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
    const [providerLink] = useDeps();
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
            beforeContent={
                <CommonRow>
                    <SocialLoginLink href={providerLink} type="primary">
                        <GoogleIcon />
                    </SocialLoginLink>
                </CommonRow>
            }
            afterContent={
                <BottomSection label="Não possui uma conta?">
                    <Anchor to="/request">Solicitação</Anchor>
                </BottomSection>
            }
            formAction={formAction}
            submitBtnText="Logar"
            pending={pending}
        >
            <FieldGroup.Box>
                <LabelWarned request={formState.requestStatus} field="email">
                    E-mail
                </LabelWarned>
                <FieldGroup.Input
                    type="email"
                    name="email"
                    defaultValue={formState.fields.email}
                />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned request={formState.requestStatus} field="password">
                    Senha
                </LabelWarned>
                <FieldGroup.Input
                    type="password"
                    name="password"
                    defaultValue={formState.fields.password}
                    blurred
                />
                <Anchor to="/forgot" className={styles.forgotPass}>
                    Esqueceu ?
                </Anchor>
            </FieldGroup.Box>
        </FormCardContainer>
    );
};
