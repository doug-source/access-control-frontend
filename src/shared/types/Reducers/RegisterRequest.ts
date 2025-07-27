import { type RegisterRequest } from '@/shared/types/Models/RegisterRequest';
import { type State } from '@/shared/types/Reducers/Standard/State';

export interface RegisterRequestState extends State {
    registerRequest: RegisterRequest | null;
}
