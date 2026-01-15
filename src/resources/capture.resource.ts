import { HttpClient } from '../http';

export type CaptureURLType = {
  url: string;
  window?: { width: number; height: number };
};

export class CaptureResource {
  constructor(private readonly http: HttpClient) {}

  url(params: CaptureURLType) {
    return this.http.request('POST', '/capture/url', params);
  }

  html() {
    // HTML capture logic here
  }
}
