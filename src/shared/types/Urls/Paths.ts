import {
    type AbilityPaginations,
    type Approvements,
    type Attachments,
    type Detachments,
    type EndpointCreations,
    type Endpoints,
    type Paginations,
    type RegisterPaginations,
    type RemotionPrefixes,
    type Remotions,
    type Restorations,
    type RolePaginations,
    type UserPaginations,
    type Viewers,
} from './shared/Endpoints';
import {
    AbilityNavigations,
    AbstractNavigations,
    NavigationCreations,
    Navigations,
    RoleNavigations,
} from './shared/Navigations';

export interface Paths {
    endpoint: {
        complete: Endpoints;
        paginations: Paginations;
        remotions: Remotions;
        restorations: Restorations;
        attachments: Attachments;
        detachments: Detachments;
        viewers: Viewers;
        creations: EndpointCreations;
        approvements: Approvements;
        remotionPrefixes: RemotionPrefixes;
        abilityPaginations: AbilityPaginations;
        rolePaginations: RolePaginations;
        userPaginations: UserPaginations;
        registerRequestPaginations: RegisterPaginations['request'];
        registerPermissionPaginations: RegisterPaginations['permission'];
    };
    navigation: {
        abstract: AbstractNavigations[keyof AbstractNavigations];
        complete: Navigations;
        concrete: Exclude<
            Navigations,
            AbstractNavigations[keyof AbstractNavigations]
        >;
        creations: NavigationCreations[keyof NavigationCreations];
        role: RoleNavigations;
        ability: AbilityNavigations;
    };
}
