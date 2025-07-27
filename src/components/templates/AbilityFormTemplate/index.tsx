import { FieldGroup } from '@/components/atoms/FieldGroup';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormSimpleContainer } from '@/components/organisms/FormSimpleContainer';
import { btnIsDisabled } from '@/shared/utils/btnIsDisabled';
import { type ComponentPropsWithoutRef } from 'react';
import { useAbilityFormSubmit } from './shared/useAbilityFormSubmit';

type FormSimpleContainerProps = ComponentPropsWithoutRef<
    typeof FormSimpleContainer
>;

interface AbilityFormTemplateProps {
    state: FormSimpleContainerProps['state'];
}

export const AbilityFormTemplate = ({ state }: AbilityFormTemplateProps) => {
    const [nameRef, submitHandler] = useAbilityFormSubmit();
    return (
        <FormSimpleContainer
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
