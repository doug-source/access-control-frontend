import { type Paths } from '@/shared/types/Urls/Paths';

export interface CustomRequestInit extends globalThis.RequestInit {
    url:
        | Paths['endpoint']['complete']
        | { url: Paths['endpoint']['complete']; qs: Record<string, string> };
}
