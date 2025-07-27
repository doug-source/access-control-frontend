import { type HttpStatusErrorResponse } from '@/shared/types/Http/Error/Response';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';

export type ApprovementErrorResponse = HttpStatusErrorResponse;

export type ApprovementResponse =
    | HttpSuccessResponse<unknown, 200>
    | ApprovementErrorResponse;
