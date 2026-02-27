type SearchParams = { [key: string]: string | string[] | undefined };

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
  params?: SearchParams;
}

export type RequestConfig<Payload = undefined> = Payload extends undefined
  ? { options?: RequestOptions }
  : { payload: Payload; options?: RequestOptions };

export type ApiResponse<Data> = Promise<CustomResponse<Data>>;

type CustomResponse<Data> = {
  success: boolean;
  status: number;
  statusText: string;
  data: Data;
};

export class HttpClient {
  private baseUrl: string;
  public headers?: Record<string, string>;

  private token?: string;

  constructor(init: { baseUrl: string; headers?: Record<string, string> }) {
    this.baseUrl = init.baseUrl;
    this.headers = init.headers;
  }

  private createSearchParams(params: SearchParams) {
    const searchParams = new URLSearchParams();

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key];

        if (Array.isArray(value)) {
          value.forEach((currentValue) =>
            searchParams.append(key, currentValue),
          );
        } else if (value) {
          searchParams.set(key, value);
        }
      }
    }

    return `?${searchParams.toString()}`;
  }

  private async request<T>(
    endpoint: string,
    method: RequestInit["method"],
    options: RequestOptions = {},
  ): ApiResponse<T> {
    console.info("REQUEST:", method, endpoint, new Date());

    let url = `${this.baseUrl}/${endpoint}`;
    if (options.params) {
      url += this.createSearchParams(options.params);
    }

    const config: RequestInit = {
      ...options,
      method,
      headers: {
        ...(!!options?.headers && options.headers),
        ...this.headers,
        ...(!!this.token && { Authorization: `Bearer ${this.token}` }),
      },
    };

    if (config.body instanceof FormData) {
      delete (config.headers as Record<string, string>)["Content-Type"];
    } else if (config.body) {
      (config.headers as Record<string, string>)["Content-Type"] =
        "application/json";
    }

    const response: Response = await fetch(url, config);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }

    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: (await response.json()) as T,
    };
  }

  get<T>(endpoint: string, options: Omit<RequestOptions, "body"> = {}) {
    return this.request<T>(endpoint, "GET", options);
  }

  delete<T>(endpoint: string, options: Omit<RequestOptions, "body"> = {}) {
    return this.request<T>(endpoint, "DELETE", options);
  }

  post<T>(
    endpoint: string,
    body?: Record<string, unknown> | FormData,
    options: RequestOptions = {},
  ) {
    return this.request<T>(endpoint, "POST", {
      ...options,
      ...(!!body && {
        body: body instanceof FormData ? body : JSON.stringify(body),
      }),
    });
  }

  put<T>(
    endpoint: string,
    body?: Record<string, unknown> | FormData,
    options: RequestOptions = {},
  ) {
    return this.request<T>(endpoint, "PUT", {
      ...options,
      ...(!!body && {
        body: body instanceof FormData ? body : JSON.stringify(body),
      }),
    });
  }

  patch<T>(
    endpoint: string,
    body?: Record<string, unknown> | FormData,
    options: RequestOptions = {},
  ) {
    return this.request<T>(endpoint, "PATCH", {
      ...options,
      ...(!!body && {
        body: body instanceof FormData ? body : JSON.stringify(body),
      }), // <-- Условная обработка
    });
  }
}

export const httpClient = new HttpClient({
  baseUrl: "http://localhost:8080/api",
});
