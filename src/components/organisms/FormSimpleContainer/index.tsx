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
import { type State } from '@/shared/types/States';
import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';

type FormSimpleContainerProps<T> = ComponentPropsWithoutRef<
    typeof FormLayout
> & {
    state: T;
    pending: boolean;
    formAction: ComponentPropsWithRef<'form'>['action'];
    submitBtnText: string;
};

export const FormSimpleContainer = <T extends State>({
    state,
    children,
    submitBtnText,
    formAction,
    pending,
    ...remain
}: FormSimpleContainerProps<T>) => (
    <FormLayout {...remain}>
        <FormContentBox>
            <VerticalSingleBox>
                <MessageLine>
                    <MessageResult request={state.requestStatus} />
                </MessageLine>
                <CustomForm action={formAction}>
                    {children}
                    <SubmitRow>
                        <BrandBtn
                            className={btnStyles.submitBtn}
                            disabled={pending}
                        >
                            <LoadingIcon show={pending} />
                            <span>{submitBtnText}</span>
                        </BrandBtn>
                    </SubmitRow>
                </CustomForm>
            </VerticalSingleBox>
        </FormContentBox>
    </FormLayout>
);
