import type {
    HttpSuccessResponse,
    SuccessResponseStatusCodes,
} from '@/shared/types/Http/Response';
import type { State } from '@/shared/types/States';

export interface SuccessHandler<B, S extends State> {
    /**
     * Handle the response's success data
     */
    handle(
        output: HttpSuccessResponse<B, SuccessResponseStatusCodes>,
        state: S
    ): S;
}
