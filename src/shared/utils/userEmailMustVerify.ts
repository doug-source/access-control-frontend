import type { NullableUserSigned } from '@/shared/types/NullableUserSigned';
import type { Location } from 'react-router';

export const userEmailMustVerify = (
    user: NullableUserSigned,
    location: Location
) => {
    const regex = /^\/email\/verify(\/\d+\/.+\?expires=\d+&signature=.+)?$/;
    const emailVerified = user?.emailVerified;
    return (
        emailVerified === false &&
        regex.test(`${location.pathname}${location.search}`) === false
    );
};
