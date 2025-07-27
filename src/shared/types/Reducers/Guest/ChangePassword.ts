import {
    type Action,
    type ActionSuccess,
} from '@/shared/types/Reducers/Standard/Action';
import { type State } from '@/shared/types/Reducers/Standard/State';

export interface ResetPasswordState extends State {
    token: string | null;
    email: string | null;
}

interface ResetPasswordActionSuccess {
    type: 'success';
    payload: {
        token: string;
        email: string;
    };
}

export type ResetPasswordAction =
    | Exclude<Action, ActionSuccess>
    | ResetPasswordActionSuccess;
