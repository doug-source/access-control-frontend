import type { Action } from '@/shared/types/Reducers/Standard/Action';
import type { State } from '@/shared/types/Reducers/Standard/State';

export interface UserConfigState extends State {
    photoRemote: string | null;
    photoChosen: File | null;
}

export interface PhotoChosenChangeAction {
    type: 'photo-chosen-change';
    payload: File | null;
}

export type UserConfigAction = Action | PhotoChosenChangeAction;
