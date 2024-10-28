import { ApiError } from "./ApiError";
import { HttpStatusCode } from "./HttpStatusCode";


export class ApiResponse  {
    statusCode?: HttpStatusCode;
    message?: string | undefined;
    isError?: boolean;
    responseException?: ApiError;
    result?: any | undefined;

    constructor () {

    }

}



