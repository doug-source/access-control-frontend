import { LoadingIcon } from '@/components/atoms/icons/LoadingIcon';
import { BrandBtn } from '@/components/molecules/BrandBtn';
import btnStyles from '@/shared/stylessheets/btn.module.scss';
import type { WithShow } from '@/shared/types/Utils';
import type { PropsWithChildren } from 'react';
import styles from './VerifyEmailActivationForm.module.scss';

interface VerifyEmailActivationFormProps extends PropsWithChildren {
    formAction(payload: FormData): void;
    pending: boolean;
}

export const VerifyEmailActivationForm = ({
    show,
    formAction,
    pending,
    children,
}: WithShow<VerifyEmailActivationFormProps, true>) => {
    if (!show) {
        return null;
    }
    return (
        <>
            {children}
            <form
                className={styles.submitForm}
                action={formAction}
                name="verify-email-activation-form"
            >
                <BrandBtn className={btnStyles.submitBtn} disabled={pending}>
                    <LoadingIcon show={pending} />
                    <span>Re-enviar a ativação</span>
                </BrandBtn>
            </form>
        </>
    );
};
