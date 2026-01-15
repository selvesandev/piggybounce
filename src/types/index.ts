export type PiggyBounceOptions = {
  // baseURL: string;
  token: string;
  timeoutMs?: number;
  apiVersion?: string;
  appInfo?: {
    name: string;
    version?: string;
    url?: string;
  };
};

export type RequestOptions = {
  headers?: Record<string, string>;
  idempotencyKey?: string;
  timeoutMs?: number;
  query?: Record<string, any>;
  maxRetries?: number;
  retryDelayMs?: number;
};
