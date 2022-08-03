import { CarEngine } from '../interfaces/shared/engine';
import API_BASE from './apiBase';
import { badRequest, notFound, unexpectedStatus, tooManyRequests, internalError } from './errors';

const API_ENGINE = `${API_BASE}/engine`;

export type SetCarEngineReturn = Promise<[CarEngine, null] | [null, Error]>;

export const setCarEngine = async (
  id: number,
  status: 'started' | 'stopped',
): SetCarEngineReturn => {
  try {
    const res = await fetch(`${API_ENGINE}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });

    if (res.status === 200) {
      const data: CarEngine = await res.json();
      return [data, null];
    }

    const fnName = 'Set Car Engine';

    if (res.status === 400) return [null, badRequest(fnName)];
    if (res.status === 404) return [null, notFound(fnName)];

    return [null, unexpectedStatus(fnName)];
  } catch (e) {
    return [null, e as Error];
  }
};

export type SetCarEngineToDriveReturn = Promise<[{ success: boolean }, null] | [null, Error]>;

export const setCarEngineToDrive = async (id: number): SetCarEngineToDriveReturn => {
  try {
    const res = await fetch(`${API_ENGINE}?id=${id}&status=drive`, {
      method: 'PATCH',
    });

    if (res.status === 200) {
      const data: { success: boolean } = await res.json();
      return [data, null];
    }

    const fnName = 'Set Car Engine to Drive';

    if (res.status === 400) return [null, badRequest(fnName)];
    if (res.status === 404) return [null, notFound(fnName)];
    if (res.status === 429) return [null, tooManyRequests(fnName)];
    if (res.status === 500) return [null, internalError(fnName)];

    return [null, unexpectedStatus(fnName)];
  } catch (e) {
    return [null, e as Error];
  }
};
