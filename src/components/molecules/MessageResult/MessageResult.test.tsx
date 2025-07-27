import { RequestStatus } from '@/shared/types/Http/Request';
import { faker } from '@faker-js/faker';
import { render, screen, within } from '@testing-library/react';
import { MessageResult } from '.';

describe('<MessageResult /> component', () => {
    it('renders success request correctly', () => {
        const message = faker.word.noun();
        const request: RequestStatus = { statusCode: 200, message: message };
        render(<MessageResult request={request} />);
        const $el = screen.getByText(message);
        expect($el).toBeInTheDocument();
    });
    it('renders idle request correctly', () => {
        const request: RequestStatus = { statusCode: -1 };
        render(<MessageResult request={request} />);
        const $el = screen.queryByRole('alert');
        expect($el).not.toBeInTheDocument();
    });
    it('renders field error request correctly', () => {
        const request: RequestStatus = {
            statusCode: 422,
            type: 'field',
            field: faker.word.noun(),
            message: faker.word.words({ count: 3 }),
        };
        render(<MessageResult request={request} />);
        const $el = screen.queryByRole('alert');
        expect($el).not.toBeInTheDocument();
    });
    it('renders generic error request correctly', () => {
        const message = faker.word.words({ count: 3 });
        const request: RequestStatus = {
            statusCode: 422,
            type: 'generic',
            message,
        };
        render(<MessageResult request={request} />);
        const $el = screen.getByRole('alert');
        expect($el).toBeInTheDocument();
        expect(within($el).getByText(message)).toBeInTheDocument();
    });
    it('throws error by incorrect status code', () => {
        const message = faker.word.words({ count: 3 });
        const request = {
            statusCode: 404,
            type: 'generic',
            message,
        } as unknown as RequestStatus;
        expect(() => {
            render(<MessageResult request={request} />);
        }).toThrow(/Missed a case!/);
    });
});
