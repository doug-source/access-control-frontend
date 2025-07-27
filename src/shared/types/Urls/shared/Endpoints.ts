export type UserPaginations = '/api/users' | '/api/users/removed';

export type RolePaginations = '/api/roles' | `/api/users/${string}/roles`;

export type AbilityPaginations =
    | '/api/abilities'
    | `/api/users/${number}/abilities`
    | `/api/roles/${number}/abilities`;

export type RegisterPaginations = {
    request: '/api/registers/requests';
    permission: '/api/registers/permissions';
};

export type Paginations =
    | UserPaginations
    | RolePaginations
    | AbilityPaginations
    | RegisterPaginations[keyof RegisterPaginations];

export type RemotionPrefixes =
    | '/api/users'
    | '/api/users/removed'
    | '/api/abilities'
    | '/api/roles'
    | '/api/registers/requests';

export type Remotions = `${RemotionPrefixes}/${number}`;

export type Restorations = '/api/users/restore';

export type Approvements = `/api/registers/requests/${number}/approval`;

type UserRoleDetachment = `/api/users/${number}/roles`;
type RoleAbilityDetachment = `/api/roles/${number}/abilities`;
type UserAbilityDetachment = `/api/users/${number}/abilities`;

export type Detachments =
    | UserRoleDetachment
    | RoleAbilityDetachment
    | UserAbilityDetachment;

type UserRoleAttachment = `/api/users/${number}/roles`;
type RoleAbilityAttachment = `/api/roles/${number}/abilities`;
type UserAbilityAttachment = `/api/users/${number}/abilities`;

export type Attachments =
    | UserRoleAttachment
    | RoleAbilityAttachment
    | UserAbilityAttachment;

export type EndpointCreations = {
    user: '/api/users/store' | '/api/users/fast/store';
    role: '/api/roles';
    ability: '/api/abilities';
};

export type Viewers =
    | `/api/users/${number}`
    | `/api/users/removed/${number}`
    | `/api/roles/${number}`
    | `/api/abilities/${number}`
    | `/api/registers/requests/${number}`
    | `/api/registers/permissions/${number}`;

type UserUpdate = '/api/users';

export type Endpoints =
    | '/api/login'
    | '/api/logout'
    | '/api/login/provide'
    | '/api/registers/requests/store'
    | '/api/email/verification-notification'
    | `/api/email/verify/${string}/${string}?expires=${number}&signature=${string}`
    | `/api/forgot-password?email=${string}`
    | '/api/reset-password'
    | Paginations
    | Remotions
    | Restorations
    | Detachments
    | EndpointCreations[keyof EndpointCreations]
    | Viewers
    | Approvements
    | UserUpdate;
