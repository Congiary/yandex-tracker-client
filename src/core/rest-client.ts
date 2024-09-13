import axios, {AxiosHeaders, AxiosInstance} from 'axios';
import {RequestOptions} from "../types/lib";

export class RestClient {
    private session: AxiosInstance;
    private headers: AxiosHeaders;
    private baseUrl: string;
    private timeout: number;
    private retries: number;
    private retriesInitialDelay: number;
    private retriesDelayMultiplier: number;
    private retriesDelayUpperLimit: number;

    constructor(
        token: string,
        orgId?: string,
        cloudOrgId?: string,
        baseUrl = 'https://api.tracker.yandex.net',
        timeout = 10,
        retries = 10,
        retriesInitialDelay = 0,
        retriesDelayMultiplier = 1,
        retriesDelayUpperLimit = 0,
        iamToken?: string,
    ) {
        this.baseUrl = baseUrl;
        this.timeout = timeout;
        this.retries = retries;
        this.retriesInitialDelay = retriesInitialDelay;
        this.retriesDelayMultiplier = retriesDelayMultiplier;
        this.retriesDelayUpperLimit = retriesDelayUpperLimit;

        this.headers = new AxiosHeaders()

        this.headers.set('Authorization', iamToken ? `Bearer ${iamToken}` : `OAuth ${token}`);
        this.headers.set('Content-Type', 'application/json');

        if (cloudOrgId) {
            if (orgId) throw new Error('Use either org_id or cloud_org_id to specify organization');

            this.headers.set('X-Cloud-Org-Id', cloudOrgId);
        } else {
            this.headers.set('X-Org-Id', orgId || 'not provided');
        }

        this.session = axios.create({
            baseURL: this.baseUrl,
            headers: this.headers,
            timeout: this.timeout * 1000, // timeout in ms
        });
    }

    private async request(options: RequestOptions): Promise<any> {
        const {method, path, data, headers, params} = options;
        const url = this.buildUrl(path);

        let retryDelay = this.retriesInitialDelay;
        let attempt = 0;

        while (attempt <= this.retries) {
            try {
                const response = await this.session.request({
                    method,
                    url,
                    data: data ? JSON.stringify(data) : undefined,
                    params,
                    headers: {...this.headers, ...headers},
                });
                return response.data;
            } catch (error: any) {
                const status = error.response?.status;
                if (status && (status >= 500 || status === 429) && attempt < this.retries) {
                    attempt++;
                    await this.delay(retryDelay);
                    retryDelay = Math.min(retryDelay * this.retriesDelayMultiplier, this.retriesDelayUpperLimit);
                } else {
                    throw error;
                }
            }
        }
    }

    private buildUrl(path: string): string {
        return `${this.baseUrl}/${path}`;
    }

    private async delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // Method Bindings for HTTP verbs
    public get(path: string, params?: Record<string, any>): Promise<any> {
        return this.request({method: 'GET', path, params});
    }

    public post(path: string, data?: Record<string, any>): Promise<any> {
        return this.request({method: 'POST', path, data});
    }

    public put(path: string, data?: Record<string, any>): Promise<any> {
        return this.request({method: 'PUT', path, data});
    }

    public patch(path: string, data?: Record<string, any>): Promise<any> {
        return this.request({method: 'PATCH', path, data});
    }

    public delete(path: string): Promise<any> {
        return this.request({method: 'DELETE', path});
    }

    public stream(path: string, params?: Record<string, any>): Promise<any> {
        return this.request({method: 'GET', path, params, headers: {Accept: 'application/octet-stream'}, stream: true});
    }
}
