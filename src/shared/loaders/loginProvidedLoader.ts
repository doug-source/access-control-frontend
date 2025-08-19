import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import { LoaderFunctionArgs } from 'react-router';

type Provide = Reference['Dispatcher']['Login']['provide'];
type ProvideOutput = Generics['Login']['provide'] | null;

export const loginProvidedLoader = (dispatcher: Provide) => {
    return async ({ request }: LoaderFunctionArgs): Promise<ProvideOutput> => {
        const url = new URL(request.url);
        return dispatcher.provide(url.searchParams);
    };
};
