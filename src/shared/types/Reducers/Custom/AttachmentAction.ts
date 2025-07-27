import { AbilityIndex } from '../../Models/Ability';
import { RoleIndex } from '../../Models/Role';

export interface IdToAttachAction<T = unknown> {
    type: 'to-attach';
    payload: T;
}

export interface AttachmentSuccessAction<T = unknown> {
    type: 'attachment-success';
    payload: T;
}

export type AttachmentActionModels = AbilityIndex | RoleIndex;

export type AttachmentAction<T extends AttachmentActionModels> =
    | IdToAttachAction<T | null>
    | AttachmentSuccessAction<T>;
