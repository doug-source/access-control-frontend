import { type RegisterPermissionIndex } from '@/shared/types/Models/RegisterPermission';
import { type PaginationAction } from '@/shared/types/Reducers/Custom/PaginationAction';
import { type PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';

export interface RegisterPermissionsState
    extends PaginationState<RegisterPermissionIndex> {
    registerPermission: RegisterPermissionIndex | null;
}

export type RegisterPermissionsAction =
    PaginationAction<RegisterPermissionIndex>;
