import { type AuthContextProvided } from '@/shared/contexts/types/AuthContextProvided';
import { type Location } from 'react-router';

export const userEmailMustVerify = (
    auth: AuthContextProvided | null,
    location: Location
) => {
    const regex = /^\/email\/verify(\/\d+\/.+\?expires=\d+&signature=.+)?$/;
    return (
        auth?.user?.emailVerified === false &&
        regex.test(`${location.pathname}${location.search}`) === false
    );
};
