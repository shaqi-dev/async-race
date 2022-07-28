import handleError from '../utils/handleError';
import type { GarageData, Car, CarSettings, CarEngine } from '../interfaces/shared';

const API_BASE = 'http://localhost:3000';

const API_GARAGE = `${API_BASE}/garage`;
const API_ENGINE = `${API_BASE}/engine`;
const API_WINNERS = `${API_BASE}/winners`;

export const getCars = async (page = 1, limit = 7): Promise<GarageData | null | void> => {
  try {
    const res = await fetch(`${API_GARAGE}?_limit=${limit}&_page=${page}`);

    if (res.status === 200) {
      const cars: Car[] = await res.json();
      const count = res.headers.get('X-Total-Count') || '0';

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
    const res = await fetch(`${API_GARAGE}/${id}`);

    if (res.status === 200) {
      const car: Car = await res.json();
      return car;
    }

    return null;
  } catch (e) {
    handleError(e, `Cannot get car (id: ${id}) data from server`);
  }
};

export const createCar = async (car: CarSettings): Promise<void> => {
  try {
    await fetch(`${API_GARAGE}`, {
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
    await fetch(`${API_GARAGE}/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    handleError(e, 'Cannot create new car');
  }
};

export const updateCar = async (id: number, car: CarSettings): Promise<void> => {
  try {
    await fetch(`${API_BASE}/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  } catch (e) {
    handleError(e, `Cannot update car (id: ${id})`);
  }
};

export const setCarsEngine = async (
  id: number,
  status: 'started' | 'stopped',
): Promise<CarEngine | null | void> => {
  try {
    const res = await fetch(`${API_ENGINE}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });

    if (res.status === 200) {
      const data: CarEngine = await res.json();
      return data;
    }

    return null;
  } catch (e) {
    handleError(e, 'Cannot create new car');
  }
};
