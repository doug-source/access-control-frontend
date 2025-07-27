import { AuthContext } from '@/shared/contexts/AuthContext';
import { type AuthContextProvided } from '@/shared/contexts/types/AuthContextProvided';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage.ts';
import { type NullableAuthUser } from '@/shared/types/NullableUser';
import { type PropsWithChildren, useMemo } from 'react';
import { useDeps } from './shared/useDeps';

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useLocalStorage<NullableAuthUser>('user', null);
    const { abilities, setAbilities, setEndpoints } = useDeps();

    const value: AuthContextProvided = useMemo(
        () => ({
            user,
            abilities,
            async login(data) {
                const { abilities: newAbilities, ...newUser } = data;
                setAbilities(newAbilities);
                setUser(newUser);
                setEndpoints('/home');
            },
            updateAuthUser(name, phone, photo) {
                if (user === null) {
                    return;
                }
                const newUser = { ...user, name, phone, photo };
                setUser(newUser);
            },
            logout() {
                setUser(null);
                setEndpoints('/');
            },
            emailValidated() {
                if (user === null) {
                    return;
                }
                setUser({
                    ...user,
                    emailVerified: true,
                });
            },
        }),
        [setUser, user, setEndpoints, abilities, setAbilities]
    );
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
