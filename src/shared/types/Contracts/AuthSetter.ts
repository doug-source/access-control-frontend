import { AuthContextProvided } from '@/shared/contexts/types/AuthContextProvided';

export interface AuthSetter {
    /**
     * Store the application auth instance
     */
    setAuth(auth: AuthContextProvided | null): this;
}
