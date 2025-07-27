import { RoleFormTemplate } from '@/components/templates/RoleFormTemplate';
import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { useDeps } from './shared/useDeps';

export const RoleForm = () => {
    const [state, dispatch] = useDeps();
    return (
        <CreatorProvider>
            <DispatchProvider dispatch={dispatch}>
                <RoleFormTemplate state={state} />
            </DispatchProvider>
        </CreatorProvider>
    );
};
