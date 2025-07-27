import { CustomForm } from '@/components/atoms/CustomForm';
import { FormLayout } from '@/components/atoms/FormLayout';
import { LoadingIcon } from '@/components/atoms/icons/LoadingIcon';
import { MessageLine } from '@/components/atoms/MessageLine';
import { SubmitRow } from '@/components/atoms/SubmitRow';
import { VerticalSingleBox } from '@/components/atoms/VerticalSingleBox';
import { BrandBtn } from '@/components/molecules/BrandBtn';
import { FormContentBox } from '@/components/molecules/FormContentBox';
import { MessageResult } from '@/components/molecules/MessageResult';
import btnStyles from '@/shared/stylessheets/btn.module.scss';
import { type State } from '@/shared/types/Reducers/Standard/State';
import type { ComponentPropsWithoutRef, FormEventHandler } from 'react';

type FormSimpleContainerProps<T> = ComponentPropsWithoutRef<
    typeof FormLayout
> & {
    state: T;
    submitHandler: FormEventHandler<HTMLFormElement>;
    disabledBtn: boolean;
    submitBtnText: string;
};

export const FormSimpleContainer = <T extends State>({
    state,
    children,
    submitHandler,
    disabledBtn,
    submitBtnText,
    ...remain
}: FormSimpleContainerProps<T>) => (
    <FormLayout {...remain}>
        <FormContentBox>
            <VerticalSingleBox>
                <MessageLine>
                    <MessageResult request={state.requestStatus} />
                </MessageLine>
                <CustomForm onSubmit={submitHandler}>
                    {children}
                    <SubmitRow>
                        <BrandBtn
                            className={btnStyles.submitBtn}
                            disabled={disabledBtn}
                        >
                            <LoadingIcon
                                show={state.requestStatus.statusCode === 0}
                            />
                            <span>{submitBtnText}</span>
                        </BrandBtn>
                    </SubmitRow>
                </CustomForm>
            </VerticalSingleBox>
        </FormContentBox>
    </FormLayout>
);
