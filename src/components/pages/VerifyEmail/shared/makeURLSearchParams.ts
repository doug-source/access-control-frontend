type MakeUrlOutput = {
    [key in 'expires' | 'signature' | 'id' | 'hash']?: string;
};

export const makeURLSearchParams = (
    searchParams: URLSearchParams,
    id?: string,
    hash?: string
): URLSearchParams => {
    const output: MakeUrlOutput = {};
    if (searchParams.has('expires')) {
        output.expires = searchParams.get('expires') ?? undefined;
    }
    if (searchParams.has('signature')) {
        output.signature = searchParams.get('signature') ?? undefined;
    }
    if (id) {
        output.id = id;
    }
    if (hash) {
        output.hash = hash;
    }
    return new URLSearchParams(output);
};
