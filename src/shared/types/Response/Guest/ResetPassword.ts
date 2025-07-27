import {
    type HttpFieldErrorResponse,
    type HttpStatusErrorResponse,
} from '@/shared/types/Http/Error/Response';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';
import { type XOR } from '@/shared/types/Xor';

export type ResetPasswordErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<
          XOR<{ email: [string] }, { password: [string] }>,
          { token: [string] }
      >;

export type ResetPasswordResponse =
    | HttpSuccessResponse<{ token: string; email: string }>
    | ResetPasswordErrorResponse;
