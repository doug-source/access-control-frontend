import { UserConfigTemplate } from '@/components/templates/UserConfigTemplate';
import { PhotoFileRefProvider } from '@/shared/providers/PhotoFileRefProvider';
import { useDeps } from './shared/useDeps';

export const UserConfig = () => {
    const [state, formAction, pending, clearFileRef] = useDeps();
    return (
        <PhotoFileRefProvider photoFileRef={clearFileRef}>
            <UserConfigTemplate
                state={state}
                formAction={formAction}
                pending={pending}
            />
        </PhotoFileRefProvider>
    );
};
