import { type GenericOrField } from '@shared/types/Utils';

export interface ActionRequesting {
    type: 'loading';
}

export interface ActionError {
    type: 'error';
    payload: {
        message: string;
    } & GenericOrField;
}

export interface ActionSuccess {
    type: 'success';
    payload: string;
}

export type Action = ActionRequesting | ActionError | ActionSuccess;
