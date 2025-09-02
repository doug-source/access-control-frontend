import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { httpClientInstance } from '@/shared/utils/globals/generic';
import { groups } from '@/shared/utils/pagination';
import { usersInitialData } from '@/shared/utils/ReduceInitialValues';
import { render, renderHook, screen } from '@testing-library/react';
import { useRef } from 'react';
import { UsersRemovedTemplate } from '.';

const runHook = () => {
    return renderHook(() => {
        return useRef<HTMLInputElement | null>(null);
    });
};

describe('<UsersRemovedTemplate /> component', () => {
    it('renders correctly', () => {
        const {
            result: { current: ref },
        } = runHook();
        render(
            <HttpClientProvider client={httpClientInstance}>
                <PageRequesterProvider>
                    <InputRefProvider inputRef={ref}>
                        <UsersRemovedTemplate
                            state={usersInitialData(1, groups[0])}
                        />
                    </InputRefProvider>
                </PageRequesterProvider>
            </HttpClientProvider>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
