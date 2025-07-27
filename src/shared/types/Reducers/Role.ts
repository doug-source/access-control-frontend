import { type Role } from '@/shared/types/Models/Role';
import { type State } from '@/shared/types/Reducers/Standard/State';

export interface RoleState extends State {
    role: Role | null;
}
