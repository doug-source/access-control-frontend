import { InfoStack } from '@/components/atoms/InfoStack';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { RegisterRequestInfoStackContent } from '@/components/organisms/RegisterRequestInfoStackContent';
import boxStyles from '@/shared/stylessheets/box.module.scss';
import { RegisterRequestState } from '@/shared/types/Reducers/RegisterRequest';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import { useDeps } from './shared/useDeps';

type RegisterRequestTemplateProps = ComponentPropsWithoutRef<
    typeof InfoStack.Box
> & {
    state: RegisterRequestState;
};

export const RegisterRequestTemplate = ({
    state,
    className,
    ...remain
}: RegisterRequestTemplateProps) => {
    useDeps();
    if (!state.registerRequest || state.requestStatus.statusCode === 0) {
        return <SpinnerCovering show />;
    }
    return (
        <InfoStack.Box
            {...remain}
            className={classNames(boxStyles.infoBox, className)}
        >
            <RegisterRequestInfoStackContent
                registerRequest={state.registerRequest}
            />
        </InfoStack.Box>
    );
};
