export const statedInitialData = {
    requestStatus: { statusCode: -1 as const },
};

export const loginInitialData = {
    ...statedInitialData,
    fields: {
        email: '',
        password: '',
    },
};

export const requestAccountInitialData = {
    ...statedInitialData,
    fields: {
        email: '',
        phone: '',
    },
};

export const forgotPasswordInitialData = {
    ...statedInitialData,
    fields: { email: '' },
};

export const registerAccountInitialData = {
    ...statedInitialData,
    token: null as string | null,
    fields: {
        name: '',
        email: '',
        password: '',
        passConfirm: '',
    },
};

export const resetPasswordInitialData = {
    ...statedInitialData,
    token: null as string | null,
    email: null as string | null,
    fields: {
        password: '',
        passConfirm: '',
    },
};

export const userFormInitialData = {
    ...statedInitialData,
    fields: {
        name: '',
        email: '',
        password: '',
    },
};

export const roleFormInitialData = {
    ...statedInitialData,
    fields: {
        name: '',
    },
};

export const abilityFormInitialData = {
    ...statedInitialData,
    fields: {
        name: '',
    },
};

export const userConfigInitialData = {
    ...statedInitialData,
    photoRemote: null,
    fields: {
        name: '',
        phone: '',
        email: '',
    },
};

export const verifyEmailInitialData = {
    ...statedInitialData,
    verified: false,
    resend: false,
};
