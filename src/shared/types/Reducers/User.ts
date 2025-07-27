import { type User } from '@/shared/types/Models/User';
import { type State } from '@/shared/types/Reducers/Standard/State';

export interface UserState extends State {
    user: User | null;
}
