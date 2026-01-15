import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { PiggyBounceOptions, RequestOptions } from './types';
import { PiggyBounceError } from './errors';

export class HttpClient {
  private readonly ax: AxiosInstance;
  private readonly apiPrefix: string;

  constructor(private readonly opts: PiggyBounceOptions) {
    if (!opts.token) throw new Error('PiggyBounce: Token is required');

    this.apiPrefix = opts.apiVersion ?? 'v1';

    this.ax = axios.create({
      baseURL: 'https://api.piggybounce.com',
      timeout: opts.timeoutMs ?? 30_000,
      headers: {
        Authorization: `Bearer ${opts.token}`,
        'Content-Type': 'application/json',
        'User-Agent': `piggybounce-node/${process.env.npm_package_version ?? '0.1.0'} node/${process.versions.node}`,
      },
    });

    this.ax.interceptors.response.use(
      (r) => r,
      (err) => {
        const res = err?.response;
        const requestId =
          res?.headers?.['x-request-id'] ?? res?.headers?.['request-id'];

        const message =
          res?.data?.message ??
          res?.data?.error?.message ??
          err?.message ??
          'Request failed';

        const code = res?.data?.code ?? res?.data?.error?.code;

        throw new PiggyBounceError(message, {
          status: res?.status,
          code,
          requestId,
          details: res?.data,
        });
      }
    );
  }

  private isRetryableStatus(status?: number) {
    return status === 429 || (status != null && status >= 500 && status <= 599);
  }

  private isIdempotentMethod(method: string) {
    return method === 'GET' || method === 'DELETE';
  }

  private sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  private backoff(attempt: number, baseMs: number) {
    const exp = baseMs * Math.pow(2, attempt);
    const jitter = Math.floor(Math.random() * baseMs);
    return exp + jitter;
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const maxRetries = options?.maxRetries ?? 2;
    const baseDelay = options?.retryDelayMs ?? 300;

    const url = path.startsWith('/')
      ? `/${this.apiPrefix}${path}`
      : `/${this.apiPrefix}/${path}`;

    const config: AxiosRequestConfig = {
      method,
      url,
      data: body,
      params: options?.query,
      timeout: options?.timeoutMs ?? this.opts.timeoutMs ?? 30_000,
      headers: {
        ...(options?.headers ?? {}),
        ...(options?.idempotencyKey
          ? { 'Idempotency-Key': options.idempotencyKey }
          : {}),
      },
    };

    for (let attempt = 0; ; attempt++) {
      try {
        const res = await this.ax.request<T>(config);
        return res.data;
      } catch (err: any) {
        const status = err?.response?.status;
        const canRetry =
          attempt < maxRetries &&
          (this.isIdempotentMethod(method) || !!options?.idempotencyKey) &&
          (this.isRetryableStatus(status) || !err?.response);

        if (!canRetry) throw err;

        await this.sleep(this.backoff(attempt, baseDelay));
        throw err;
      }
    }
  }
}
