import { DotsLoader } from '@/components/atoms/DotsLoader';
import { InfoStack } from '@/components/atoms/InfoStack';
import { type Role } from '@/shared/types/Models/Role';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';

export const RoleInfoStackContent = () => {
    const { output } = useLoaderData() as { output: Promise<{ body: Role }> };
    const dotsLoaderComp = <DotsLoader />;
    return (
        <>
            <InfoStack.Item header>Name</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: role }) => role.name}
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Data de criação</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: role }) => role.createdAt}
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Última atualização</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: role }) => role.updatedAt}
                    </Await>
                </Suspense>
            </InfoStack.Item>
        </>
    );
};
