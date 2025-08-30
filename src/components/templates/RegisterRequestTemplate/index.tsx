import { InfoStack } from '@/components/atoms/InfoStack';
import { RegisterRequestInfoStackContent } from '@/components/organisms/RegisterRequestInfoStackContent';
import boxStyles from '@/shared/stylessheets/box.module.scss';
import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

type RegisterRequestTemplateProps = ComponentPropsWithoutRef<
    typeof InfoStack.Box
>;

export const RegisterRequestTemplate = ({
    className,
    ...remain
}: RegisterRequestTemplateProps) => (
    <InfoStack.Box
        {...remain}
        className={classNames(boxStyles.infoBox, className)}
    >
        <RegisterRequestInfoStackContent />
    </InfoStack.Box>
);
