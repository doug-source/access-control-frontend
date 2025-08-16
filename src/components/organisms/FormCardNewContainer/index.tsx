import { CustomForm } from '@/components/atoms/CustomForm';
import { FormHeading } from '@/components/atoms/FormHeading';
import { FormLayout } from '@/components/atoms/FormLayout';
import { LoadingIcon } from '@/components/atoms/icons/LoadingIcon';
import { MessageLine } from '@/components/atoms/MessageLine';
import { SubmitRow } from '@/components/atoms/SubmitRow';
import { VerticalCardBox } from '@/components/atoms/VerticalCardBox';
import { BrandBtn } from '@/components/molecules/BrandBtn';
import { FormContentBox } from '@/components/molecules/FormContentBox';
import { MessageResult } from '@/components/molecules/MessageResult';
import btnStyles from '@/shared/stylessheets/btn.module.scss';
import { type State } from '@/shared/types/Reducers/Standard/State';
import type { ComponentPropsWithRef, ReactNode } from 'react';

interface FormCardContainerProps<T>
    extends ComponentPropsWithRef<typeof FormLayout> {
    state: T;
    heading: string;
    topContent?: ReactNode;
    beforeContent?: ReactNode;
    afterContent?: ReactNode;
    pending: boolean;
    formAction: ComponentPropsWithRef<'form'>['action'];
    submitBtnText: string;
}

export const FormCardNewContainer = <T extends State>({
    state,
    heading,
    topContent,
    beforeContent,
    afterContent,
    pending,
    formAction,
    submitBtnText,
    children,
    ...remain
}: FormCardContainerProps<T>) => {
    return (
        <FormLayout {...remain}>
            {topContent}
            <FormContentBox>
                <VerticalCardBox>
                    <FormHeading>{heading}</FormHeading>
                    {beforeContent}
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
                    {afterContent}
                </VerticalCardBox>
            </FormContentBox>
        </FormLayout>
    );
};
