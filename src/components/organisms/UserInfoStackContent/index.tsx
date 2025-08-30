import { DotsLoader } from '@/components/atoms/DotsLoader';
import { InfoStack } from '@/components/atoms/InfoStack';
import { type User } from '@/shared/types/Models/User';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';

interface UserInfoStackContentProps {
    removed?: boolean;
}

export const UserInfoStackContent = ({
    removed,
}: UserInfoStackContentProps) => {
    const { output } = useLoaderData() as { output: Promise<{ body: User }> };
    const dotsLoaderComp = <DotsLoader />;
    return (
        <>
            <InfoStack.Item header>Email</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: user }) => user.email}
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Telefone</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: user }) => user?.email ?? '-'}
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Email Verificado</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: user }) => user?.emailVerifiedAt ?? 'Não'}
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Data de criação</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: user }) => user?.createdAt}
                    </Await>
                </Suspense>
            </InfoStack.Item>
            <InfoStack.Item header>Última atualização</InfoStack.Item>
            <InfoStack.Item>
                <Suspense fallback={dotsLoaderComp}>
                    <Await resolve={output}>
                        {({ body: user }) => user?.updatedAt}
                    </Await>
                </Suspense>
            </InfoStack.Item>
            {removed && (
                <>
                    <InfoStack.Item header>Data de remoção</InfoStack.Item>
                    <InfoStack.Item>
                        <Suspense fallback={dotsLoaderComp}>
                            <Await resolve={output}>
                                {({ body: user }) => user?.deletedAt}
                            </Await>
                        </Suspense>
                    </InfoStack.Item>
                </>
            )}
        </>
    );
};
