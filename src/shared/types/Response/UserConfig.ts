import type {
    HttpFieldErrorResponse,
    HttpStatusErrorResponse,
} from '@/shared/types/Http/Error/Response';
import type { HttpSuccessResponse } from '@/shared/types/Http/Response';
import type { HttpStatusCodes } from '@/shared/types/Http/Standard';
import { XOR } from '../Xor';

export type UserConfigErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<
          XOR<XOR<{ name: [string] }, { phone: [string] }>, { photo: [string] }>
      >;

export type UserConfigResponse =
    | HttpSuccessResponse<{ photo: string | null }, HttpStatusCodes['OK']>
    | UserConfigErrorResponse;
