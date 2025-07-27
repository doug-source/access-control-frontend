/**
 * Define if each parameter is nullable at all
 */
export const dataNullable = (...types: unknown[]) => {
    return types.every((val) => val === null);
};
