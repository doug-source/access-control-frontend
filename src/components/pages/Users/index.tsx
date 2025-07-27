import { UsersTemplate } from '@/components/templates/UsersTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { useDeps } from './shared/useDeps';

export const Users = () => {
    const { state, dispatch, inputRef } = useDeps();
    return (
        <PageRequesterProvider>
            <InputRefProvider inputRef={inputRef}>
                <DispatchProvider dispatch={dispatch}>
                    <UsersTemplate state={state} />
                </DispatchProvider>
            </InputRefProvider>
        </PageRequesterProvider>
    );
};
