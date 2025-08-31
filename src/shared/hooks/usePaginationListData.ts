import { useDispatch } from '@/shared/hooks/useDispatch';
import { usePageRequester } from '@/shared/hooks/usePageRequester';
import { useSignState } from '@/shared/hooks/useSignState';
import type {
    PaginationAction,
    PaginationActionModels,
} from '@/shared/types/Reducers/Custom/PaginationAction';
import type { PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import type { PaginationResponse } from '@/shared/types/Response/Pagination';
import type { Paths } from '@/shared/types/Urls/Paths';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachPaginationErrors } from '@/shared/utils/detachErrors/detachPaginationErrors';
import { useEffect, type RefObject } from 'react';

export const usePaginationListData = (
    endpoint: Paths['endpoint']['paginations'],
    {
        page,
        group,
        requestStatus: { statusCode },
        requestType,
    }: PaginationState<PaginationActionModels>,
    ...inputRefs: (
        | RefObject<HTMLInputElement | null>
        | RefObject<{ name: string; value: string }>
    )[]
) => {
    const token = useSignState().user?.token;
    const pageRequester = usePageRequester();
    const dispatch = useDispatch<PaginationAction<PaginationActionModels>>();

    useEffect(() => {
        if (
            typeof token === 'undefined' ||
            statusCode !== 0 ||
            requestType !== 'list'
        ) {
            return;
        }
        const qs: Record<string, string> = Object.fromEntries(
            inputRefs
                .filter((inputRef) => {
                    return inputRef.current && inputRef.current.value.trim();
                })
                .map((inputRef) => inputRef.current)
                .map((input) => [input?.name, input?.value.trim()])
        );

        const queryStringComplete: Record<string, string> = {
            page: page.toString(),
            group: group.toString(),
            ...qs,
        };

        pageRequester
            .paginate(token, endpoint, queryStringComplete)
            .then((result) => {
                const output =
                    result as PaginationResponse<PaginationActionModels>;
                switch (output.statusCode) {
                    case 200: {
                        const {
                            body: { data, total, last_page: lastPage },
                        } = output;
                        dispatch({
                            type: 'pagination-success',
                            payload: { data, total, lastPage },
                        });
                        break;
                    }
                    case 422:
                    case 401:
                    case 403: {
                        const payload = detachPaginationErrors(
                            output,
                            ...inputRefs
                        );
                        if (payload) {
                            dispatch({
                                type: 'error',
                                payload,
                            });
                        }
                        break;
                    }
                    default:
                        assertUnreachable(output);
                }
            });

        return () => {
            pageRequester.abortRequest();
        };
    }, [
        token,
        pageRequester,
        inputRefs,
        page,
        group,
        dispatch,
        statusCode,
        endpoint,
        requestType,
    ]);
};
