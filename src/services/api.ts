import type { GarageData, Car, PostCar } from '../interfaces/shared';

const API_BASE = 'http://localhost:3000';

const handleError = (e: unknown, message: string): void => {
  if (e instanceof Error) {
    throw new Error(e.message);
  } else if (typeof e === 'string') {
    throw new Error(e);
  } else {
    throw new Error(message);
  }
}

export type GetCarsReturnType = GarageData | null | void;

export const getCars = async (
  page = 1,
  limit = 7,
): Promise<GetCarsReturnType> => {
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
    handleError(e, 'Cannot get garage data from server');
  }
};

export const createCar = async (car: PostCar): Promise<void> => {
  try {
    await fetch(`${API_BASE}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  } catch (e) {
    handleError(e, 'Cannot create new car');
  }
};
