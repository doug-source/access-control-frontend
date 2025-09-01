import { type RequestStatus } from '@/shared/types/Http/Request';
import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { type RegisterPermissionIndex } from '@/shared/types/Models/RegisterPermission';
import { type RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import { type RoleIndex } from '@/shared/types/Models/Role';
import { type UserIndex } from '@/shared/types/Models/User';

const paginateInitialData = <T = unknown>(page: number, group: number) => ({
    requestStatus: { statusCode: 0 } as RequestStatus,
    data: [] as T[],
    page,
    group,
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

export const usersInitialData = (page: number, group: number) => ({
    ...paginateInitialData<UserIndex>(page, group),
    ...remotionInitialData,
    user: null,
    idRestored: null,
    restorationConfirm: true,
    idToAttach: null,
});

export const rolesInitialData = (page: number, group: number) => ({
    ...paginateInitialData<RoleIndex>(page, group),
    ...remotionInitialData,
    ...attachmentInitialData,
    ...detachmentInitialData,
    role: null,
});

export const abilitiesInitialData = (page: number, group: number) => ({
    ...paginateInitialData<AbilityIndex>(page, group),
    ...remotionInitialData,
    ...attachmentInitialData,
    ...detachmentInitialData,
    ability: null,
});

export const registerRequestsInitialData = (page: number, group: number) => ({
    ...paginateInitialData<RegisterRequestIndex>(page, group),
    ...remotionInitialData,
    registerRequest: null,
    idApproved: null,
    approvementConfirm: true,
});

export const registerPermissionsInitialData = (
    page: number,
    group: number
) => ({
    ...paginateInitialData<RegisterPermissionIndex>(page, group),
    registerPermission: null,
});
