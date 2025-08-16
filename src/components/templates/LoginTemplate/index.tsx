import { Anchor } from '@/components/atoms/Anchor';
import { CommonRow } from '@/components/atoms/CommonRow';
import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GoogleIcon } from '@/components/atoms/icons/GoogleIcon';
import { BottomSection } from '@/components/molecules/BottomSection';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { SocialLoginLink } from '@/components/molecules/SocialLoginLink';
import { FormCardNewContainer } from '@/components/organisms/FormCardNewContainer';
import { type State } from '@/shared/types/Reducers/Standard/State';
import classNames from 'classnames';
import styles from './LoginTemplate.module.scss';

interface LoginTemplateProps {
    state: State;
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
    return (
        <FormCardNewContainer
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
                    <SocialLoginLink
                        href={`http://localhost:8000/auth/google/redirect/login`}
                        type="primary"
                    >
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
                <FieldGroup.Input type="email" name="email" />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned request={formState.requestStatus} field="password">
                    Senha
                </LabelWarned>
                <FieldGroup.Input type="password" name="password" blurred />
                <Anchor to="/forgot" className={styles.forgotPass}>
                    Esqueceu ?
                </Anchor>
            </FieldGroup.Box>
        </FormCardNewContainer>
    );
};
