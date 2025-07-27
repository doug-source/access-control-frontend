import { LoadingIcon } from '@/components/atoms/icons/LoadingIcon';
import { BrandBtn } from '@/components/molecules/BrandBtn';
import btnStyles from '@/shared/stylessheets/btn.module.scss';
import { WithShow } from '@/shared/types/Utils';
import { ReactNode, type FormEventHandler } from 'react';
import styles from './VerifyEmailActivationForm.module.scss';

interface VerifyEmailActivationFormProps {
    submitHandler: FormEventHandler<HTMLFormElement>;
    loading: boolean;
    disabledBtn: boolean;
    children?: ReactNode;
}

export const VerifyEmailActivationForm = ({
    show,
    submitHandler,
    loading,
    disabledBtn,
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
                onSubmit={submitHandler}
                name="verify-email-activation-form"
            >
                <BrandBtn
                    className={btnStyles.submitBtn}
                    disabled={disabledBtn}
                >
                    <LoadingIcon show={loading} />
                    <span>Re-enviar a ativação</span>
                </BrandBtn>
            </form>
        </>
    );
};
