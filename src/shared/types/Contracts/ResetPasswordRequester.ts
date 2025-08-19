import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type ResetPasswordData } from '@/shared/types/Parameters/ResetPasswordData';

export interface ResetPasswordRequester {
    reset(data: ResetPasswordData): ReturnType<HttpClient['request']>;
}
