import { type Role } from '@/shared/types/Models/Role';
import { type State } from '../States';

export interface RoleState extends State {
    role: Role | null;
}
