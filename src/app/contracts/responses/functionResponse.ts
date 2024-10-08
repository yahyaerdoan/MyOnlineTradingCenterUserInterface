export class FunctionResponse{
    isSuccessful?: boolean;
    message?: string;
    statusCode?: number;
    data?: string[] | null;
    errors?: string[] | null;
}