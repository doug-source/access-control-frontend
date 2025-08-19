import { FieldGroup } from '@/components/atoms/FieldGroup';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormSimpleContainer } from '@/components/organisms/FormSimpleContainer';
import { RoleFormState } from '@/shared/types/States';

interface RoleFormTemplateProps {
    state: RoleFormState;
    pending: boolean;
    formAction(payload: FormData): void;
}

export const RoleFormTemplate = ({
    state,
    pending,
    formAction,
}: RoleFormTemplateProps) => (
    <FormSimpleContainer
        state={state}
        submitBtnText="Criar"
        formAction={formAction}
        pending={pending}
    >
        <FieldGroup.Box>
            <LabelWarned request={state.requestStatus} field="name">
                Nome
            </LabelWarned>
            <FieldGroup.Input name="name" defaultValue={state.fields.name} />
        </FieldGroup.Box>
    </FormSimpleContainer>
);
