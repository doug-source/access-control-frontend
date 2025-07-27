import { FieldGroup } from '@/components/atoms/FieldGroup';
import { UserIcon } from '@/components/atoms/icons/UserIcon';
import { LabelWarned } from '@/components/molecules/LabelWarned';
import { FormSimpleContainer } from '@/components/organisms/FormSimpleContainer';
import { UserConfigState } from '@/shared/types/Reducers/UserConfig';
import { btnIsDisabled } from '@/shared/utils/btnIsDisabled';
import type { ComponentPropsWithoutRef } from 'react';
import { ProfilePhoto } from '../../organisms/ProfilePhoto';
import { useDeps } from './shared/useDeps';
import styles from './UserConfigTemplate.module.scss';

interface UserConfigTemplateProps
    extends Omit<
        ComponentPropsWithoutRef<typeof FormSimpleContainer>,
        'submitHandler' | 'disabledBtn' | 'submitBtnText' | 'state'
    > {
    state: UserConfigState;
}

export const UserConfigTemplate = ({
    state,
    ...remain
}: UserConfigTemplateProps) => {
    const {
        photoRef,
        nameRef,
        emailRef,
        phoneRef,
        ids,
        handler: submitHandler,
    } = useDeps();
    return (
        <FormSimpleContainer
            {...remain}
            state={state}
            submitHandler={submitHandler}
            submitBtnText="Atualizar"
            disabledBtn={btnIsDisabled(state.requestStatus, 0)}
            className={styles.formLayout}
        >
            <FieldGroup.Box>
                <ProfilePhoto
                    fallback={<UserIcon className={styles.iconFallback} />}
                    ref={photoRef}
                    url={state.photoRemote}
                />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned
                    request={state.requestStatus}
                    field="name"
                    htmlFor={ids.name}
                >
                    Nome
                </LabelWarned>
                <FieldGroup.Input ref={nameRef} id={ids.name} />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned
                    request={state.requestStatus}
                    field="phone"
                    htmlFor={ids.phone}
                >
                    Telefone
                </LabelWarned>
                <FieldGroup.Input type="tel" ref={phoneRef} id={ids.phone} />
            </FieldGroup.Box>
            <FieldGroup.Box>
                <LabelWarned request={state.requestStatus} field="email">
                    Email
                </LabelWarned>
                <FieldGroup.Input type="email" ref={emailRef} disabled />
            </FieldGroup.Box>
        </FormSimpleContainer>
    );
};
