import { type User } from '@/shared/types/Models/User';
import { type State } from '../States';

export interface UserState extends State {
    user: User | null;
}
