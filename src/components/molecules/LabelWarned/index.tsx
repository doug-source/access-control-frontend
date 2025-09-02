import { Alert } from '@/components/atoms/Alert';
import { FieldGroup } from '@/components/atoms/FieldGroup';
import type { RequestStatus } from '@/shared/types/Http/Request';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './LabelWarned.module.scss';
import { renderNotice } from './shared/renderNotice';

type LabelWarnedProps = ComponentPropsWithRef<'div'> & {
    request: RequestStatus;
    field: string;
    htmlFor?: string;
};

export const LabelWarned = ({
    request,
    field,
    className,
    children,
    htmlFor,
    ...remain
}: LabelWarnedProps) => {
    const notice = renderNotice(request, field);
    return (
        <div {...remain} className={classNames(styles.box, className)}>
            <FieldGroup.Label htmlFor={htmlFor}>{children}</FieldGroup.Label>
            {notice.show && (
                <Alert className={styles.warningContent}>
                    <span>{notice?.msg}</span>
                </Alert>
            )}
        </div>
    );
};
