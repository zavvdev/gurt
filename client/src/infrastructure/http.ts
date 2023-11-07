import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ServerResponse } from '~/infrastructure/serverApi/types';

type HttpRequestConfig = {
  baseURL?: string;
  params?: Record<string, unknown>;
  headers?: {
    [key: string]: string | string[] | number | boolean | null;
  };
};

export class Http {
  private repo: AxiosInstance;

  constructor(repo: AxiosInstance) {
    this.repo = repo;
  }

  private reqConfigAdapter(reqConfig?: HttpRequestConfig): AxiosRequestConfig {
    return {
      baseURL: reqConfig?.baseURL,
      headers: reqConfig?.headers,
      params: reqConfig?.params,
    };
  }

  public async get<T = unknown>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<ServerResponse<T>> {
    const res = await this.repo.get<ServerResponse<T>>(
      url,
      this.reqConfigAdapter(config),
    );
    return res.data;
  }

  public async post<T = unknown, R = unknown>(
    url: string,
    data?: R,
    config?: HttpRequestConfig,
  ): Promise<ServerResponse<T>> {
    const res = await this.repo.post<ServerResponse<T>>(
      url,
      data,
      this.reqConfigAdapter(config),
    );
    return res.data;
  }

  public async put<T = unknown, R = unknown>(
    url: string,
    data?: R,
    config?: HttpRequestConfig,
  ): Promise<ServerResponse<T>> {
    const res = await this.repo.put<ServerResponse<T>>(
      url,
      data,
      this.reqConfigAdapter(config),
    );
    return res.data;
  }

  public async patch<T = unknown, R = unknown>(
    url: string,
    data?: R,
    config?: HttpRequestConfig,
  ): Promise<ServerResponse<T>> {
    const res = await this.repo.patch<ServerResponse<T>>(
      url,
      data,
      this.reqConfigAdapter(config),
    );
    return res.data;
  }

  public async delete<T = unknown>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<ServerResponse<T>> {
    const res = await this.repo.delete<ServerResponse<T>>(
      url,
      this.reqConfigAdapter(config),
    );
    return res.data;
  }
}
