import { FieldGroup } from '@/components/atoms/FieldGroup';
import { UserIcon } from '@/components/atoms/icons/UserIcon';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormSimpleContainer } from '@/components/organisms/FormSimpleContainer';
import { ProfilePhoto } from '@/components/organisms/ProfilePhoto';
import type { UserConfigState } from '@/shared/types/States';
import styles from './UserConfigTemplate.module.scss';
import { useDeps } from './shared/useDeps';

interface UserConfigTemplateProps {
    state: UserConfigState;
    pending: boolean;
    formAction(payload: FormData): void;
}

export const UserConfigTemplate = ({
    state,
    formAction,
    pending,
}: UserConfigTemplateProps) => {
    const { nameId, phoneId, photo } = useDeps();
    return (
        <FormSimpleContainer
            state={state}
            submitBtnText="Atualizar"
            formAction={formAction}
            pending={pending}
            className={styles.formLayout}
        >
            <FieldGroup.Box>
                <ProfilePhoto
                    url={photo}
                    fallback={<UserIcon className={styles.iconFallback} />}
                />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned
                    request={state.requestStatus}
                    field="name"
                    htmlFor={nameId}
                >
                    Nome
                </LabelWarned>
                <FieldGroup.Input
                    id={nameId}
                    name="name"
                    defaultValue={state.fields.name}
                    onReset={(evt) => evt.preventDefault()}
                />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned
                    request={state.requestStatus}
                    field="phone"
                    htmlFor={phoneId}
                >
                    Telefone
                </LabelWarned>
                <FieldGroup.Input
                    type="tel"
                    id={phoneId}
                    name="phone"
                    defaultValue={state.fields.phone}
                    onReset={(evt) => evt.preventDefault()}
                />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="email">
                    Email
                </LabelWarned>
                <FieldGroup.Input
                    type="email"
                    defaultValue={state.fields.email}
                    disabled
                />
            </FieldGroup.Box>
        </FormSimpleContainer>
    );
};
