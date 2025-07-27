export interface HttpStatusCodes {
    OK: 200;
    HTTP_NO_CONTENT: 204;
    CREATED: 201;
    UNPROCESSABLE_ENTITY: 422;
    UNAUTHORIZED: 401;
    FORBIDDEN: 403;
}

export type StatusCodeErrorHandleable =
    | HttpStatusCodes['UNPROCESSABLE_ENTITY']
    | HttpStatusCodes['UNAUTHORIZED']
    | HttpStatusCodes['FORBIDDEN'];
