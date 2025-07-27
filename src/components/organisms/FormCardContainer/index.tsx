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
import {
    type ComponentPropsWithoutRef,
    type FormEventHandler,
    type ReactNode,
} from 'react';

type FormCardContainerProps<T> = ComponentPropsWithoutRef<typeof FormLayout> & {
    state: T;
    heading: string;
    topContent?: ReactNode;
    beforeContent?: ReactNode;
    afterContent?: ReactNode;
    disabledBtn: boolean;
    submitHandler: FormEventHandler<HTMLFormElement>;
    submitBtnText: string;
};

export const FormCardContainer = <T extends State>({
    state,
    heading,
    topContent,
    beforeContent,
    afterContent,
    disabledBtn,
    submitHandler,
    submitBtnText,
    children,
    ...remain
}: FormCardContainerProps<T>) => (
    <FormLayout {...remain}>
        {topContent}
        <FormContentBox>
            <VerticalCardBox>
                <FormHeading>{heading}</FormHeading>
                {beforeContent}
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
                {afterContent}
            </VerticalCardBox>
        </FormContentBox>
    </FormLayout>
);
