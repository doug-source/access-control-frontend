import { ColumnBox } from '@/components/atoms/ColumnBox';
import { StretchedBox } from '@/components/atoms/StretchedBox';
import { EmailInputFilterBlock } from '@/components/organisms/EmailInputFilterBlock';
import { PaginationDispatch } from '@/components/organisms/PaginationDispatch';
import inputFilterStyles from '@/shared/stylessheets/inputFilter.module.scss';
import { type RegisterPermissionsState } from '@/shared/types/Reducers/RegisterPermissions';
import { type ReactNode } from 'react';
import { useDeps } from './shared/useDeps';

type RegisterPermissionsTemplateProps = {
    state: RegisterPermissionsState;
    children: ReactNode;
};

export const RegisterPermissionsTemplate = ({
    state,
    children,
}: RegisterPermissionsTemplateProps) => {
    useDeps(state, '/api/registers/permissions');
    return (
        <>
            <StretchedBox>
                <ColumnBox>
                    <EmailInputFilterBlock
                        className={inputFilterStyles.inputFilterBlock}
                        subject="permissão"
                    />
                    <PaginationDispatch state={state} />
                </ColumnBox>
                <StretchedBox>{children}</StretchedBox>
            </StretchedBox>
        </>
    );
};
