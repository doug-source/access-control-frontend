import { FieldGroup } from '@/components/atoms/FieldGroup';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormSimpleContainer } from '@/components/organisms/FormSimpleContainer';
import { btnIsDisabled } from '@/shared/utils/btnIsDisabled';
import { type ComponentPropsWithoutRef } from 'react';
import { useUserFormSubmit } from './shared/useUserFormSubmit';

type UserFormTemplateProps = Omit<
    ComponentPropsWithoutRef<typeof FormSimpleContainer>,
    'submitHandler' | 'disabledBtn' | 'submitBtnText'
>;

export const UserFormTemplate = ({
    state,
    ...remain
}: UserFormTemplateProps) => {
    const {
        nameRef,
        emailRef,
        passwordRef,
        handler: submitHandler,
    } = useUserFormSubmit();
    return (
        <FormSimpleContainer
            {...remain}
            state={state}
            submitHandler={submitHandler}
            submitBtnText="Criar"
            disabledBtn={btnIsDisabled(state.requestStatus, 0, 200)}
        >
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="name">
                    Nome
                </LabelWarned>
                <FieldGroup.Input ref={nameRef} />
            </FieldGroup.Box>
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
                <FieldGroup.Input type="password" ref={passwordRef} blurred />
            </FieldGroup.Box>
        </FormSimpleContainer>
    );
};
