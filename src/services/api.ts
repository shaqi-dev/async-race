import type {
  GarageData,
  Car,
  CarSettings,
  CarEngine,
  Winner,
  WinnersData,
  SORT,
  ORDER,
} from '../interfaces/shared';

const API_BASE = 'http://localhost:3000';

const API_GARAGE = `${API_BASE}/garage`;
const API_ENGINE = `${API_BASE}/engine`;
const API_WINNERS = `${API_BASE}/winners`;

const unexpectedStatus = (fnName: string): Error =>
  new Error(`Cannot ${fnName}, get: UNEXPECTED_RESPONSE_STATUS`);
const notFound = (fnName: string): Error => new Error(`Cannot ${fnName}, get: NOT_FOUND`);
const badRequest = (fnName: string): Error => new Error(`Cannot ${fnName}, get: BAD_REQUEST`);
const tooManyRequests = (fnName: string): Error =>
  new Error(`Cannot ${fnName}, get: TOO_MANY_REQUESTS`);
const internalError = (fnName: string): Error =>
  new Error(`Cannot ${fnName}, get: INTERNAL_SERVER_ERROR`);

export const getCars = async (page = 1, limit = 7): Promise<[GarageData, null] | [null, Error]> => {
  try {
    const res = await fetch(`${API_GARAGE}?_limit=${limit}&_page=${page}`);

    if (res.status === 200) {
      const data = {
        cars: (await res.json()) as Car[],
        count: Number(res.headers.get('X-Total-Count')) || 0,
      };

      return [data, null];
    }

    return [null, unexpectedStatus('Get Cars')];
  } catch (e) {
    return [null, e as Error];
  }
};

export const getCar = async (id: number): Promise<[Car, null] | [null, Error]> => {
  try {
    const res = await fetch(`${API_GARAGE}/${id}`);

    if (res.status === 200) {
      const data: Car = await res.json();

      return [data, null];
    }

    return [null, unexpectedStatus('Get Car')];
  } catch (e) {
    return [null, e as Error];
  }
};

export const createCar = async (car: CarSettings): Promise<void | Error> => {
  try {
    const res = await fetch(`${API_GARAGE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    if (res.status === 201) return;

    return unexpectedStatus('Create Car');
  } catch (e) {
    return e as Error;
  }
};

export const deleteCar = async (id: number): Promise<void | Error> => {
  try {
    const res = await fetch(`${API_GARAGE}/${id}`, {
      method: 'DELETE',
    });

    const fnName = 'Delete Car';

    if (res.status === 200) return;
    if (res.status === 404) return notFound(fnName);

    return unexpectedStatus(fnName);
  } catch (e) {
    return e as Error;
  }
};

export const updateCar = async (id: number, car: CarSettings): Promise<void | Error> => {
  try {
    const res = await fetch(`${API_BASE}/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    const fnName = 'Update Car';

    if (res.status === 200) return;
    if (res.status === 404) return notFound(fnName);

    return unexpectedStatus(fnName);
  } catch (e) {
    return e as Error;
  }
};

export const setCarEngine = async (
  id: number,
  status: 'started' | 'stopped',
): Promise<[CarEngine, null] | [null, Error]> => {
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

export const setCarEngineToDrive = async (
  id: number,
): Promise<[{ success: boolean }, null] | [null, Error]> => {
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

export const getWinners = async (
  sort: SORT,
  order: ORDER,
  page = 1,
  limit = 10,
): Promise<[WinnersData, null] | [null, Error]> => {
  try {
    const res = await fetch(
      `${API_WINNERS}?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}`,
    );

    if (res.status === 200) {
      const data = {
        winners: (await res.json()) as Winner[],
        count: Number(res.headers.get('X-Total-Count')) || 0,
      };

      return [data, null];
    }

    return [null, unexpectedStatus('Get Winners')];
  } catch (e) {
    return [null, e as Error];
  }
};

export const getWinner = async (id: number): Promise<[Winner, null] | [null, Error]> => {
  try {
    const res = await fetch(`${API_WINNERS}/${id}`);

    if (res.status === 200) {
      const data: Winner = await res.json();
      return [data, null];
    }

    const fnName = 'Get Winner';

    if (res.status === 404) return [null, notFound(fnName)];

    return [null, unexpectedStatus(fnName)];
  } catch (e) {
    return [null, e as Error];
  }
};

export const createWinner = async (winner: Winner): Promise<void | Error> => {
  try {
    const res = await fetch(`${API_WINNERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });

    const fnName = 'Create Winner';

    if (res.status === 201) return;
    if (res.status === 500) return internalError(fnName);

    return unexpectedStatus(fnName);
  } catch (e) {
    return e as Error;
  }
};

export const deleteWinner = async (id: number): Promise<void | Error> => {
  try {
    const res = await fetch(`${API_WINNERS}/${id}`, {
      method: 'DELETE',
    });

    const fnName = 'Delete Winner';

    if (res.status === 200) return;
    if (res.status === 404) return notFound(fnName);

    return unexpectedStatus(fnName);
  } catch (e) {
    return e as Error;
  }
};

export const updateWinner = async (winner: Winner): Promise<void | Error> => {
  const { id, wins, time } = winner;

  try {
    const res = await fetch(`${API_WINNERS}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ wins, time }),
    });

    const fnName = 'Update Winner';

    if (res.status === 200) return;
    if (res.status === 404) return notFound(fnName);

    return unexpectedStatus(fnName);
  } catch (e) {
    return e as Error;
  }
};
