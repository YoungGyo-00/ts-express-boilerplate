export interface ErrorSafety<T> {
    success: boolean;
    message?: string;
    error?: any;
    result?: T;
}
