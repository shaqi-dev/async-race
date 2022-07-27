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
};

export const getCars = async (
  page = 1,
  limit = 7,
): Promise<GarageData | null | void> => {
  try {
    const res = await fetch(`${API_BASE}/garage?_limit=${limit}&_page=${page}`);

    if (res.status === 200) {
      const cars: Car[] = await res.json();
      const count = res.headers.get('X-Total-Count') || '0'

      return {
        cars,
        count,
      };
    }

    return null;
  } catch (e) {
    handleError(e, 'Cannot get garage data from server');
  }
};

export const getCar = async (id: number): Promise<Car | null | void> => {
  try {
    const res = await fetch(`${API_BASE}/garage/${id}`);

    if (res.status === 200) {
      const car: Car = await res.json();
      return car;
    }

    return null;
  } catch (e) {
    handleError(e, `Cannot get car (id: ${id}) data from server`);
  }
}

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

export const removeCar = async (id: number): Promise<void> => {
  try {
    await fetch(`${API_BASE}/garage/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    handleError(e, 'Cannot create new car');
  }
};
