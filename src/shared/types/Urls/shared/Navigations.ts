export type AbstractActions = {
    remotions: {
        user: '/users/remove/:id' | '/users/removed/remove/:id';
        role: '/roles/remove/:id';
        ability: '/abilities/remove/:id';
        registerRequest: '/register/requests/remove/:id';
    };
    restorations: {
        user: '/user/restore/:id';
    };
    attachments: {
        role: '/roles/user/:id/attach';
    };
    detachments: {
        role: '/roles/user/:id';
    };
    approvements: {
        registerRequest: '/register/requests/approve/:id';
    };
};

export type AbstractNavigations = {
    all: '*';
    user:
        | '/users/:id'
        | '/users/removed/:id'
        | AbstractActions['remotions']['user'];
    role:
        | '/roles/:id'
        | '/roles/user/:id'
        | '/roles/user/:id/attach'
        | AbstractActions['remotions']['role']
        | AbstractActions['attachments']['role']
        | AbstractActions['detachments']['role'];
    ability:
        | '/abilities/:id'
        | '/abilities/user/:id'
        | '/abilities/user/:id/attach'
        | '/abilities/role/:id'
        | '/abilities/role/:id/attach'
        | AbstractActions['remotions']['ability'];
    registerRequest:
        | '/register/requests/:id'
        | AbstractActions['remotions']['registerRequest']
        | AbstractActions['approvements']['registerRequest'];
    registerPermission: '/register-permissions/:id';
};

export type ListNavigations = {
    user:
        | `/users${'' | `?page=${number}&group=${number}`}`
        | `/users/removed${'' | `?page=${number}&group=${number}`}`;
    role: '/roles' | `/roles/user/${number}` | `/roles/user/${number}/attach`;
    ability:
        | '/abilities'
        | `/abilities/user/${number}`
        | `/abilities/user/${number}/attach`
        | `/abilities/role/${string}`
        | `/abilities/role/${number}/attach`;
    registerRequest: '/register-requests';
    registerPermission: '/register-permissions';
};

export type NavigationCreations = {
    user: '/users/create';
    role: '/roles/create';
    ability: '/abilities/create';
};

export type NavigationActions = {
    user:
        | `/users/remove/${number}`
        | `/users/removed/remove/${number}`
        | `/users/restore/${number}`;

    registerRequest:
        | `/register/requests/remove/${number}`
        | `/register/requests/approval/${number}`;

    role:
        | `/roles/remove/${number}`
        | `/roles/user/${number}/attach?names=${string}`
        | `/roles/user/${number}?names=${string}`; // detach

    ability:
        | `/abilities/remove/${number}`
        | `/abilities/user/${number}/attach?names=${string}`
        | `/abilities/user/${number}?names=${string}` // detach
        | `/abilities/role/${number}/attach?names=${string}`
        | `/abilities/role/${number}?names=${string}`; // detach;
};

type UserNavigations =
    | ListNavigations['user']
    | `/users/${number}`
    | NavigationCreations['user']
    | AbstractNavigations['user']
    | NavigationActions['user'];

export type RoleNavigations =
    | ListNavigations['role']
    | `/roles/${number}`
    | NavigationCreations['role']
    | AbstractNavigations['role']
    | NavigationActions['role'];

export type AbilityNavigations =
    | ListNavigations['ability']
    | `/abilities/${number}`
    | NavigationCreations['ability']
    | AbstractNavigations['ability']
    | NavigationActions['ability'];

export type RegisterNavigations = {
    request:
        | ListNavigations['registerRequest']
        | `/register-requests/${number}`
        | NavigationActions['registerRequest']
        | AbstractNavigations['registerRequest'];
    permission:
        | ListNavigations['registerPermission']
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
