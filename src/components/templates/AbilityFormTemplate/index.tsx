import { FieldGroup } from '@/components/atoms/FieldGroup';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormSimpleContainer } from '@/components/organisms/FormSimpleContainer';
import type { AbilityFormState } from '@/shared/types/States';

interface AbilityFormTemplateProps {
    state: AbilityFormState;
    pending: boolean;
    formAction(payload: FormData): void;
}

export const AbilityFormTemplate = ({
    state,
    formAction,
    pending,
}: AbilityFormTemplateProps) => (
    <FormSimpleContainer
        state={state}
        submitBtnText="Criar"
        pending={pending}
        formAction={formAction}
    >
        <FieldGroup.Box>
            <LabelWarned request={state.requestStatus} field="name">
                Nome
            </LabelWarned>
            <FieldGroup.Input name="name" defaultValue={state.fields.name} />
        </FieldGroup.Box>
    </FormSimpleContainer>
);
