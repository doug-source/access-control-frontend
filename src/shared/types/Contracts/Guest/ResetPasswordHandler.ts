import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type ResetPasswordData } from '@/shared/types/Parameters/ResetPasswordData';

export interface ResetPasswordHandler {
    reset(data: ResetPasswordData): ReturnType<HttpClient['request']>;
}
