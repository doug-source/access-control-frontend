import { SignStateContext } from '@/shared/contexts/SignStateContext';
import { signReducer } from '@/shared/reducers/signReducer';
import {
    type ComponentPropsWithRef,
    type PropsWithChildren,
    useMemo,
    useReducer,
} from 'react';

type DataObj = ComponentPropsWithRef<typeof SignStateContext>['value'];

export const SignProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(signReducer, {
        user: null,
        confirmations: {
            remotions: {
                user: true,
                registerRequest: true,
                role: true,
                ability: true,
            },
            restorations: { user: true },
            approvements: { registerRequest: true },
            attachment: { role: true, ability: true },
            detachment: { role: true, ability: true },
        },
    });
    const obj: DataObj = useMemo(
        () => ({
            state,
            dispatch,
        }),
        [state, dispatch]
    );
    return <SignStateContext value={obj}>{children}</SignStateContext>;
};
