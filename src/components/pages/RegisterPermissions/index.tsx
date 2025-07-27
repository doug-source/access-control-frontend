import { ListWrapper } from '@/components/organisms/ListWrapper';
import { RegisterPermissionItems } from '@/components/organisms/RegisterPermissionItems';
import { RegisterPermissionsTemplate } from '@/components/templates/RegisterPermissionsTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { useDeps } from './shared/useDeps';

export const RegisterPermissions = () => {
    const { state, dispatch, inputRef } = useDeps();
    return (
        <PageRequesterProvider>
            <InputRefProvider inputRef={inputRef}>
                <DispatchProvider dispatch={dispatch}>
                    <RegisterPermissionsTemplate state={state}>
                        <ListWrapper requestType={state.requestType}>
                            <RegisterPermissionItems items={state.data} />
                        </ListWrapper>
                    </RegisterPermissionsTemplate>
                </DispatchProvider>
            </InputRefProvider>
        </PageRequesterProvider>
    );
};
