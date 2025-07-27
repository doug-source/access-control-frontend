import { UserConfigTemplate } from '@/components/templates/UserConfigTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { PhotoFileProvider } from '@/shared/providers/PhotoFileProvider';
import { SelfUpdateProvider } from '@/shared/providers/SelfUpdateProvider';
import { useDeps } from './shared/useDeps';

export const UserConfig = () => {
    const [state, dispatch] = useDeps();
    return (
        <SelfUpdateProvider>
            <DispatchProvider dispatch={dispatch}>
                <PhotoFileProvider file={state.photoChosen}>
                    <UserConfigTemplate state={state} />
                </PhotoFileProvider>
            </DispatchProvider>
        </SelfUpdateProvider>
    );
};
