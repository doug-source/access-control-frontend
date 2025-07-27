import { type RequestStatus } from '@/shared/types/Http/Request';
import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { type RegisterPermissionIndex } from '@/shared/types/Models/RegisterPermission';
import { type RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import { type RoleIndex } from '@/shared/types/Models/Role';
import { type UserIndex } from '@/shared/types/Models/User';
import { groups } from '@/shared/utils/pagination';

const paginateInitialData = <T = unknown>() => ({
    requestStatus: { statusCode: 0 } as RequestStatus,
    data: [] as T[],
    page: 1,
    group: groups.at(0) ?? 1,
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

export const usersInitialData = {
    ...paginateInitialData<UserIndex>(),
    ...remotionInitialData,
    user: null,
    idRestored: null,
    restorationConfirm: true,
    idToAttach: null,
};

export const rolesInitialData = {
    ...paginateInitialData<RoleIndex>(),
    ...remotionInitialData,
    ...attachmentInitialData,
    ...detachmentInitialData,
    role: null,
};

export const abilitiesInitialData = {
    ...paginateInitialData<AbilityIndex>(),
    ...remotionInitialData,
    ...attachmentInitialData,
    ...detachmentInitialData,
    ability: null,
};

export const registerRequestsInitialData = {
    ...paginateInitialData<RegisterRequestIndex>(),
    ...remotionInitialData,
    registerRequest: null,
    idApproved: null,
    approvementConfirm: true,
};

export const registerPermissionsInitialData = {
    ...paginateInitialData<RegisterPermissionIndex>(),
    registerPermission: null,
};

export const standardInitialData = {
    requestStatus: { statusCode: -1 as const },
};

export const userInitialData = {
    ...standardInitialData,
    user: null,
};

export const roleInitialData = {
    ...standardInitialData,
    role: null,
};

export const abilityInitialData = {
    ...standardInitialData,
    ability: null,
};

export const registerAccountInitialData = {
    ...standardInitialData,
    token: null as string | null,
};

export const resetPasswordInitialData = {
    ...standardInitialData,
    token: null as string | null,
    email: null as string | null,
};

export const registerRequestInitialData = {
    ...standardInitialData,
    registerRequest: null,
};

export const registerPermissionInitialData = {
    ...standardInitialData,
    registerPermission: null,
};

export const userConfigInitialData = {
    ...standardInitialData,
    photoRemote: null,
    photoChosen: null,
};
