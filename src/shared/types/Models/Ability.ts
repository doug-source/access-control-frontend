export interface AbilityIndex {
    id: number;
    name: string;
}

export interface Ability {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export type Abilities =
    | 'settings'
    | 'user-screen'
    | 'register-request-screen'
    | 'role-screen'
    | 'ability-screen'
    | 'register-permission-screen'
    | 'add-user-screen'
    | 'add-role-screen'
    | 'add-ability-screen'
    | 'show-user-screen'
    | 'show-role-screen'
    | 'show-ability-screen'
    | 'show-register-request-screen'
    | 'show-register-permission-screen'
    //
    | 'remove-user'
    | 'restore-user'
    //
    | 'remove-register-request'
    | 'approve-register-request'
    //
    | 'attach-role-and-ability'
    | 'attach-role-to-user'
    | 'detach-role-from-user'
    | 'ability-from-role-screen'
    | 'remove-role'
    //
    | 'attach-ability-to-role'
    | 'detach-ability-from-role'
    | 'attach-ability-to-user'
    | 'detach-ability-from-user'
    | 'remove-ability';
