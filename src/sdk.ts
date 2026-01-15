import { HttpClient } from './http';
import { CaptureResource } from './resources/capture.resource';
import { PiggyBounceOptions } from './types';

export class PiggyBounce {
  readonly capture: CaptureResource;
  private readonly http: HttpClient;

  constructor(opts: PiggyBounceOptions) {
    this.http = new HttpClient(opts);
    this.capture = new CaptureResource(this.http);
  }
}
