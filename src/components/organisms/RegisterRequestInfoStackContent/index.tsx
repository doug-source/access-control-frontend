import { DotsLoader } from '@/components/atoms/DotsLoader';
import { InfoStack } from '@/components/atoms/InfoStack';
import type { RegisterRequest } from '@/shared/types/Models/RegisterRequest';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';

export const RegisterRequestInfoStackContent = () => {
    const { output } = useLoaderData() as {
        output: Promise<{ body: RegisterRequest }>;
    };
    const dotsLoaderComp = <DotsLoader />;
    return (
        <>
            <InfoStack.Item header>E-mail</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: registerRequest }) => registerRequest.email}
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Telefone</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: registerRequest }) =>
                            registerRequest.phone ?? '-'
                        }
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Data de criação</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: registerRequest }) =>
                            registerRequest.createdAt
                        }
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Última atualização</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: registerRequest }) =>
                            registerRequest.updatedAt
                        }
                    </Await>
                </Suspense>
            </InfoStack.Item>
        </>
    );
};
