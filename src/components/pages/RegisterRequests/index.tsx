import { ListWrapper } from '@/components/organisms/ListWrapper';
import { RegisterRequestItems } from '@/components/organisms/RegisterRequestItems';
import { RegisterRequestsTemplate } from '@/components/templates/RegisterRequestsTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { PageRequesterWithApproveProvider } from '@/shared/providers/PageRequesterWithApproveProvider';
import { useDeps } from './shared/useDeps';

export const RegisterRequests = () => {
    const { state, dispatch, inputRef } = useDeps();
    return (
        <PageRequesterWithApproveProvider>
            <InputRefProvider inputRef={inputRef}>
                <DispatchProvider dispatch={dispatch}>
                    <RegisterRequestsTemplate state={state}>
                        <ListWrapper requestType={state.requestType}>
                            <RegisterRequestItems items={state.data} />
                        </ListWrapper>
                    </RegisterRequestsTemplate>
                </DispatchProvider>
            </InputRefProvider>
        </PageRequesterWithApproveProvider>
    );
};
