import { InfoStack } from '@/components/atoms/InfoStack';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { RegisterPermissionInfoStackContent } from '@/components/organisms/RegisterPermissionInfoStackContent';
import boxStyles from '@/shared/stylessheets/box.module.scss';
import { type RegisterPermissionState } from '@/shared/types/Reducers/RegisterPermission';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import { useDeps } from './shared/useDeps';

type RegisterPermissionTemplateProps = ComponentPropsWithoutRef<
    typeof InfoStack.Box
> & {
    state: RegisterPermissionState;
};

export const RegisterPermissionTemplate = ({
    state,
    className,
    ...remain
}: RegisterPermissionTemplateProps) => {
    useDeps();
    if (!state.registerPermission || state.requestStatus.statusCode === 0) {
        return <SpinnerCovering show />;
    }
    return (
        <InfoStack.Box
            {...remain}
            className={classNames(boxStyles.infoBox, className)}
        >
            <RegisterPermissionInfoStackContent
                registerPermission={state.registerPermission}
            />
        </InfoStack.Box>
    );
};
