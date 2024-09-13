export interface RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    path: string;
    params?: Record<string, any>;
    data?: Record<string, any>;
    files?: Record<string, any>;
    headers?: Record<string, any>;
    stream?: boolean;
}