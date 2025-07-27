export function isHandleableError(response: Response) {
    switch (response.status) {
        case 422:
        case 401:
        case 403:
            return true;
        default:
            return false;
    }
}
