/**
 * Implementação de um cache simples de 1h para armazenar dados da API
 */
import dayjs from "dayjs";

const API_CACHE_KEY = "@connect-church/api-cache";

export const FUNCTIONALITIES_API_CACHE_KEY = "functionalities";
export const MODULES_API_CACHE_KEY = "modules";
export const PLANS_API_CACHE_KEY = "plans";

type IKey =
  | typeof FUNCTIONALITIES_API_CACHE_KEY
  | typeof MODULES_API_CACHE_KEY
  | typeof PLANS_API_CACHE_KEY;

type IAPICache = Record<
  IKey,
  {
    data: unknown;
    expiresAt: string;
  }
>;

export function getCachedData<T>(key: IKey): T | null {
  const apiCache = localStorage.getItem(API_CACHE_KEY);

  if (!apiCache) return null;

  const parsedApiCache: IAPICache = JSON.parse(apiCache);
  const cachedData = parsedApiCache[key];

  if (!cachedData) return null;

  const expiresAt = dayjs(cachedData.expiresAt);

  if (expiresAt.isBefore(dayjs())) return null;

  return cachedData.data as T;
}

export function saveCacheData<T>(key: IKey, data: T): void {
  const apiCache = localStorage.getItem(API_CACHE_KEY);
  const expiresAt = dayjs().add(1, "hour").toISOString();

  if (!apiCache) {
    const newApiCache = {
      [key]: {
        data,
        expiresAt,
      },
    };

    localStorage.setItem(API_CACHE_KEY, JSON.stringify(newApiCache));
    return;
  }

  const parsedApiCache: IAPICache = JSON.parse(apiCache);
  parsedApiCache[key] = {
    data,
    expiresAt,
  };

  localStorage.setItem(API_CACHE_KEY, JSON.stringify(parsedApiCache));
}
