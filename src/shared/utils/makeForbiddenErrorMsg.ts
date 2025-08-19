export const makeForbiddenErrorMsg = (customMsg?: string) => {
    const message = customMsg ?? (import.meta.env.VITE_FORBIDDEN_MSG as string);
    return {
        type: 'generic' as const,
        message,
    };
};
