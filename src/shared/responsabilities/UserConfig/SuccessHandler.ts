import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { UserConfigState } from '@/shared/types/States';

type SuccessHandler = Reference['Handlers']['UserConfig']['Success'];
type Output = Params['SuccessHandler']['UserConfig']['Output'];

export class UserConfigSuccessHandler implements SuccessHandler {
    handle(_output: Output, state: UserConfigState): UserConfigState {
        return {
            ...state,
            requestStatus: {
                statusCode: 200 as const,
                message: 'OK',
            },
        };
    }
}
