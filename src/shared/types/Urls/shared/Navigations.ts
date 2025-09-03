export type AbstractNavigations = {
    all: '*';
    user: '/users/:id' | '/users/removed/:id';
    role: '/roles/:id' | '/roles/user/:id' | '/roles/user/:id/attach';
    ability:
        | '/abilities/:id'
        | '/abilities/user/:id'
        | '/abilities/user/:id/attach'
        | '/abilities/role/:id'
        | '/abilities/role/:id/attach';
    registerRequest: '/register-requests/:id';
    registerPermission: '/register-permissions/:id';
};

export type NavigationCreations = {
    user: '/users/create';
    role: '/roles-create';
    ability: '/abilities-create';
};

type UserNavigations =
    | '/users'
    | '/users/removed'
    | `/users/${number}`
    | AbstractNavigations['user']
    | NavigationCreations['user'];

export type RoleNavigations =
    | '/roles'
    | `/roles/${number}`
    | AbstractNavigations['role']
    | NavigationCreations['role']
    | `/roles/user/${number}`
    | `/roles/user/${number}/attach`;

export type AbilityNavigations =
    | '/abilities'
    | `/abilities/${number}`
    | AbstractNavigations['ability']
    | NavigationCreations['ability']
    | `/abilities/user/${number}`
    | `/abilities/user/${number}/attach`
    | `/abilities/role/${string}`
    | `/abilities/role/${number}/attach`;

export type RegisterNavigations = {
    request:
        | '/register-requests'
        | `/register-requests/${number}`
        | AbstractNavigations['registerRequest'];
    permission:
        | '/register-permissions'
        | `/register-permissions/${number}`
        | AbstractNavigations['registerPermission'];
};

export type Navigations =
    | AbstractNavigations['all']
    | '/'
    | '/not-found'
    | '/provided'
    | '/home'
    | '/request'
    | '/register'
    | '/forgot'
    | '/change-pass'
    | `/email/verify${'' | `/${string}/${string}`}`
    | RegisterNavigations[keyof RegisterNavigations]
    | UserNavigations
    | RoleNavigations
    | AbilityNavigations
    | '/config'
    | '/config-user';
