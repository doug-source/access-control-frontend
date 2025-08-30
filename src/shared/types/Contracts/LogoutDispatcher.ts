import type { TokenSetter } from '@/shared/types/Contracts/TokenSetter';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';

export interface SignOutDispatcher extends TokenSetter {
    /**
     * Request and manage the application logout
     */
    signOut(): Promise<Generics['Login']['signOut']>;
}
