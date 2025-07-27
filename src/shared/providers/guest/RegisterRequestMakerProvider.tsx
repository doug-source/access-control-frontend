import { RegisterRequestMakerContext } from '@/shared/contexts/RegisterRequestMakerContext';
import { registerRequestMakerInstance } from '@/shared/utils/globals';
import { ComponentPropsWithoutRef, PropsWithChildren, useMemo } from 'react';

interface RegisterRequestMakerProviderProps extends PropsWithChildren {
    maker?: ComponentPropsWithoutRef<
        typeof RegisterRequestMakerContext.Provider
    >['value'];
}

export const RegisterRequestMakerProvider = ({
    maker,
    children,
}: RegisterRequestMakerProviderProps) => {
    const registerRequestMaker = useMemo(
        () => maker ?? registerRequestMakerInstance,
        [maker]
    );
    return (
        <RegisterRequestMakerContext.Provider value={registerRequestMaker}>
            {children}
        </RegisterRequestMakerContext.Provider>
    );
};
