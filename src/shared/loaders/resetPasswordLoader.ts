import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import { type LoaderFunctionArgs } from 'react-router';

type Provide = Reference['Dispatcher']['ResetPassword']['provide'];
type ProvideOutput = Generics['ResetPassword']['provide'];

export const resetPasswordLoader = (dispatcher: Provide) => {
    return ({ request }: LoaderFunctionArgs): Promise<ProvideOutput> => {
        const url = new URL(request.url);
        return dispatcher.provide(url.searchParams);
    };
};
