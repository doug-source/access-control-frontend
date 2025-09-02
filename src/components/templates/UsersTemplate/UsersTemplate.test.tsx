import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { usersReducer } from '@/shared/reducers/usersReducer';
import { httpClientInstance } from '@/shared/utils/globals/generic';
import { groups } from '@/shared/utils/pagination';
import { usersInitialData } from '@/shared/utils/ReduceInitialValues';
import { faker } from '@faker-js/faker';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReducer, useRef } from 'react';
import { MemoryRouter } from 'react-router';
import { UsersTemplate } from '.';

const runRefHook = () => {
    return renderHook(() => {
        return useRef<HTMLInputElement | null>(null);
    });
};

const runStateHook = (outerDispatch: ReturnType<typeof vi.fn>) => {
    const initialProps = { outerDispatch };
    return renderHook(
        ({ outerDispatch }) => {
            const [state, dispatch] = useReducer(usersReducer, {
                ...usersInitialData(1, groups[0]),
                data: [
                    {
                        id: faker.number.int({
                            min: 1,
                        }),
                        name: faker.person.firstName(),
                    },
                ],
                requestType: null,
            });
            const fn = (action: Parameters<typeof dispatch>[number]) => {
                outerDispatch();
                dispatch(action);
            };
            return [state, fn] as const;
        },
        { initialProps }
    );
};

describe('<UsersPageTemplate /> component', () => {
    it('renders correctly', () => {
        const {
            result: { current: ref },
        } = runRefHook();
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider client={httpClientInstance}>
                    <PageRequesterProvider>
                        <InputRefProvider inputRef={ref}>
                            <UsersTemplate
                                state={usersInitialData(1, groups[0])}
                            />
                        </InputRefProvider>
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
    it('renders clicking on close button correctly', async () => {
        const {
            result: { current: ref },
        } = runRefHook();
        const callbackDispatchFn = vi.fn();
        const { result, rerender: rerenderHook } =
            runStateHook(callbackDispatchFn);
        const { rerender } = render(
            <MemoryRouter initialEntries={['/']}>
                <DispatchProvider dispatch={result.current[1]}>
                    <HttpClientProvider client={httpClientInstance}>
                        <PageRequesterProvider>
                            <InputRefProvider inputRef={ref}>
                                <UsersTemplate state={result.current[0]} />
                            </InputRefProvider>
                        </PageRequesterProvider>
                    </HttpClientProvider>
                </DispatchProvider>
            </MemoryRouter>
        );
        const user = userEvent.setup();
        const $attachBtn = screen.getByRole('button', {
            name: /Botão para vincular papéis ou habilidades ao usuário/,
        });
        await user.click($attachBtn);
        rerenderHook({ outerDispatch: callbackDispatchFn });

        rerender(
            <MemoryRouter initialEntries={['/']}>
                <DispatchProvider dispatch={result.current[1]}>
                    <HttpClientProvider client={httpClientInstance}>
                        <PageRequesterProvider>
                            <InputRefProvider inputRef={ref}>
                                <UsersTemplate state={result.current[0]} />
                            </InputRefProvider>
                        </PageRequesterProvider>
                    </HttpClientProvider>
                </DispatchProvider>
            </MemoryRouter>
        );
        const $btn = screen.getByRole('button', {
            name: /Botão para fechar a caixa de diálogo/,
        });
        await user.click($btn);
        expect(callbackDispatchFn).toHaveBeenCalled();
    });
});
