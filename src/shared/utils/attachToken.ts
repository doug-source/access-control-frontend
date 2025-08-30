import type { TokenSetter } from '@/shared/types/Contracts/TokenSetter';

export const attachToken = <
    TS extends TokenSetter,
    FD extends { dispatcher: TS }
>(
    subject: FD,
    token: string
): FD => {
    subject.dispatcher.setToken(token);
    return subject;
};
