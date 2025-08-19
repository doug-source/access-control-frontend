import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import { type LoaderFunctionArgs } from 'react-router';

type Provide = Reference['Dispatcher']['RequestAccount']['provide'];
type ProvideOutput = Generics['RequestAccount']['provide'] | null;

export const requestAccountLoader = (dispatcher: Provide) => {
    return async ({ request }: LoaderFunctionArgs): Promise<ProvideOutput> => {
        const url = new URL(request.url);
        return dispatcher.provide(url.searchParams);
    };
};
