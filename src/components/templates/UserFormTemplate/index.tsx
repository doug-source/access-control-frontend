import { FieldGroup } from '@/components/atoms/FieldGroup';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormSimpleContainer } from '@/components/organisms/FormSimpleContainer';
import type { UserFormState } from '@/shared/types/States';

interface UserFormTemplateProps {
    state: UserFormState;
    pending: boolean;
    formAction(payload: FormData): void;
}

export const UserFormTemplate = ({
    state,
    pending,
    formAction,
}: UserFormTemplateProps) => (
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
        <FieldGroup.Box>
            <LabelWarned request={state.requestStatus} field="email">
                E-mail
            </LabelWarned>
            <FieldGroup.Input
                type="email"
                name="email"
                defaultValue={state.fields.email}
            />
        </FieldGroup.Box>
        <FieldGroup.Box>
            <LabelWarned request={state.requestStatus} field="password">
                Senha
            </LabelWarned>
            <FieldGroup.Input
                type="password"
                name="password"
                defaultValue={state.fields.password}
                blurred
            />
        </FieldGroup.Box>
    </FormSimpleContainer>
);
