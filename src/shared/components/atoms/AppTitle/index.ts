import { createPortal } from 'react-dom';

interface AppTitleProps {
    title?: string;
}

export const AppTitle = ({ title = '' }: AppTitleProps) => {
    const $tag = document.getElementById('app-title');
    if ($tag) {
        return createPortal(title, $tag);
    }
    return null;
};
