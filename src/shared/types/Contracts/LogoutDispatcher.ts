import type { Generics } from '@/shared/types/Responsabilities/Outputs';

export interface SignOutDispatcher {
    /**
     * Request and manage the application logout
     */
    signOut(): Promise<Generics['Login']['signOut']>;
}
