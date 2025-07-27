import { Anchor } from '@/components/atoms/Anchor';
import { CommonRow } from '@/components/atoms/CommonRow';
import { FieldGroup } from '@/components/atoms/FieldGroup';
import { GoogleIcon } from '@/components/atoms/icons/GoogleIcon';
import { BottomSection } from '@/components/molecules/BottomSection';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { SocialLoginLink } from '@/components/molecules/SocialLoginLink';
import { FormCardContainer } from '@/components/organisms/FormCardContainer';
import { type State } from '@/shared/types/Reducers/Standard/State';
import { btnIsDisabled } from '@/shared/utils/btnIsDisabled';
import classNames from 'classnames';
import styles from './LoginTemplate.module.scss';
import { useDeps } from './shared/useDeps';

interface LoginTemplateProps {
    state: State;
    'data-testid'?: string;
}

export const LoginTemplate = ({
    state,
    'data-testid': dataTestId,
}: LoginTemplateProps) => {
    const {
        provided,
        emailRef,
        passwordRef,
        handler: submitHandler,
    } = useDeps();

    if (provided) {
        return null;
    }
    return (
        <FormCardContainer
            data-testid={dataTestId}
            className={classNames(
                styles.gateLayout,
                state.requestStatus.statusCode === 200 && styles.logged
            )}
            state={state}
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
            submitHandler={submitHandler}
            submitBtnText="Logar"
            disabledBtn={btnIsDisabled(state.requestStatus, 0, 200)}
        >
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="email">
                    E-mail
                </LabelWarned>
                <FieldGroup.Input type="email" ref={emailRef} />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="password">
                    Senha
                </LabelWarned>
                <FieldGroup.Input type="password" blurred ref={passwordRef} />
                <Anchor to="/forgot" className={styles.forgotPass}>
                    Esqueceu ?
                </Anchor>
            </FieldGroup.Box>
        </FormCardContainer>
    );
};
