import type { GarageData, Car } from '../interfaces/shared';

const API_BASE = 'http://localhost:3000';

export const getCars = async (
  page = 1,
  limit = 7,
): Promise<GarageData | null> => {
  try {
    const res = await fetch(`${API_BASE}/garage?_limit=${limit}&_page=${page}`);
    const data: Car[] = await res.json();

    if (res.status === 200) {
      return {
        cars: data,
        count: res.headers.get('X-Total-Count') || '0',
      };
    }

    return null;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('Cannot get garage data from server');
    }
  }
};
