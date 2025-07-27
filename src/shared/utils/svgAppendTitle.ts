const getTag = (el: SVGSVGElement) => {
    const tag = el.querySelector('title');
    if (!tag) {
        return document.createElementNS('http://www.w3.org/2000/svg', 'title');
    }
    return tag;
};

export const svgAppendTitle = (title?: string) => {
    return (el: SVGSVGElement | null) => {
        if (!el || !title) {
            return;
        }
        const titleTag = getTag(el);
        titleTag.innerHTML = title;
        el.append(titleTag);
    };
};
