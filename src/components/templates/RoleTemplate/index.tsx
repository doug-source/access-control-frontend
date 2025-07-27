import { InfoStack } from '@/components/atoms/InfoStack';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { RoleInfoStackContent } from '@/components/organisms/RoleInfoStackContent';
import boxStyles from '@/shared/stylessheets/box.module.scss';
import { RoleState } from '@/shared/types/Reducers/Role';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import { useDeps } from './shared/useDeps';

type RoleTemplateProps = ComponentPropsWithoutRef<typeof InfoStack.Box> & {
    state: RoleState;
};

export const RoleTemplate = ({
    state,
    className,
    ...remain
}: RoleTemplateProps) => {
    useDeps();
    if (!state.role || state.requestStatus.statusCode === 0) {
        return <SpinnerCovering show />;
    }
    return (
        <InfoStack.Box
            {...remain}
            className={classNames(boxStyles.infoBox, className)}
        >
            <RoleInfoStackContent roleInstance={state.role} />
        </InfoStack.Box>
    );
};
