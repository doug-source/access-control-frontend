import { InfoStack } from '@/components/atoms/InfoStack';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { UserInfoStackContent } from '@/components/organisms/UserInfoStackContent';
import boxStyles from '@/shared/stylessheets/box.module.scss';
import { UserState } from '@/shared/types/Reducers/User';
import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { useDeps } from './shared/useDeps';

type UserTemplateProps = ComponentPropsWithoutRef<typeof InfoStack.Box> & {
    state: UserState;
    removed: boolean;
};

export const UserTemplate = ({
    state,
    removed,
    className,
    ...remain
}: UserTemplateProps) => {
    useDeps(removed);
    if (!state.user || state.requestStatus.statusCode === 0) {
        return <SpinnerCovering show />;
    }
    return (
        <InfoStack.Box
            {...remain}
            className={classNames(boxStyles.infoBox, className)}
        >
            <UserInfoStackContent user={state.user} />
        </InfoStack.Box>
    );
};
