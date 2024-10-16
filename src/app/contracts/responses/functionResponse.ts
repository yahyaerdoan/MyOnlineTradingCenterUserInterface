export class FunctionResponse<T> {
    isSuccessful!: boolean;
    message!: string;
    statusCode!: number;
    data?: T | null | undefined;
    errors?: string[];
  
    constructor(
      isSuccessful: boolean,
      message: string,
      statusCode: number,
      data?: T | null | undefined,
      errors?: string[]
    ) {
      this.isSuccessful = isSuccessful;
      this.message = message;
      this.statusCode = statusCode;
      this.data = data;
      this.errors = errors;
    }
  }
  