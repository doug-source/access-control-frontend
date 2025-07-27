import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type SubmitForgotData } from '@/shared/types/Parameters/SubmitForgotData';

export interface ForgotPasswordHandler {
    sayYouForgot(data: SubmitForgotData): ReturnType<HttpClient['request']>;
}
