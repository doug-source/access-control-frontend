import { UserTemplate } from '@/components/templates/UserTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { useDeps } from './shared/useDeps';

export const User = () => {
    const { state, dispatch, remotionCtx } = useDeps();
    return (
        <DispatchProvider dispatch={dispatch}>
            <UserTemplate state={state} removed={remotionCtx} />
        </DispatchProvider>
    );
};
