import { InfoStack } from '@/components/atoms/InfoStack';
import { SpinnerCovering } from '@/components/molecules/SpinnerCovering';
import { AbilityInfoStackContent } from '@/components/organisms/AbilityInfoStackContent';
import boxStyles from '@/shared/stylessheets/box.module.scss';
import { type AbilityState } from '@/shared/types/Reducers/Ability';
import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { useDeps } from './shared/useDeps';

type AbilityTemplateProps = ComponentPropsWithoutRef<typeof InfoStack.Box> & {
    state: AbilityState;
};

export const AbilityTemplate = ({
    state,
    className,
    ...remain
}: AbilityTemplateProps) => {
    useDeps();
    if (!state.ability || state.requestStatus.statusCode === 0) {
        return <SpinnerCovering show />;
    }
    return (
        <InfoStack.Box
            {...remain}
            className={classNames(boxStyles.infoBox, className)}
        >
            <AbilityInfoStackContent ability={state.ability} />
        </InfoStack.Box>
    );
};
