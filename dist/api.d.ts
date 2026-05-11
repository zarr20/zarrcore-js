import { AxiosRequestConfig, AxiosInstance } from 'axios';

interface ModuleApiFactory$1 {
    <DReq = any, DRes = DReq>(url: string): any;
    get<T>(url: string, config?: ApiRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T>;
    delete<T>(url: string, config?: ApiRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T>;
}
type ApiQuery = Record<string, any>;
interface ApiRequestConfig<DBody = any, DQuery extends ApiQuery = ApiQuery> extends AxiosRequestConfig<DBody> {
    query?: DQuery;
    body?: DBody;
}
interface ApiClientConfig extends ApiRequestConfig {
    unwrapData?: boolean;
}
/**
 * Status request yang jelas untuk tracking state API
 */
type ApiStatus = "idle" | "loading" | "success" | "error";
/**
 * Interface untuk kontrol request lifecycle
 */
interface ApiRequestControls<TFn extends (...args: any[]) => Promise<any>> {
    execute: (...args: Parameters<TFn>) => Promise<Awaited<ReturnType<TFn>>>;
    refetch: () => Promise<Awaited<ReturnType<TFn>>>;
    abort: () => void;
    reset: () => void;
}
/**
 * Tipe pembantu untuk mengekstrak data utama dari berbagai struktur respons.
 * Default mengekstrak dari 'data' atau 'data.result'.
 */
type ExtractDataType<T, Base extends string = "default"> = Base extends "wrapped" ? (T extends {
    data: {
        result: infer R;
    };
} ? R : T) : Base extends "data" ? (T extends {
    data: infer D;
} ? D : T) : (T extends {
    data: {
        result: infer R;
    };
} ? R : (T extends {
    data: infer D;
} ? D : T));
type ExtractLiftedType<T, Base extends string = "default"> = Base extends "data" ? {} : T extends {
    data: infer D;
} ? D extends {
    result: any;
} ? Omit<D, "result"> : {} : {};
/**
 * State untuk API hooks, berisi data, status loading, dan error.
 * T adalah tipe respons penuh.
 */
type ApiState<T, B extends string = "default"> = (T extends object ? T : {
    data: T;
}) & ExtractLiftedType<T, B> & {
    data: ExtractDataType<T, B> | null;
    isLoading: boolean;
    status: ApiStatus;
    error: any;
    loading: boolean;
};
type UseApiSuccessPayload = "data" | "response";
type UseApiErrorPayload = "error" | "response" | "data";
type UseApiSuccessValue<TResponse, B extends string, P extends UseApiSuccessPayload> = P extends "response" ? TResponse : ExtractDataType<TResponse, B>;
type UseApiErrorValue<TError, EP extends UseApiErrorPayload> = EP extends "error" ? TError : EP extends "response" ? (TError extends {
    response: infer R;
} ? R : any) : (TError extends {
    response: {
        data: infer D;
    };
} ? D : any);
interface UseApiOptions<TResponse = any, TError = any, B extends string = "default", P extends UseApiSuccessPayload = "data", EP extends UseApiErrorPayload = "error"> {
    initialData?: ExtractDataType<TResponse, B>;
    successPayload?: P;
    onSuccess?: (payload: UseApiSuccessValue<TResponse, B, P>) => void;
    errorPayload?: EP;
    onError?: (payload: UseApiErrorValue<TError, EP>) => void;
    /**
     * Lifecycle hooks yang dipanggil pada setiap tahap request
     */
    onFinally?: () => void;
    /**
     * Menentukan apakah request dijalankan otomatis atau manual
     * false = lazy request (manual execution)
     * true = auto execute (default behavior)
     */
    enabled?: boolean;
    /**
     * Menentukan "Base Model" atau jalur ekstraksi data.
     * "wrapped" -> mengambil dari data.result
     * "data" -> mengambil dari data
     * "default" -> mencoba keduanya secara otomatis
     */
    baseModel?: B;
    /**
     * Fungsi kustom untuk mengekstrak data dari respons.
     */
    extractor?: (res: TResponse) => ExtractDataType<TResponse, B>;
}
interface UseApiLoadOptions<TResponse = any, TArgs extends any[] = any[], TError = any, B extends string = "default", P extends UseApiSuccessPayload = "data", EP extends UseApiErrorPayload = "error"> extends UseApiOptions<TResponse, TError, B, P, EP> {
    /**
     * @deprecated Use enabled: false instead for lazy requests
     */
    manual?: boolean;
    args?: TArgs;
}
/**
 * Global configuration untuk seluruh API client
 */
interface GlobalApiConfig {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
    unwrapData?: boolean;
    interceptors?: {
        request?: (config: any) => any;
        response?: (response: any) => any;
    };
}
/**
 * Service-level configuration untuk default konfigurasi per service
 */
interface ServiceConfig {
    timeout?: number;
    headers?: Record<string, string>;
    params?: Record<string, any>;
    retry?: number;
    retryDelay?: number;
    transformRequest?: (data: any) => any;
    transformResponse?: (response: any) => any;
}
/**
 * Runtime-level configuration untuk override dari useApiLoad/useApiSend
 */
interface RuntimeConfig extends ServiceConfig {
    enabled?: boolean;
    manual?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
    successPayload?: 'data' | 'response';
    errorPayload?: 'error' | 'response' | 'data';
}
/**
 * Configuration merger untuk menggabungkan 3 lapisan konfigurasi
 */
interface MergedApiConfig extends ServiceConfig {
    baseURL?: string;
    globalHeaders?: Record<string, string>;
    serviceHeaders?: Record<string, string>;
    runtimeHeaders?: Record<string, string>;
    mergedHeaders?: Record<string, string>;
}
/**
 * Enhanced service factory dengan konfigurasi bertingkat
 */
type ConfiguredServiceFactory<TParams = any, TResult = any> = (config?: ServiceConfig) => (factory: ModuleApiFactory$1) => (params: TParams) => Promise<TResult>;

/**
 * Interface for automated CRUD helpers.
 */
interface ApiCrudHelper<DReq = any, DRes = DReq> {
    list: (config?: ApiRequestConfig) => Promise<DRes[]>;
    get: (id: string | number, config?: ApiRequestConfig) => Promise<DRes>;
    create: (data: DReq, config?: ApiRequestConfig) => Promise<DRes>;
    update: (id: string | number, data: Partial<DReq>, config?: ApiRequestConfig) => Promise<DRes>;
    patch: (id: string | number, data: Partial<DReq>, config?: ApiRequestConfig) => Promise<DRes>;
    remove: (id: string | number, config?: ApiRequestConfig) => Promise<void>;
    upload: (data: any, config?: ApiRequestConfig) => Promise<DRes>;
}
/**
 * Interface for the API Factory object.
 * It is a function that creates CRUD helpers and also has HTTP methods as properties.
 */
interface ApiFactory {
    <DReq = any, DRes = DReq>(url: string): ApiCrudHelper<DReq, DRes>;
    get<T>(url: string, config?: ApiRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T>;
    delete<T>(url: string, config?: ApiRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T>;
}
/**
 * Factory for creating standard API wrappers (GET, POST, PUT, DELETE, PATCH).
 * Simplifies Axios instance usage with more concise typing.
 */
declare function createApiFactory(client: AxiosInstance): ApiFactory;

/**
 * Creates an Axios instance with optimal preset configuration.
 * By default, it unwraps response data (returns res.data directly).
 */
declare function createApiClient(config?: ApiClientConfig): AxiosInstance;

/**
 * Hook for automated data loading (usually for GET requests).
 */
declare function useApiLoad<TFn extends (...args: any[]) => Promise<any>, TResponse = Awaited<ReturnType<TFn>>, TError = any, B extends string = "default", P extends UseApiSuccessPayload = "data", EP extends UseApiErrorPayload = "error">(requestFn: TFn, options?: UseApiLoadOptions<TResponse, Parameters<TFn>, TError, B, P, EP>): [
    (...args: Parameters<TFn>) => Promise<TResponse>,
    ApiState<TResponse, B>
];
/**
 * Hook for manual data sending (usually for POST/PUT/DELETE/PATCH).
 */
declare function useApiSend<TFn extends (...args: any[]) => Promise<any>, TResponse = Awaited<ReturnType<TFn>>, TError = any, B extends string = "default", P extends UseApiSuccessPayload = "data", EP extends UseApiErrorPayload = "error">(requestFn: TFn, options?: UseApiOptions<TResponse, TError, B, P, EP>): [
    (...args: Parameters<TFn>) => Promise<TResponse>,
    ApiState<TResponse, B>
];
/**
 * Hook for full lifecycle control access (new API for advanced use cases).
 * Provides complete control over request lifecycle with execute, refetch, abort, and reset.
 */
declare function useApiControls<TFn extends (...args: any[]) => Promise<any>, TResponse = Awaited<ReturnType<TFn>>, TError = any, B extends string = "default", P extends UseApiSuccessPayload = "data", EP extends UseApiErrorPayload = "error">(requestFn: TFn, options?: UseApiOptions<TResponse, TError, B, P, EP>): [
    ApiRequestControls<TFn>,
    ApiState<TResponse, B>
];

/**
 * Type helper for factories used in API modules.
 */
type ModuleApiFactory = ReturnType<typeof createApiFactory>;
/**
 * Type helper to convert service factory objects into bound service objects.
 */
type BindServices<T> = {
    [K in keyof T]: T[K] extends (factory: ModuleApiFactory) => infer R ? R : T[K] extends object ? BindServices<T[K]> : T[K];
};
/**
 * Helper to bind API services into a single unified hook.
 * Automatically creates the internal client and factory.
 */
declare function bindApi<T extends Record<string, any>>(services: T): BindServices<T> & {
    useLoad: typeof useApiLoad;
    useSend: typeof useApiSend;
    useControls: typeof useApiControls;
};
/**
 * Enhanced API binder with multi-layer configuration support
 * Supports global, service-level, and runtime-level configuration
 */
declare function bindApiWithConfig<T extends Record<string, any>>(services: T, globalConfig?: GlobalApiConfig): any;

export { type ApiClientConfig, type ApiCrudHelper, type ApiFactory, type ApiRequestConfig, type ApiState, type BindServices, type ConfiguredServiceFactory, type ExtractDataType, type GlobalApiConfig, type MergedApiConfig, type ModuleApiFactory, type RuntimeConfig, type ServiceConfig, type UseApiLoadOptions, type UseApiOptions, bindApi, bindApiWithConfig, createApiClient, createApiFactory, useApiControls, useApiLoad, useApiSend };
