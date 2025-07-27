import { FieldGroup } from '@/components/atoms/FieldGroup';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormSimpleContainer } from '@/components/organisms/FormSimpleContainer';
import { btnIsDisabled } from '@/shared/utils/btnIsDisabled';
import { type ComponentPropsWithoutRef } from 'react';
import { useRoleFormSubmit } from './shared/useRoleFormSubmit';

type RoleFormTemplateProps = Omit<
    ComponentPropsWithoutRef<typeof FormSimpleContainer>,
    'submitHandler' | 'submitBtnText' | 'disabledBtn'
>;

export const RoleFormTemplate = ({
    state,
    ...remain
}: RoleFormTemplateProps) => {
    const [nameRef, submitHandler] = useRoleFormSubmit();
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
        </FormSimpleContainer>
    );
};
