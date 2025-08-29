import type { HttpClient } from '@/shared/types/Contracts/HttpClient';
import type { RequestAborter } from '@/shared/types/Contracts/RequestAborter';
import type { ResetPasswordData } from '@/shared/types/Parameters/ResetPasswordData';

export interface ResetPasswordRequester extends RequestAborter {
    reset(data: ResetPasswordData): ReturnType<HttpClient['request']>;
}
