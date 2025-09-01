export const groups = [3, 5, 10];

type PaginateKey = 'page' | 'group';
export type PaginateKeyContext =
    | 'user'
    | 'user-removed'
    | 'role'
    | 'role-from-user'
    | 'ability'
    | 'ability-from-role'
    | 'ability-from-user'
    | 'register-request'
    | 'register-permissions';

export const getPaginationKey = (
    context: PaginateKeyContext,
    key: PaginateKey,
    id: number
) => {
    return `pagination.${context}.${key}.${id}`;
};
