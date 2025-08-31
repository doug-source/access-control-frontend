import { SignDispatchContext } from '@/shared/contexts/SignDispatchContext';
import { SignStateContext } from '@/shared/contexts/SignStateContext';
import { signReducer } from '@/shared/reducers/signReducer';
import { type PropsWithChildren, useReducer } from 'react';

export const SignProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(signReducer, { user: null });
    return (
        <SignDispatchContext.Provider value={dispatch}>
            <SignStateContext.Provider value={state}>
                {children}
            </SignStateContext.Provider>
        </SignDispatchContext.Provider>
    );
};
