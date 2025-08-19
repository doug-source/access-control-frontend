export const useDeps = () => {
    const host = import.meta.env.VITE_HOST as string;
    return [`${host}/auth/google/redirect/request`] as const;
};
