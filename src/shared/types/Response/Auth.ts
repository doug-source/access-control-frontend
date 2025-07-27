import {
    type HttpFieldErrorResponse,
    type HttpStatusErrorResponse,
} from '@/shared/types/Http/Error/Response';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';
import { type OutcomeAuthUSer } from '@/shared/types/NullableUser';

export type AuthErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<{ email: [string] }, { password: [string] }>;

export type AuthResponse =
    | HttpSuccessResponse<{
          user: OutcomeAuthUSer;
      }>
    | AuthErrorResponse;
