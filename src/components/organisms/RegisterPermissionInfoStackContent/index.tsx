import { DotsLoader } from '@/components/atoms/DotsLoader';
import { InfoStack } from '@/components/atoms/InfoStack';
import type { RegisterPermission } from '@/shared/types/Models/RegisterPermission';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';

export const RegisterPermissionInfoStackContent = () => {
    const { output } = useLoaderData() as {
        output: Promise<{ body: RegisterPermission }>;
    };
    const dotsLoaderComp = <DotsLoader />;
    return (
        <>
            <InfoStack.Item header>E-mail</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: registerPermission }) =>
                            registerPermission.email
                        }
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Telefone</InfoStack.Item>
            <InfoStack.Item>
                <InfoStack.Item>
                    <Suspense fallback={dotsLoaderComp}>
                        <Await resolve={output}>
                            {({ body: registerPermission }) =>
                                registerPermission.phone ?? '-'
                            }
                        </Await>
                    </Suspense>
                </InfoStack.Item>
            </InfoStack.Item>
            <InfoStack.Item header>Data de Expiração</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: registerPermission }) =>
                            registerPermission.expirationData
                        }
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Data de criação</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: registerPermission }) =>
                            registerPermission.createdAt
                        }
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Última atualização</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: registerPermission }) =>
                            registerPermission.updatedAt
                        }
                    </Await>
                </Suspense>
            </InfoStack.Item>
        </>
    );
};
