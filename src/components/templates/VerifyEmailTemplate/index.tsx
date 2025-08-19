import { FormHeading } from '@/components/atoms/FormHeading';
import { FormLayout } from '@/components/atoms/FormLayout';
import { MessageLine } from '@/components/atoms/MessageLine';
import { VerticalCardBox } from '@/components/atoms/VerticalCardBox';
import { FormContentBox } from '@/components/molecules/FormContentBox';
import { GateLinkBox } from '@/components/molecules/GateLinkBox';
import { MessageResult } from '@/components/molecules/MessageResult';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { VerifyEmailActivationForm } from '@/components/organisms/VerifyEmailActivationForm';
import type { VerifyEmailState } from '@/shared/types/States';
import styles from './VerifyEmailTemplate.module.scss';

type VerifyEmailTemplateProps = {
    state: VerifyEmailState;
    pending: boolean;
    formAction(payload: FormData): void;
};

export const VerifyEmailTemplate = ({
    state,
    formAction,
    pending,
}: VerifyEmailTemplateProps) => {
    if (state.requestStatus.statusCode === 0) {
        return <SpinnerCovering show />;
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
                        show={!state.resend || pending}
                        formAction={formAction}
                        pending={pending}
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
