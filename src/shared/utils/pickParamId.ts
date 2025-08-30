import { Params } from 'react-router';

export const pickParamId = (params: Params) => {
    const id = Number(params.id ?? '');
    if (Number.isNaN(id) || id < 1) {
        throw new Error('Invalid url parameter');
    }
    return id;
};
