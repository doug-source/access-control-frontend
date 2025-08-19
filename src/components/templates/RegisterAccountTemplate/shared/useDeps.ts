export const useDeps = (token: string | null) => {
    const host = import.meta.env.VITE_HOST as string;
    return [`${host}/auth/google/redirect/register/${token ?? ''}`] as const;
};
