export const groups = [3, 5, 10];

type PaginateKey = 'page' | 'group';
export type PaginateKeyContext =
    | 'user'
    | 'user-removed'
    | 'role'
    | 'role-from-user'
    | 'ability'
    | 'ability-from-role'
    | 'ability-from-user';

export const storePagination = (
    context: PaginateKeyContext,
    key: PaginateKey,
    value: number,
    id: number
) => {
    localStorage.setItem(`pagination.${context}.${key}.${id}`, String(value));
};

export const getPaginationStored = (
    context?: PaginateKeyContext,
    key?: PaginateKey,
    id?: number
) => {
    const value = localStorage.getItem(
        `pagination.${context ?? ''}.${key ?? ''}.${id ?? ''}`
    );
    return value ? Number(value) : null;
};
