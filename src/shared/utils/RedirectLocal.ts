import { Paths } from '@/shared/types/Urls/Paths';
import { redirect } from 'react-router';

type RedirectInitParam = Parameters<typeof redirect>[1];

interface RedirectLocalFn {
    (
        url: Paths['navigation']['concrete'],
        init?: RedirectInitParam
    ): ReturnType<typeof redirect>;
}

export const redirectLocal: RedirectLocalFn = (url, init) => {
    return redirect(url, init);
};
