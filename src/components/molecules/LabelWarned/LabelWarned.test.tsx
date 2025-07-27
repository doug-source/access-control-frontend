import { RequestStatus } from '@/shared/types/Http/Request';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { LabelWarned } from '.';

describe('<LabelWarned /> component', () => {
    test('renders no notice correctly', () => {
        const request: RequestStatus = { statusCode: -1 };
        render(
            <LabelWarned request={request} field="foo" data-testid="label-key">
                content
            </LabelWarned>
        );
        const $el = screen.getByTestId('label-key');
        expect($el).toBeInTheDocument();
    });
    test('renders with notice and no field correctly', () => {
        const request: RequestStatus = {
            statusCode: 422,
            type: 'generic',
            message: faker.word.noun(),
        };
        render(
            <LabelWarned request={request} field="foo" data-testid="label-key">
                content
            </LabelWarned>
        );
        const $el = screen.getByTestId('label-key');
        expect($el).toBeInTheDocument();
    });
    test('renders with notice and field correctly', () => {
        const fieldKey = faker.word.noun();
        const request: RequestStatus = {
            statusCode: 422,
            type: 'field',
            field: fieldKey,
            message: faker.word.noun(),
        };
        render(
            <LabelWarned
                request={request}
                field={fieldKey}
                data-testid="label-key"
            >
                content
            </LabelWarned>
        );
        const $el = screen.getByTestId('label-key');
        expect($el).toBeInTheDocument();
    });
});
