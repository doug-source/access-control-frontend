import { FormHeading } from '@/components/atoms/FormHeading';
import { FormLayout } from '@/components/atoms/FormLayout';
import { MessageLine } from '@/components/atoms/MessageLine';
import { VerticalCardBox } from '@/components/atoms/VerticalCardBox';
import { FormContentBox } from '@/components/molecules/FormContentBox';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { MessageResult } from '@/components/molecules/MessageResult';
import { VerifyEmailActivationForm } from '@/components/organisms/VerifyEmailActivationForm';
import { LocalNavigate } from '@/shared/components/atoms/LocalNavigate';
import { type State } from '@/shared/types/Reducers/Standard/State';
import { btnIsDisabled } from '@/shared/utils/btnIsDisabled';
import { intoRequestStatus } from '@/shared/utils/intoRequestStatus';
import styles from './VerifyEmailTemplate.module.scss';
import { isVerifyEmailRequesting } from './shared/isVerifyEmailRequesting';
import { useDeps } from './shared/useDeps';

type VerifyEmailTemplateProps = {
    state: State;
};

export const VerifyEmailTemplate = ({ state }: VerifyEmailTemplateProps) => {
    const { verified, auth, emailRedirect, handler: submitHandler } = useDeps();
    if (verified || auth?.user?.emailVerified) {
        return <LocalNavigate to="/home" replace />;
    }
    if (isVerifyEmailRequesting(state.requestStatus, emailRedirect)) {
        return null;
    }
    return (
        <FormLayout>
            <GateLinkBox />
            <FormContentBox className={styles.formContextBox}>
                <VerticalCardBox>
                    <FormHeading>Verifique seu email</FormHeading>
                    <MessageLine>
                        <MessageResult request={state.requestStatus} />
                    </MessageLine>
                    <p className={styles.paragraph}>
                        Antes de continuar, é preciso verificar seu e-mail, pois
                        enviamos um link de ativação. Antes de utilizá-lo, feche
                        esta aba do navegador.
                    </p>
                    <VerifyEmailActivationForm
                        show={intoRequestStatus(state.requestStatus, -1, 0)}
                        submitHandler={submitHandler}
                        disabledBtn={btnIsDisabled(state.requestStatus, 0)}
                        loading={intoRequestStatus(state.requestStatus, 0)}
                    >
                        <p className={styles.paragraph}>
                            Caso você não tenha recebido o email ou ele tenha
                            expirado, clique no botão abaixo:
                        </p>
                    </VerifyEmailActivationForm>
                </VerticalCardBox>
            </FormContentBox>
        </FormLayout>
    );
};
