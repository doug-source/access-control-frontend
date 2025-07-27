import { type HttpClient } from './HttpClient';

export interface AbilitiesRequester {
    /**
     * Search the user's abilities
     */
    request(id: number, token: string): ReturnType<HttpClient['request']>;
}
