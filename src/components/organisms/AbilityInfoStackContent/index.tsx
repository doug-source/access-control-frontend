import { DotsLoader } from '@/components/atoms/DotsLoader';
import { InfoStack } from '@/components/atoms/InfoStack';
import type { Ability } from '@/shared/types/Models/Ability';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';

export const AbilityInfoStackContent = () => {
    const { output } = useLoaderData() as {
        output: Promise<{ body: Ability }>;
    };
    const dotsLoaderComp = <DotsLoader />;
    return (
        <>
            <InfoStack.Item header>Name</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: ability }) => ability.name}
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Data de criação</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: ability }) => ability.createdAt}
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Última atualização</InfoStack.Item>
            <InfoStack.Item>
                <InfoStack.Item>
                    <Suspense fallback={dotsLoaderComp}>
                        <Await resolve={output}>
                            {({ body: ability }) => ability.updatedAt}
                        </Await>
                    </Suspense>
                </InfoStack.Item>
            </InfoStack.Item>
        </>
    );
};
