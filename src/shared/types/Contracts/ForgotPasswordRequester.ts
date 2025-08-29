import type { HttpClient } from '@/shared/types/Contracts/HttpClient';
import type { RequestAborter } from '@/shared/types/Contracts/RequestAborter';
import type { SubmitForgotData } from '@/shared/types/Parameters/SubmitForgotData';

export interface ForgotPasswordRequester extends RequestAborter {
    sayYouForgot(data: SubmitForgotData): ReturnType<HttpClient['request']>;
}
