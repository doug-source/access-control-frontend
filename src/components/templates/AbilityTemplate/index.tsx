import { InfoStack } from '@/components/atoms/InfoStack';
import { AbilityInfoStackContent } from '@/components/organisms/AbilityInfoStackContent';
import boxStyles from '@/shared/stylessheets/box.module.scss';
import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

type AbilityTemplateProps = ComponentPropsWithoutRef<typeof InfoStack.Box>;

export const AbilityTemplate = ({
    className,
    ...remain
}: AbilityTemplateProps) => (
    <InfoStack.Box
        {...remain}
        className={classNames(boxStyles.infoBox, className)}
    >
        <AbilityInfoStackContent />
    </InfoStack.Box>
);
