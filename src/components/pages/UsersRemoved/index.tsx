import { UsersRemovedTemplate } from '@/components/templates/UsersRemovedTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { PageRequesterWithRestoreProvider } from '@/shared/providers/PageRequesterWithRestoreProvider';
import { useDeps } from './shared/useDeps';

export const UsersRemoved = () => {
    const { state, dispatch, inputRef } = useDeps();
    return (
        <PageRequesterWithRestoreProvider>
            <InputRefProvider inputRef={inputRef}>
                <DispatchProvider dispatch={dispatch}>
                    <UsersRemovedTemplate state={state} />
                </DispatchProvider>
            </InputRefProvider>
        </PageRequesterWithRestoreProvider>
    );
};
