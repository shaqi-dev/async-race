import { SORT, ORDER } from '../interfaces/shared/winnersFilters';
import { WinnersData, Winner } from '../interfaces/shared/winners';
import API_BASE from './apiBase';
import { unexpectedStatus, notFound, internalError } from './errors';

const API_WINNERS = `${API_BASE}/winners`;

export type GetWinnersReturn = Promise<[WinnersData, null] | [null, Error]>;

export const getWinners = async (
  sort: SORT,
  order: ORDER,
  page = 1,
  limit = 10,
): GetWinnersReturn => {
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

export type GetWinnerReturn = Promise<[Winner, null] | [null, Error]>;

export const getWinner = async (id: number): GetWinnerReturn => {
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
