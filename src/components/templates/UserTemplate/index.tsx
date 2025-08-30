import { InfoStack } from '@/components/atoms/InfoStack';
import { UserInfoStackContent } from '@/components/organisms/UserInfoStackContent';
import boxStyles from '@/shared/stylessheets/box.module.scss';
import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

type UserTemplateProps = ComponentPropsWithoutRef<typeof InfoStack.Box> & {
    removed: boolean;
};

export const UserTemplate = ({
    removed,
    className,
    ...remain
}: UserTemplateProps) => (
    <InfoStack.Box
        {...remain}
        className={classNames(boxStyles.infoBox, className)}
    >
        <UserInfoStackContent removed={removed} />
    </InfoStack.Box>
);
