import { useAuth } from '@/shared/hooks/useAuth';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { useViewer } from '@/shared/hooks/useViewer';
import { type Viewer } from '@/shared/types/Contracts/Viewer';
import {
    type SingleDataAction,
    type SingleDataActionModels,
} from '@/shared/types/Reducers/SingleData';
import { type SingleDataViewedResponse } from '@/shared/types/Response/SingleDataViewed';
import { type Paths } from '@/shared/types/Urls/Paths';
import { detachSingleDataViewedErrors } from '@/shared/utils/detachErrors/detachSingleDataViewedErrors';
import { useEffect } from 'react';

export const useSingleDataFetch = (endpoint: Paths['endpoint']['viewers']) => {
    const viewer = useViewer();
    const dispatch = useDispatch<SingleDataAction<SingleDataActionModels>>();
    const token = useAuth()?.user?.token;
    useEffect(() => {
        if (!token) {
            return;
        }
        dispatch({ type: 'loading' });
        (async (token: string, viewer: Viewer, dispatchFn: typeof dispatch) => {
            const output = (await viewer.show(
                endpoint,
                token
            )) as SingleDataViewedResponse<SingleDataActionModels>;
            switch (output.statusCode) {
                case 200: {
                    dispatchFn({ type: 'success', payload: output.body });
                    break;
                }
                case 422:
                case 401:
                case 403: {
                    const payload = detachSingleDataViewedErrors(output);
                    dispatchFn({ type: 'error', payload });
                    break;
                }
                default:
                    break;
            }
        })(token, viewer, dispatch);

        return () => {
            viewer.abortRequest();
        };
    }, [token, viewer, dispatch, endpoint]);
};
