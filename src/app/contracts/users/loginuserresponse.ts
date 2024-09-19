import { TokenResponse } from "../tokens/tokenResponse";

export class LogInUserResponse {
    isSuccessful!: boolean;
    message!: string;
    statusCode!: number;
    data?: TokenResponse | null;
    errors?: string[];
}