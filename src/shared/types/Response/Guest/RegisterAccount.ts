import { type HttpSuccessResponse } from '@/shared/types/Http/Response';
import { type HttpStatusCodes } from '@/shared/types/Http/Standard';
import { type XOR } from '@/shared/types/Xor.ts';
import {
    type HttpFieldErrorResponse,
    type HttpStatusErrorResponse,
} from '@shared/types/Http/Error/Response';

export type RegisterAccountErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<
          XOR<{ name: [string] }, { email: [string] }>,
          XOR<{ password: [string] }, { token: [string] }>
      >;

export type RegisterAccountResponse =
    | HttpSuccessResponse<unknown, HttpStatusCodes['CREATED']>
    | RegisterAccountErrorResponse;
