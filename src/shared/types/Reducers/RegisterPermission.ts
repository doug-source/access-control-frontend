import { type RegisterPermission } from '@/shared/types/Models/RegisterPermission';
import { type State } from '../States';

export interface RegisterPermissionState extends State {
    registerPermission: RegisterPermission | null;
}
