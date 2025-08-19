import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { LoaderFunctionArgs } from 'react-router';

type Provide = Reference['Dispatcher']['RegisterAccount']['provide'];
type ProvideOutput = Generics['RegisterAccount']['provide'] | null;

export const registerAccountLoader = (dispatcher: Provide) => {
    return async ({ request }: LoaderFunctionArgs): Promise<ProvideOutput> => {
        const url = new URL(request.url);
        return dispatcher.provide(url.searchParams);
    };
};
