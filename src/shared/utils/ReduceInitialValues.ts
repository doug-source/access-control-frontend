import { type RequestStatus } from '@/shared/types/Http/Request';
import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { type RegisterPermissionIndex } from '@/shared/types/Models/RegisterPermission';
import { type RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import { type RoleIndex } from '@/shared/types/Models/Role';
import { type UserIndex } from '@/shared/types/Models/User';
import {
    getPaginationStored,
    groups,
    type PaginateKeyContext,
} from '@/shared/utils/pagination';

const paginateInitialData = <T = unknown>(
    context?: PaginateKeyContext,
    userSigned?: number
) => ({
    requestStatus: { statusCode: 0 } as RequestStatus,
    data: [] as T[],
    page: getPaginationStored(context, 'page', userSigned) ?? 1,
    group: getPaginationStored(context, 'group', userSigned) ?? groups[0] ?? 1,
    lastPage: 0,
    warning: false,
    error: null,
    total: 0,
    requestType: 'list' as const,
});

const remotionInitialData = {
    idRemoved: null,
    remotionConfirm: true,
};

const detachmentInitialData = {
    idDetached: null,
    detachmentConfirm: true,
};

const attachmentInitialData = {
    idAttached: null,
    attachmentConfirm: true,
};

export const usersInitialData = (
    context?: PaginateKeyContext,
    userSigned?: number
) => ({
    ...paginateInitialData<UserIndex>(context, userSigned),
    ...remotionInitialData,
    user: null,
    idRestored: null,
    restorationConfirm: true,
    idToAttach: null,
});

export const rolesInitialData = (
    context?: PaginateKeyContext,
    userSigned?: number
) => ({
    ...paginateInitialData<RoleIndex>(context, userSigned),
    ...remotionInitialData,
    ...attachmentInitialData,
    ...detachmentInitialData,
    role: null,
});

export const abilitiesInitialData = (
    context?: PaginateKeyContext,
    userSigned?: number
) => ({
    ...paginateInitialData<AbilityIndex>(context, userSigned),
    ...remotionInitialData,
    ...attachmentInitialData,
    ...detachmentInitialData,
    ability: null,
});

export const registerRequestsInitialData = (
    context?: PaginateKeyContext,
    userSigned?: number
) => ({
    ...paginateInitialData<RegisterRequestIndex>(context, userSigned),
    ...remotionInitialData,
    registerRequest: null,
    idApproved: null,
    approvementConfirm: true,
});

export const registerPermissionsInitialData = (
    context?: PaginateKeyContext,
    userSigned?: number
) => ({
    ...paginateInitialData<RegisterPermissionIndex>(context, userSigned),
    registerPermission: null,
});
