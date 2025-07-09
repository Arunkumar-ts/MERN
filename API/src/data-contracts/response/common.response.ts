export default class CommonResponse {
    code: number;
    message: string;
    data: object | null;
    errors: object | null;
 
    constructor(code: number, message: string, data: any | null, errors: object | null) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }
 
    static success(code = 200,  message = 'Success', data: object | null = null) {
        return new CommonResponse(code, message, data, null);
    }
 
    static error(code = 500, message = 'Error', errors: object | null = null) {
        return new CommonResponse(code, message, null, errors);
    }
}

export interface commonResponse {
    code: number;
    message: string;
    data: object | null;
    errors: object | null;
}