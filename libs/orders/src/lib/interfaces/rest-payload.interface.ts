export interface IRestPayload<T> {
    error: null | string;
    success: boolean;
    body: null | T;
}
