import { InfoStack } from '@/components/atoms/InfoStack';
import { RoleInfoStackContent } from '@/components/organisms/RoleInfoStackContent';
import boxStyles from '@/shared/stylessheets/box.module.scss';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';

type RoleTemplateProps = ComponentPropsWithRef<typeof InfoStack.Box>;

export const RoleTemplate = ({ className, ...remain }: RoleTemplateProps) => (
    <InfoStack.Box
        {...remain}
        className={classNames(boxStyles.infoBox, className)}
    >
        <RoleInfoStackContent />
    </InfoStack.Box>
);
