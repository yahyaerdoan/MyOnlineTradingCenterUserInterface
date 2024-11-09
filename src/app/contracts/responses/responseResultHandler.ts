export class ResponseResultHanler<T> {
    resultData: T;
    isSuccessful: boolean;
    statusMessage: string;
    statusCode: number;

    constructor(resultData: T, isSuccessful: boolean, statusMessage: string, statusCode: number) {
        this.resultData = resultData;
        this.isSuccessful = isSuccessful;
        this.statusMessage = statusMessage;
        this.statusCode = statusCode;
    }
}
