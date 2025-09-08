export type PaginateKey = 'page' | 'group' | 'name' | 'email';

export type PaginateKeyContext =
    | 'user'
    | 'user-removed'
    | 'role'
    | 'role-from-user'
    | 'role-from-user-attach'
    | 'ability'
    | 'ability-from-role'
    | 'ability-from-role-attach'
    | 'ability-from-user'
    | 'ability-from-user-attach'
    | 'register-request'
    | 'register-permissions';
export type PaginateRemainFields = Exclude<PaginateKey, 'page' | 'group'>;
export type PaginateQueryString = {
    [K in PaginateRemainFields]?: string;
} & Record<'page' | 'group', string>;
