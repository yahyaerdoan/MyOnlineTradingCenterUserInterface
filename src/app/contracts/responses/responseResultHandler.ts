export class ResponseResultHanler<T> {
    resultData: T;
    isSuccessful: boolean;
    statusMessage: string;
    statusCode: number;
    errors?: string[];

    constructor(resultData: T, isSuccessful: boolean, statusMessage: string, statusCode: number, errors: string[]) {
        this.resultData = resultData;
        this.isSuccessful = isSuccessful;
        this.statusMessage = statusMessage;
        this.statusCode = statusCode;
        this.errors = errors
    }
}
