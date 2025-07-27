import {
    type HttpFieldErrorResponse,
    type HttpStatusErrorResponse,
} from '@/shared/types/Http/Error/Response';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';
import { type HttpStatusCodes } from '@/shared/types/Http/Standard';
import { type XOR } from '@/shared/types/Xor';

export type FastUserCreationErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<
          XOR<{ name: [string] }, { email: [string] }>,
          { password: [string] }
      >;

export type FastUserCreationResponse =
    | HttpSuccessResponse<unknown, HttpStatusCodes['CREATED']>
    | FastUserCreationErrorResponse;
