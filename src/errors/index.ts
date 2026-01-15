export class PiggyBounceError extends Error {
  readonly status?: number;
  readonly code?: string;
  readonly requestId?: string;
  readonly details?: unknown;

  constructor(
    message: string,
    opts?: {
      status?: number;
      code?: string;
      requestId?: string;
      details?: unknown;
    }
  ) {
    super(message);
    this.name = 'PiggyBounceError';
    this.status = opts?.status;
    this.code = opts?.code;
    this.requestId = opts?.requestId;
    this.details = opts?.details;
  }
}
