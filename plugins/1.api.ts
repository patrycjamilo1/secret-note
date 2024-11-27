import type { FetchContext } from "ofetch";
import type { ApiModel } from "~/types/composables.types";

declare module "#app" {
  interface NuxtApp {
    $api: ApiModel;
  }
}

class ApiHelper implements ApiModel {
  private baseURL: string;
  private headers: Record<string, string>;

  public constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.headers = {};
  }

  private catchErrors = async ({
    request,
    response,
  }: FetchContext): Promise<void> => {
    if (response && response?.status >= 500) {
      let headers = {};

      response.headers.forEach((value: string, key: string) => {
        headers = { ...headers, ...{ [key]: value } };
      });

      const body =
        response._data.constructor.name === "Blob"
          ? await response._data.text()
          : response._data;

      console.error(response.statusText, {
        url: request,
        status: response.status,
        headers,
        response: body,
      });
    }

    if (response && response.status === 404) {
      throw createError({ statusCode: 404, statusMessage: "Page not found" });
    }
  };

  private fetch = async <T>(url: string, options: any): Promise<T> => {
    try {
      if (!this.baseURL)
        throw new Error(
          `ApiHelper: Cannot fetch url "${url}" because baseUrl is empty.`
        );

      const data = await $fetch(url, {
        baseURL: this.baseURL,
        ...options,
        headers: this.headers,
      });

      return data as T;
    } catch (ex) {
      this.catchErrors(ex as FetchContext);

      throw ex;
    }
  };

  public async get<T>(
    url: string,
    params: Record<string, any> = {}
  ): Promise<T> {
    return await this.fetch<T>(url, { params });
  }

  public async getBlob<T>(
    url: string,
    params: Record<string, any> = {}
  ): Promise<T> {
    return await this.fetch<T>(url, {
      params,
      headers: {
        Accept: "application/pdf",
        "Content-Type": "application/json",
      },
      responseType: "blob",
    });
  }

  public async post<T>(url: string, body: Record<string, any>): Promise<T> {
    return await this.fetch<T>(url, { method: "POST", body });
  }

  public async postFormData<T>(
    url: string,
    body: Record<string, any>
  ): Promise<T> {
    return await this.fetch<T>(url, {
      method: "POST",
      body,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  public async put<T>(url: string, body: Record<string, any> = {}): Promise<T> {
    return await this.fetch<T>(url, { method: "PUT", body });
  }

  public async patch<T>(
    url: string,
    body: Record<string, any> = {}
  ): Promise<T> {
    return await this.fetch<T>(url, { method: "PATCH", body });
  }

  public async delete<T>(url: string, params: Record<string, any>): Promise<T> {
    return await this.fetch<T>(url, { method: "DELETE", params });
  }

  public setHeader(headers: Record<string, string>): void {
    this.headers = { ...this.headers, ...headers };
  }

  public deleteHeader(headerName: string): void {
    delete this.headers[headerName];
  }
}

export default defineNuxtPlugin(() => {
  const {
    public: { apiUrl },
  } = useRuntimeConfig();

  return {
    provide: {
      api: new ApiHelper(apiUrl) as ApiModel,
    },
  };
});
