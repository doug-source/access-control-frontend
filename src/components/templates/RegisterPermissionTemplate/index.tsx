import { InfoStack } from '@/components/atoms/InfoStack';
import { RegisterPermissionInfoStackContent } from '@/components/organisms/RegisterPermissionInfoStackContent';
import boxStyles from '@/shared/stylessheets/box.module.scss';
import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

type RegisterPermissionTemplateProps = ComponentPropsWithoutRef<
    typeof InfoStack.Box
>;

export const RegisterPermissionTemplate = ({
    className,
    ...remain
}: RegisterPermissionTemplateProps) => (
    <InfoStack.Box
        {...remain}
        className={classNames(boxStyles.infoBox, className)}
    >
        <RegisterPermissionInfoStackContent />
    </InfoStack.Box>
);
