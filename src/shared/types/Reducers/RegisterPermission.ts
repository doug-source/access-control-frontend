import { type RegisterPermission } from '@/shared/types/Models/RegisterPermission';
import { type State } from '@/shared/types/Reducers/Standard/State';

export interface RegisterPermissionState extends State {
    registerPermission: RegisterPermission | null;
}
