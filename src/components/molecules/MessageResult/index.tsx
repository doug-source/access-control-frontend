import { Alert } from '@/components/atoms/Alert';
import { ErrorIcon } from '@/components/atoms/icons/ErrorIcon';
import { SuccessIcon } from '@/components/atoms/icons/SuccessIcon';
import { type RequestStatus } from '@/shared/types/Http/Request';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import classNames from 'classnames';
import styles from './MessageResult.module.scss';

type MessageResultProps = {
    request: RequestStatus;
};

export const MessageResult = ({ request }: MessageResultProps) => {
    switch (request.statusCode) {
        case -1:
        case 0:
        case 401:
        case 403:
            return <Alert></Alert>;
        case 422: {
            if (request.type === 'field') {
                return <Alert></Alert>;
            }
            return (
                <Alert className={classNames(styles.content, styles.error)}>
                    <ErrorIcon show={Boolean(request.message)} />
                    <span>{request.message}</span>
                </Alert>
            );
        }
        case 200: {
            return (
                <Alert className={classNames(styles.content, styles.success)}>
                    <SuccessIcon show={Boolean(request.message)} />
                    <span>{request.message}</span>
                </Alert>
            );
        }
        default:
            assertUnreachable(request);
    }
};
