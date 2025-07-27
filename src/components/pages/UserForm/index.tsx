import { UserFormTemplate } from '@/components/templates/UserFormTemplate';
import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { useDeps } from './shared/useDeps';

export const UserForm = () => {
    const [state, dispatch] = useDeps();
    return (
        <CreatorProvider>
            <DispatchProvider dispatch={dispatch}>
                <UserFormTemplate state={state} />
            </DispatchProvider>
        </CreatorProvider>
    );
};
