import { type RegisterRequest } from '@/shared/types/Models/RegisterRequest';
import { type State } from '../States';

export interface RegisterRequestState extends State {
    registerRequest: RegisterRequest | null;
}
