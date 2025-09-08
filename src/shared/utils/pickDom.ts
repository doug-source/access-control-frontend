export const pickDom = (id: string) => {
    const el = document.getElementById(id);
    return el ?? document.createDocumentFragment();
};
